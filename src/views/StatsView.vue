# StatsView.vue
<script setup>
import { ref, onMounted } from 'vue'
import { useStatsService } from '@/composables/useStatsService'
import TimelineChart from '@/components/Estatistikak/TimelineChart.vue'
import SistemaChart from '@/components/Estatistikak/SistemaChart.vue'
import { useRouter } from 'vue-router'

const timeRange = ref('7d')
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
    stats.value = await getStats(timeRange.value)
  } catch (error) {
    console.error('Error cargando estadísticas:', error)
  } finally {
    isLoading.value = false
  }
}

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
        <div class="flex justify-between items-center">
          <h1 class="text-2xl md:text-4xl font-bold text-[var(--text-primary)]">
            Ikastearen estatistikak
          </h1>
        </div>
      </div>
    </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="isLoading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      <p class="mt-2 text-sm text-gray-500">Estatistikak kargatzen...</p>
    </div>

    <div v-else class="space-y-6">
      <!-- Timeline unificado -->
      <div class="bg-white/40 rounded-lg shadow p-6">
        <h3 class="text-lg font-medium text-amber-900 mb-4">Eguneroko aurrerapena</h3>
        <TimelineChart 
          :sinonimosData="stats?.sinonimos.timeline"
          :aditzakData="stats?.aditzak.timeline"
          class="h-64"
        />
      </div>

      <!-- Grid con estadísticas de ambos -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Columna Sinonimoak -->
        <div class="space-y-6">
            <button 
        @click="goToSinonimoak"
        title="Sinonimoen jolasa"
        :class="{
          'text-white justify-self-center rounded-full py-3 px-4 flex items-center justify-center gap-2 transition-all text-lg font-semibold focus:outline-none focus:ring-2': true,
          'bg-gradient-to-r': true,
          'from-[var(--gradient-from)]': true,
          'to-[var(--gradient-to)]': true,
          'hover:from-[var(--gradient-hover-from)]': true,
          'hover:to-[var(--gradient-hover-to)]': true,
          'focus:ring-[var(--gradient-from)]': true
        }"
      >
        Sinonimoak
      </button>
          <!-- Palabras más acertadas -->
          <div class="bg-white/40 rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-amber-900 mb-4">Gehien asmatzen diren hitzak:</h3>
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
            <h3 class="text-lg font-medium text-amber-900 mb-4">Huts gehien egin diren hitzak:</h3>
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
        :class="{
          'text-white justify-self-center rounded-full py-3 px-4 flex items-center justify-center gap-2 transition-all text-lg font-semibold focus:outline-none focus:ring-2': true,
          'bg-gradient-to-r': true,
          'from-[var(--gradient-from)]': true,
          'to-[var(--gradient-to)]': true,
          'hover:from-[var(--gradient-hover-from)]': true,
          'hover:to-[var(--gradient-hover-to)]': true,
          'focus:ring-[var(--gradient-from)]': true
        }"
      >
        Aditzak
      </button>
          <!-- Rendimiento por sistema -->
          <div class="bg-white/40 rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-amber-900 mb-4">Sistema bidezko errendimendua</h3>
            <SistemaChart 
              :data="stats?.aditzak.sistemasStats"
              class="h-64"
            />
          </div>

          <!-- Rendimiento por tiempo verbal -->
          <div class="bg-white/40 rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-amber-900 mb-4">Aditz-denboraren araberako errendimendua</h3>
            <div class="space-y-4">
              <div v-for="tiempo in stats?.aditzak.tiemposStats" 
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
    </div>
</template>