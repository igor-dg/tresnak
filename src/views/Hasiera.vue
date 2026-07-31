<script setup>
import { ref, onMounted } from 'vue'
import { useStatsService } from '@/composables/useStatsService'
import {
  Puzzle,
  Shuffle,
  MessageCircle,
  ListChecks,
  BookOpen,
  Table,
  ArrowRight,
  Flame,
} from 'lucide-vue-next'

const erronkak = [
  {
    title: 'Hiztegle',
    description: 'Asmatu hitza definizioarekin. Wordle euskaraz!',
    route: '/hiztegle',
    icon: Puzzle,
    tone: 'hiztegle',
  },
  {
    title: 'Sinonimoen jokoa',
    description: 'Praktikatu sinonimoak jolasten.',
    route: '/sinonimoak-jokoa',
    icon: Shuffle,
    tone: 'sinonimoak',
  },
  {
    title: 'Aditz laguntzaileak',
    description: 'Jokatu aditzak eta indartu ulermena.',
    route: '/aditzak',
    icon: MessageCircle,
    tone: 'aditzak',
  },
]

const baliabideak = [
  {
    title: 'Sinonimoen zerrenda',
    route: '/sinonimoak-zerrenda',
    icon: ListChecks,
  },
  {
    title: 'C1-eko hiztegia',
    route: '/hiztegia',
    icon: BookOpen,
  },
  {
    title: 'Aditz taulak',
    route: '/aditz-taulak',
    icon: Table,
  },
]

const { getStats } = useStatsService()
const streak = ref(0)

onMounted(async () => {
  try {
    const stats = await getStats('7d')
    const byDate = {}
    for (const entry of [...stats.sinonimos.timeline, ...stats.aditzak.timeline]) {
      byDate[entry.date] = (byDate[entry.date] || 0) + entry.respuestas
    }

    const daysNewestFirst = Object.entries(byDate).sort(([a], [b]) => b.localeCompare(a))
    const start = daysNewestFirst[0]?.[1] === 0 ? 1 : 0
    let count = 0
    for (let i = start; i < daysNewestFirst.length; i++) {
      if (daysNewestFirst[i][1] > 0) count++
      else break
    }
    streak.value = count
  } catch (error) {
    console.error('Ezin izan da aurrerapena kargatu:', error)
  }
})
</script>

<template>
  <div class="page-shell">
    <header class="home-hero">
      <img src="/logo.svg" alt="Jokatu!" class="home-hero__logo" />
      <h1 class="home-hero__title">Egunero pixka bat,<br />euskara hobetzeko</h1>

      <div v-if="streak > 0" class="home-stat">
        <Flame class="home-stat__icon" />
        <span class="home-stat__value">{{ streak }}</span>
        <span class="home-stat__label">egun jarraian jolasten</span>
      </div>
      <p v-else class="home-hero__desc">Jolastu, errepasatu eta segi ikasten.</p>

      <router-link to="/estatistikak" class="home-hero__link">
        Ikusi zure aurrerapena
        <ArrowRight class="w-4 h-4" />
      </router-link>
    </header>

    <section class="home-block">
      <h2 class="home-block__title">Jolastu</h2>
      <div class="game-stack">
        <router-link
          v-for="item in erronkak"
          :key="item.route"
          :to="item.route"
          class="game-tile"
          :class="`game-tile--${item.tone}`"
        >
          <component :is="item.icon" class="game-tile__icon" />
          <span class="game-tile__title">{{ item.title }}</span>
          <span class="game-tile__desc">{{ item.description }}</span>
          <ArrowRight class="game-tile__arrow" />
        </router-link>
      </div>
    </section>

    <section class="home-block">
      <h2 class="home-block__title">Baliabideak</h2>
      <ul class="resource-list">
        <li v-for="item in baliabideak" :key="item.route">
          <router-link :to="item.route" class="resource-row">
            <component :is="item.icon" class="resource-row__icon" />
            <span class="resource-row__title">{{ item.title }}</span>
            <ArrowRight class="resource-row__arrow" />
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.home-hero {
  text-align: center;
  padding-top: 0.5rem;
}

.home-hero__logo {
  display: block;
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto 1rem;
}

.home-hero__title {
  margin: 0 0 1rem;
  font-size: clamp(1.5rem, 5vw, 2.25rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--text-primary);
}

.home-hero__desc {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.home-stat {
  display: inline-flex;
  align-items: baseline;
  gap: 0.375rem;
}

.home-stat__icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #FB923C;
  align-self: center;
}

.home-stat__value {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1;
  color: var(--text-primary);
}

.home-stat__label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.home-hero__link {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.875rem;
  color: #B79CFF;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
}

.home-hero__link:hover {
  text-decoration: underline;
}

.home-block {
  margin-top: 1.75rem;
}

.home-block__title {
  margin: 0 0 0.625rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

/* Games: solid vivid tiles, near-flat corners, no border/card chrome */
.game-stack {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.game-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding: 1.25rem 2.75rem 1.25rem 1.375rem;
  border-radius: 0.625rem;
  color: #FFFFFF;
  text-decoration: none;
  transition: transform 0.15s ease;
}

.game-tile:active {
  transform: scale(0.98);
}

.game-tile--hiztegle { background-color: #B23A8C; }
.game-tile--sinonimoak { background-color: #A6650A; }
.game-tile--aditzak { background-color: #128888; }

.game-tile__icon {
  width: 1.375rem;
  height: 1.375rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

.game-tile__title {
  font-size: 1.0625rem;
  font-weight: 700;
}

.game-tile__desc {
  font-size: 0.8125rem;
  color: rgb(255 255 255 / 0.82);
}

.game-tile__arrow {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 1.125rem;
  height: 1.125rem;
  opacity: 0.75;
}

/* Resources: plain list, no card chrome */
.resource-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.resource-list li + li {
  border-top: 1px solid var(--border-card);
}

.resource-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 0.25rem;
  color: var(--text-primary);
  text-decoration: none;
}

.resource-row__icon {
  width: 1.125rem;
  height: 1.125rem;
  color: var(--text-muted);
  flex-shrink: 0;
}

.resource-row__title {
  flex: 1;
  font-size: 0.9375rem;
  font-weight: 600;
}

.resource-row__arrow {
  width: 1rem;
  height: 1rem;
  color: var(--text-muted);
  transition: transform 0.15s ease, color 0.15s ease;
}

.resource-row:hover .resource-row__arrow {
  color: var(--accent-primary);
  transform: translateX(2px);
}

@media (min-width: 768px) {
  .home-hero__logo {
    width: 5rem;
    height: 5rem;
    margin-bottom: 1.5rem;
  }

  .game-stack {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
  }

  .game-tile {
    padding: 1.5rem 1.75rem;
    min-height: 9rem;
  }
}
</style>
