# TimelineChart.vue
<script setup>
import { ref, onMounted, watch } from 'vue'
import Chart from 'apexcharts'
import { formatDateEU } from '@/utils/dateFormatter'

const props = defineProps({
  sinonimosData: {
    type: Array,
    required: true
  },
  aditzakData: {
    type: Array,
    required: true
  }
})

const chartRef = ref(null)
const chart = ref(null)
const activeView = ref('all')

const getSeriesForView = () => {
  const series = []
  
  if (activeView.value === 'all' || activeView.value === 'sinonimos') {
    series.push({
      name: 'Sinonimoak - Erantzunak',
      data: props.sinonimosData.map(item => ({
        x: new Date(item.date).getTime(),
        y: item.respuestas
      }))
    },
    {
      name: 'Sinonimoak - Asmatutakoak',
      data: props.sinonimosData.map(item => ({
        x: new Date(item.date).getTime(),
        y: item.aciertos
      }))
    })
  }
  
  if (activeView.value === 'all' || activeView.value === 'aditzak') {
    series.push({
      name: 'Aditzak - Erantzunak',
      data: props.aditzakData.map(item => ({
        x: new Date(item.date).getTime(),
        y: item.respuestas
      }))
    },
    {
      name: 'Aditzak - Asmatutakoak',
      data: props.aditzakData.map(item => ({
        x: new Date(item.date).getTime(),
        y: item.aciertos
      }))
    })
  }
  
  return series
}

const initChart = () => {
  if (!props.sinonimosData || !props.aditzakData) return

  const options = {
    chart: {
      type: 'line',
      height: '100%',
      fontFamily: 'inherit',
      toolbar: {
        show: false
      }
    },
    series: getSeriesForView(),
    colors: ['#f59e0b', '#10b981', '#8b5cf6', '#06b6d4'],
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function(val) {
          return formatDateEU(val, true, false)
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function(val) {
          return Math.round(val)
        }
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    markers: {
      size: 4
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value) => value,
        title: {
          formatter: (seriesName) => seriesName + ': '
        }
      },
      x: {
        formatter: function(val) {
          return formatDateEU(val, false, true)
        }
      }
    }
  }

  chart.value = new Chart(chartRef.value, options)
  chart.value.render()
}

const updateChartView = () => {
  if (chart.value) {
    chart.value.updateSeries(getSeriesForView())
  }
}

watch(activeView, () => {
  updateChartView()
})

watch([() => props.sinonimosData, () => props.aditzakData], () => {
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
    <div class="flex flex-col h-full">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            v-for="tab in [
              { id: 'all', name: 'Guztiak' },
              { id: 'sinonimos', name: 'Sinonimoak' },
              { id: 'aditzak', name: 'Aditzak' }
            ]"
            :key="tab.id"
            @click="activeView = tab.id"
            :class="[
              activeView === tab.id
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white focus:outline-none'
                : 'text-amber-600 bg-transparent border-2 border-amber-500 border-solid hover:bg-gradient-to-r hover:from-amber-500 hover:to-orange-500 hover:text-white focus:outline-none',
              'whitespace-nowrap flex-1 py-2 px-4 rounded-full transition-all duration-300 bg-transparent font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
      <div ref="chartRef" class="w-full flex-1 min-h-0"></div>
    </div>
  </template>