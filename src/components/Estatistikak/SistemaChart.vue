# SistemaChart.vue
<script setup>
import { ref, onMounted, watch } from 'vue'
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
  if (percentage <= 25) return '#ef4444' // Rojo
  if (percentage <= 50) return '#f97316' // Naranja
  if (percentage <= 75) return '#eab308' // Amarillo
  return '#22c55e' // Verde
}

const initChart = () => {
  if (!props.data || props.data.length === 0) return

  const sortedData = [...props.data].sort((a, b) => {
    const percentageA = Math.round((a.aciertos / a.total) * 100)
    const percentageB = Math.round((b.aciertos / b.total) * 100)
    return percentageA - percentageB // Cambiado de B-A a A-B para ordenar de menor a mayor
  })

  const percentages = sortedData.map(item => 
    Math.round((item.aciertos / item.total) * 100)
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
      labels: {
        style: {
          fontSize: '14px'
        }
      }
    },
    yaxis: {
      max: 100,
      labels: {
        formatter: function(val) {
          return val + '%'
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
          <div class="p-2 bg-gray-800 text-white rounded-lg shadow">
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
</script>

<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>