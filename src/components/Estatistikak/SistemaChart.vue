<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Chart from 'apexcharts'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

const chartRef = ref(null)
const chart = ref(null)

const getPerformanceColor = (percentage) => {
  if (percentage <= 25) return '#B9473A'
  if (percentage <= 50) return '#B87316'
  if (percentage <= 75) return '#B68A20'
  return '#37805F'
}

const initChart = () => {
  if (!props.data || props.data.length === 0) return

  const sortedData = [...props.data].sort((a, b) => {
    const percentageA = Math.round((a.aciertos / a.total) * 100)
    const percentageB = Math.round((b.aciertos / b.total) * 100)
    return percentageA - percentageB // Cambiado de B-A a A-B para ordenar de menor a mayor
  })

  const percentages = sortedData.map(item =>
    item.total ? Math.round((item.aciertos / item.total) * 100) : 0
  )

  const options = {
    chart: {
      type: 'bar',
      height: '100%',
      fontFamily: 'inherit',
      toolbar: {
        show: false
      }
    },
    series: [{
      name: 'Asmatze-tasa',
      data: percentages
    }],
    colors: percentages.map(getPerformanceColor),
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        distributed: true,
        dataLabels: {
          position: 'middle'
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return val + '%'
      },
      style: {
        colors: percentages.map(p => p > 50 ? '#fff' : '#000')
      }
    },
    xaxis: {
      categories: sortedData.map(item => item.sistema),
      max: 100,
      labels: {
        style: {
          fontSize: '14px'
        }
      }
    },
    tooltip: {
      y: {
        formatter: function(val) {
          return val + '%'
        }
      },
      theme: 'dark',
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const sistema = w.globals.labels[dataPointIndex]
        const item = sortedData[dataPointIndex]
        return `
          <div class="chart-tooltip">
            <div class="font-medium">${sistema}</div>
            <div class="text-sm mt-1">
              ${item.aciertos}/${item.total} asmatuta (${series[seriesIndex][dataPointIndex]}%)
            </div>
          </div>
        `
      }
    },
    legend: {
      show: false
    }
  }

  chart.value = new Chart(chartRef.value, options)
  chart.value.render()
}

watch(() => props.data, () => {
  if (chart.value) {
    chart.value.destroy()
  }
  initChart()
}, { deep: true })

onMounted(() => {
  initChart()
})

onUnmounted(() => {
  chart.value?.destroy()
})
</script>

<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>
