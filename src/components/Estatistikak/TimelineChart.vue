# TimelineChart.vue
<script setup>
import { ref, onMounted, watch } from 'vue'
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
    colors: ['#22c55e', '#ef4444'], // Verde para aciertos, rojo para fallos
    xaxis: {
  type: 'datetime',
  labels: {
    formatter: function(val) {
      console.log('Valor recibido en formatter:', val);
      // Asegurarnos de que val es un número válido
      const timestamp = typeof val === 'number' ? val : new Date(val).getTime();
      const date = new Date(timestamp);
      console.log('Fecha convertida:', date);
      
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
      <div class="p-2 bg-gray-800 text-white rounded-lg shadow">
        <div class="font-medium mb-1">${fecha}</div>
        <div class="space-y-1 text-sm">
          <div>Erantzunak: ${total}</div>
          <div class="text-emerald-400">Asmatutakoak: ${aciertos}</div>
          <div class="text-red-400">Hutsegiteak: ${fallos}</div>
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
</script>

<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>