<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import Chart from 'apexcharts'
import { formatDateEU } from '@/utils/dateFormatter'

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const chartRef = ref(null)
const chart = ref(null)

const getSeries = () => {
  const dataArray = Array.isArray(props.data) ? props.data : [props.data]
  return [
    {
      name: 'Asmatutakoak',
      data: dataArray.map(item => ({
        x: new Date(item.date).getTime(),
        y: item.aciertos || 0
      }))
    },
    {
      name: 'Hutsegiteak',
      data: dataArray.map(item => ({
        x: new Date(item.date).getTime(),
        y: (item.respuestas || 0) - (item.aciertos || 0)
      }))
    }
  ]
}

const initChart = () => {
  if (!props.data) return

  const options = {
    chart: {
      type: 'bar',
      height: '100%',
      fontFamily: 'inherit',
      stacked: true,
      toolbar: {
        show: false
      }
    },
    series: getSeries(),
    colors: ['#37805F', '#B9473A'],
    xaxis: {
  type: 'datetime',
  labels: {
    formatter: function(val) {
      const timestamp = typeof val === 'number' ? val : new Date(val).getTime();
      const date = new Date(timestamp);
      
      const today = new Date();
      if (date.getDate() === today.getDate() && 
          date.getMonth() === today.getMonth() && 
          date.getFullYear() === today.getFullYear()) {
        return 'Gaur';
      }
      
      return formatDateEU(timestamp, true, false);
    },
    datetimeUTC: false  // Añadimos esta opción para manejar las fechas en hora local
  }
},
    yaxis: {
      labels: {
        formatter: function(val) {
          return Math.round(val)
        }
      }
    },
    plotOptions: {
      bar: {
        columnWidth: '70%'
      }
    },
    tooltip: {
  theme: 'dark',
  custom: function({ dataPointIndex, w }) {
    const aciertos = w.globals.series[0][dataPointIndex] || 0
    const fallos = w.globals.series[1][dataPointIndex] || 0
    const total = aciertos + fallos
    const fecha = formatDateEU(w.globals.seriesX[0][dataPointIndex], false, true)
    
    return `
      <div class="chart-tooltip">
        <div class="font-medium mb-1">${fecha}</div>
        <div class="space-y-1 text-sm">
          <div>Erantzunak: ${total}</div>
          <div class="chart-tooltip__success">Asmatutakoak: ${aciertos}</div>
          <div class="chart-tooltip__danger">Hutsegiteak: ${fallos}</div>
        </div>
      </div>
    `
  }
},
    legend: {
      position: 'top',
      horizontalAlign: 'left'
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
