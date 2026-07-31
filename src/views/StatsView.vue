<script setup>
import { ref, onMounted, watch } from 'vue'
import { useStatsService } from '@/composables/useStatsService'
import TimelineChart from '@/components/Estatistikak/TimelineChart.vue'
import SistemaChart from '@/components/Estatistikak/SistemaChart.vue'
import { useRouter } from 'vue-router'
import PageHeader from '@/components/ui/PageHeader.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

const timeRange = ref('today')
const stats = ref(null)
const isLoading = ref(true)

const { getStats } = useStatsService()

onMounted(async () => {
  await loadStats()
})

const getPercentage = (tiempo) => {
  if (!tiempo?.total) return 0
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
  <div class="page-shell">
    <PageHeader
      title="Ikastearen estatistikak"
      description="Jarraitu zure aurrerapena eta aurkitu zer landu behar duzun."
    >
          <div class="segmented-control max-w-sm mx-auto mt-6">
            <button
              @click="timeRange = 'today'"
              class="segmented-control__option"
              :aria-pressed="timeRange === 'today'"
            >
              Gaurko emaitzak
            </button>
            <button
              @click="timeRange = '7d'"
              class="segmented-control__option"
              :aria-pressed="timeRange === '7d'"
            >
              Historikoa
            </button>
          </div>
    </PageHeader>

    <div>
      <div v-if="isLoading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-primary)]"></div>
        <p class="mt-2 text-sm text-[var(--text-muted)]">Estatistikak kargatzen...</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Columna Sinonimoak -->
        <div class="space-y-6">
          <button 
            @click="goToSinonimoak"
            title="Sinonimoen jolasa"
            class="w-full btn-primary rounded-md py-3 px-4 text-lg"
          >
            Sinonimoak
          </button>

          <!-- Timeline Sinonimoak -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-4">{{ timeRange === 'today' ? 'Gaurko emaitzak' : 'Eguneroko aurrerapena' }}</h3>
            <template v-if="getTimelineData('sinonimos').length > 0">
              <TimelineChart 
                :data="getTimelineData('sinonimos')"
                type="Sinonimoak"
                class="h-64"
              />
            </template>
            <template v-else>
              <EmptyState message="Ez dago daturik erakusteko egun honetarako" />
            </template>
          </div>

          <!-- Palabras más acertadas -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-4">Gehien asmatutako sinonimoak:</h3>
            <div class="space-y-4">
              <div v-for="palabra in stats?.sinonimos?.palabrasMasAcertadas || []"
                   :key="palabra.palabra"
                   class="flex justify-between items-center"
              >
                <span class="font-medium text-[var(--text-primary)]">{{ palabra.palabra }}</span>
                <span class="text-[var(--accent-success)] font-medium">{{ palabra.aciertos }} asmatu</span>
              </div>
            </div>
          </div>

          <!-- Palabras más falladas -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-4">Gehien hutsegindako sinonimoak:</h3>
            <div class="space-y-4">
              <div v-for="palabra in stats?.sinonimos?.palabrasMasFalladas || []"
                   :key="palabra.palabra"
                   class="flex justify-between items-center"
              >
                <span class="font-medium text-[var(--text-primary)]">{{ palabra.palabra }}</span>
                <span class="text-[var(--accent-danger)] font-medium">{{ palabra.fallos }} huts</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna Aditzak -->
        <div class="space-y-6">
          <button 
            @click="goToAditzak"
            title="Aditz laguntzaileen jolasa"
            class="w-full btn-primary rounded-md py-3 px-4 text-lg"
          >
            Aditzak
          </button>

          <!-- Timeline Aditzak -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-4">{{ timeRange === 'today' ? 'Gaurko emaitzak' : 'Eguneroko aurrerapena' }}</h3>
            <template v-if="getTimelineData('aditzak').length > 0">
              <TimelineChart 
                :data="getTimelineData('aditzak')"
                type="Aditzak"
                class="h-64"
              />
            </template>
            <template v-else>
              <EmptyState message="Ez dago daturik erakusteko egun honetarako" />
            </template>
          </div>

          <!-- Rendimiento por sistema -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-4">Sistema bidezko errendimendua</h3>
            <SistemaChart 
              :data="stats?.aditzak?.sistemasStats ?
                [...stats.aditzak.sistemasStats].sort((a, b) => 
                  (a.aciertos / a.total) - (b.aciertos / b.total)
                ) : 
                []"
              class="h-64"
            />
          </div>

          <!-- Rendimiento por tiempo verbal -->
          <div class="card p-6">
            <h3 class="text-lg font-semibold text-[var(--text-primary)] mb-4">Aditz-denboraren araberako errendimendua</h3>
            <div class="space-y-4">
              <div v-for="tiempo in [...(stats?.aditzak.tiemposStats || [])].sort((a, b) => getPercentage(a) - getPercentage(b))" 
                   :key="tiempo.tiempo"
                   class="space-y-2"
              >
                <div class="flex justify-between items-center">
                  <span class="font-medium text-sm text-[var(--text-secondary)]">{{ tiempo.tiempo }}</span>
                  <span 
                    class="text-sm"
                    :class="{
                      'performance-danger': getPercentage(tiempo) <= 25,
                      'performance-warning': getPercentage(tiempo) > 25 && getPercentage(tiempo) <= 50,
                      'performance-mid': getPercentage(tiempo) > 50 && getPercentage(tiempo) <= 75,
                      'performance-success': getPercentage(tiempo) > 75
                    }"
                  >
                    {{ getPercentage(tiempo) }}% ({{ tiempo.aciertos }}/{{ tiempo.total }})
                  </span>
                </div>
                <div class="w-full performance-bg rounded-sm h-2.5 overflow-hidden">
                  <div 
                    class="h-2.5 transition-all duration-300"
                    :class="{
                      'performance-fill-danger': getPercentage(tiempo) <= 25,
                      'performance-fill-warning': getPercentage(tiempo) > 25 && getPercentage(tiempo) <= 50,
                      'performance-fill-mid': getPercentage(tiempo) > 50 && getPercentage(tiempo) <= 75,
                      'performance-fill-success': getPercentage(tiempo) > 75
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
