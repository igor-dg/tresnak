<script setup>
import { ref, onMounted, watch } from 'vue'
import { useStatsService } from '@/composables/useStatsService'
import TimelineChart from '@/components/Estatistikak/TimelineChart.vue'
import SistemaChart from '@/components/Estatistikak/SistemaChart.vue'
import { useRouter } from 'vue-router'

const timeRange = ref('today')
const stats = ref(null)
const isLoading = ref(true)

const { getStats } = useStatsService()

onMounted(async () => {
  await loadStats()
})

const getPercentage = (tiempo) => {
  return Math.round((tiempo.aciertos / tiempo.total) * 100)
}

const loadStats = async () => {
  isLoading.value = true
  try {
    // Añadamos logs para ver qué datos llegan
    console.log('Antes de getStats:', timeRange.value);
    const response = await getStats(timeRange.value);
    console.log('Respuesta getStats:', response);
    stats.value = response;
    console.log('Timeline después de asignar:', stats.value?.aditzak?.timeline);
  } catch (error) {
    console.error('Error cargando estadísticas:', error)
  } finally {
    isLoading.value = false
  }
}

const getTimelineData = (type) => {
  const timeline = stats.value?.[type]?.timeline || [];
  
  if (timeRange.value === 'today') {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    // Corregimos la comparación para usar el formato de fecha correcto
    return timeline.filter(entry => entry.date === todayStr);
  }
  
  return timeline;
}

watch(timeRange, () => {
  loadStats()
})

const router = useRouter()

