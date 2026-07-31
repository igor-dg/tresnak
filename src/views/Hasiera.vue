<script setup>
import NavigationCard from '../components/NavigationCard.vue';
import PageHeader from '@/components/ui/PageHeader.vue'
import {
  Puzzle,
  Shuffle,
  MessageCircle,
  ListChecks,
  BookOpen,
  Table,
  TrendingUp,
  ArrowRight,
} from 'lucide-vue-next'

const erronkak = [
  {
    title: 'Hiztegle',
    description: 'Asmatu hitza definizioarekin. Wordle euskaraz!',
    route: '/hiztegle',
    icon: Puzzle,
  },
  {
    title: 'Sinonimoen jokoa',
    description: 'Praktikatu sinonimoak jolasten.',
    route: '/sinonimoak-jokoa',
    icon: Shuffle,
  },
  {
    title: 'Aditz laguntzaileak',
    description: 'Jokatu aditzak eta indartu ulermena.',
    route: '/aditzak',
    icon: MessageCircle,
  },
]

const baliabideak = [
  {
    title: 'Sinonimoen zerrenda',
    description: 'Ikasgelako sinonimoen bilduma osoa.',
    route: '/sinonimoak-zerrenda',
    icon: ListChecks,
  },
  {
    title: 'C1-eko hiztegia',
    description: 'Azterketarako termino eta esamoldeak.',
    route: '/hiztegia',
    icon: BookOpen,
  },
  {
    title: 'Aditz taulak',
    description: 'Euskal aditzak jokatzeko erreferentzia.',
    route: '/aditz-taulak',
    icon: Table,
  },
]
</script>

<template>
  <div class="page-shell">
    <PageHeader
      title="Egunero pixka bat, euskara hobetzeko"
      description="Jolastu, errepasatu eta segi ikasten."
    >
      <router-link to="/estatistikak" class="hero-progress-link">
        <TrendingUp class="w-4 h-4" />
        <span>Ikusi zure aurrerapena</span>
        <ArrowRight class="w-4 h-4" />
      </router-link>
    </PageHeader>

    <section class="home-section">
      <h2 class="home-section__title">Praktikatu jolasekin</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <NavigationCard
          v-for="item in erronkak"
          :key="item.route"
          v-bind="item"
        />
      </div>
    </section>

    <section class="home-section">
      <h2 class="home-section__title">Baliabideak eta errepasoa</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <NavigationCard
          v-for="item in baliabideak"
          :key="item.route"
          v-bind="item"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-progress-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background-color: var(--accent-primary-soft);
  color: var(--accent-primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.hero-progress-link:hover {
  transform: translateY(-1px);
}

.home-section {
  margin-top: 2rem;
}

.home-section__title {
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-muted, var(--text-secondary));
  margin-bottom: 0.75rem;
}
</style>
