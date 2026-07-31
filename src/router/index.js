import { createRouter, createWebHistory } from 'vue-router'

const baseUrl = import.meta.env.PROD ? '/tresnak/' : '/';

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: '/',
      name: 'hasiera',
      component: () => import('../views/Hasiera.vue'),
      meta: { section: 'home' }
    },
    {
      path: '/sinonimoak-jokoa',
      name: 'sinonimoak-jokoa',
      component: () => import('../views/SinonimoakJokoa.vue'),
      meta: { section: 'sinonimoak' }
    },
    {
      path: '/sinonimoak-zerrenda',
      name: 'sinonimoak-zerrenda',
      component: () => import('../views/SinonimoakZerrenda.vue'),
      meta: { section: 'sinonimoak' }
    },
    {
      path: '/hiztegia',
      name: 'hiztegia',
      component: () => import('../views/Hiztegia.vue'),
      meta: { section: 'hiztegia' }
    },
    {
      path: '/hiztegle',
      name: 'hiztegle',
      component: () => import('../views/HiztegleView.vue'),
      meta: { section: 'hiztegle' }
    },
    {
      path: '/aditzak',
      name: 'aditzak',
      component: () => import('../views/Aditzak.vue'),
      meta: { section: 'aditzak' }
    },
    {
      path: '/estatistikak',
      name: 'estatistikak',
      component: () => import('../views/StatsView.vue'),
      meta: { section: 'estatistikak' }
    },
    {
      path: '/aditz-taulak',
      name: 'aditz-taulak',
      component: () => import('../views/ConjugationTables.vue'),
      meta: { section: 'taulak' }
    },
  ]
})

export default router