const goToAditzak = () => {
  router.push({ name: 'aditzak' })
}
const goToSinonimoak = () => {
  router.push({ name: 'sinonimoak-jokoa' })
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="top-0 z-20 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1 class="text-2xl md:text-4xl font-bold text-white">
            Ikastearen estatistikak
          </h1>
          <div class="flex gap-3">
            <button
              @click="timeRange = 'today'"
              class="px-4 py-2 rounded-full text-sm font-medium transition-all"
              :class="timeRange === 'today' ? 
                'bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white' : 
                'bg-white/40 text-[var(--text-primary)] hover:bg-white/60'"
            >
              Gaurko emaitzak
            </button>
            <button
              @click="timeRange = '7d'"
              class="px-4 py-2 rounded-full text-sm font-medium transition-all"
              :class="timeRange === '7d' ? 
                'bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] text-white' : 
                'bg-white/40 text-[var(--text-primary)] hover:bg-white/60'"
            >
              Historikoa
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
        <p class="mt-2 text-sm text-gray-500">Estatistikak kargatzen...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Columna Sinonimoak -->
        <div class="space-y-6">
          <button 
            @click="goToSinonimoak"
            title="Sinonimoen jolasa"
            class="w-full text-white rounded-full py-3 px-4 flex items-center justify-center gap-2 transition-all text-lg font-semibold focus:outline-none focus:ring-2 bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] hover:from-[var(--gradient-hover-from)] hover:to-[var(--gradient-hover-to)] focus:ring-[var(--gradient-from)]"
          >
            Sinonimoak
          </button>

          <!-- Timeline Sinonimoak -->
          <div class="bg-white/40 rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-amber-900 mb-4">{{ timeRange === 'today' ? 'Gaurko emaitzak' : 'Eguneroko aurrerapena' }}</h3>
            <template v-if="getTimelineData('sinonimos').length > 0">
              <TimelineChart 
                :data="getTimelineData('sinonimos')"
                type="Sinonimoak"
                class="h-64"
              />
            </template>
            <template v-else>
              <p class="text-center text-gray-500 py-8">Ez dago daturik erakusteko egun honetarako</p>
            </template>
          </div>

          <!-- Palabras más acertadas -->
          <div class="bg-white/40 rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-amber-900 mb-4">Gehien asmatutako sinonimoak:</h3>
            <div class="space-y-4">
              <div v-for="palabra in stats?.sinonimos.palabrasMasAcertadas" 
                   :key="palabra.palabra"
                   class="flex justify-between items-center"
              >
                <span class="font-medium text-amber-700">{{ palabra.palabra }}</span>
                <span class="text-green-700">{{ palabra.aciertos }} asmatu</span>
              </div>
            </div>
          </div>

          <!-- Palabras más falladas -->
          <div class="bg-white/40 rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-amber-900 mb-4">Gehien hutsegindako sinonimoak:</h3>
            <div class="space-y-4">
              <div v-for="palabra in stats?.sinonimos.palabrasMasFalladas" 
                   :key="palabra.palabra"
                   class="flex justify-between items-center"
              >
                <span class="font-medium text-amber-700">{{ palabra.palabra }}</span>
                <span class="text-red-700">{{ palabra.fallos }} huts</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna Aditzak -->
        <div class="space-y-6">
          <button 
            @click="goToAditzak"
            title="Aditz laguntzaileen jolasa"
            class="w-full text-white rounded-full py-3 px-4 flex items-center justify-center gap-2 transition-all text-lg font-semibold focus:outline-none focus:ring-2 bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] hover:from-[var(--gradient-hover-from)] hover:to-[var(--gradient-hover-to)] focus:ring-[var(--gradient-from)]"
          >
            Aditzak
          </button>

          <!-- Timeline Aditzak -->
          <div class="bg-white/40 rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-amber-900 mb-4">{{ timeRange === 'today' ? 'Gaurko emaitzak' : 'Eguneroko aurrerapena' }}</h3>
            <template v-if="getTimelineData('aditzak').length > 0">
              <TimelineChart 
                :data="getTimelineData('aditzak')"
                type="Aditzak"
                class="h-64"
              />
            </template>
            <template v-else>
              <p class="text-center text-gray-500 py-8">Ez dago daturik erakusteko egun honetarako</p>
            </template>
          </div>

          <!-- Rendimiento por sistema -->
          <div class="bg-white/40 rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-amber-900 mb-4">Sistema bidezko errendimendua</h3>
            <SistemaChart 
              :data="stats?.aditzak.sistemasStats ? 
                [...stats.aditzak.sistemasStats].sort((a, b) => 
                  (a.aciertos / a.total) - (b.aciertos / b.total)
                ) : 
                []"
              class="h-64"
            />
          </div>

          <!-- Rendimiento por tiempo verbal -->
          <div class="bg-white/40 rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-amber-900 mb-4">Aditz-denboraren araberako errendimendua</h3>
            <div class="space-y-4">
              <div v-for="tiempo in [...(stats?.aditzak.tiemposStats || [])].sort((a, b) => getPercentage(a) - getPercentage(b))" 
                   :key="tiempo.tiempo"
                   class="space-y-2"
              >
                <div class="flex justify-between items-center">
                  <span class="font-medium text-sm text-amber-600">{{ tiempo.tiempo }}</span>
                  <span 
                    class="text-sm"
                    :class="{
                      'text-red-600': getPercentage(tiempo) <= 25,
                      'text-orange-600': getPercentage(tiempo) > 25 && getPercentage(tiempo) <= 50,
                      'text-yellow-600': getPercentage(tiempo) > 50 && getPercentage(tiempo) <= 75,
                      'text-green-600': getPercentage(tiempo) > 75
                    }"
                  >
                    {{ getPercentage(tiempo) }}% ({{ tiempo.aciertos }}/{{ tiempo.total }})
                  </span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    class="h-2.5 rounded-full transition-all duration-300"
                    :class="{
                      'bg-red-500': getPercentage(tiempo) <= 25,
                      'bg-orange-500': getPercentage(tiempo) > 25 && getPercentage(tiempo) <= 50,
                      'bg-yellow-500': getPercentage(tiempo) > 50 && getPercentage(tiempo) <= 75,
                      'bg-green-500': getPercentage(tiempo) > 75
                    }"
                    :style="{ width: `${getPercentage(tiempo)}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>