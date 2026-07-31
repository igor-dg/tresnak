import { createRouter, createWebHistory } from 'vue-router'

const baseUrl = import.meta.env.PROD ? '/tresnak/' : '/';

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: '/',
      name: 'hasiera',
      component: () => import('../views/Hasiera.vue')
    },
    {
      path: '/sinonimoak-jokoa',
      name: 'sinonimoak-jokoa',
      component: () => import('../views/SinonimoakJokoa.vue')
    },
    {
      path: '/sinonimoak-zerrenda',
      name: 'sinonimoak-zerrenda',
      component: () => import('../views/SinonimoakZerrenda.vue')
    },
    {
      path: '/hiztegia',
      name: 'hiztegia',
      component: () => import('../views/Hiztegia.vue')
    },
    {
      path: '/hiztegle',
      name: 'hiztegle',
      component: () => import('../views/HiztegleView.vue')
    },
    {
      path: '/aditzak',
      name: 'aditzak',
      component: () => import('../views/Aditzak.vue')
    },
    {
      path: '/estatistikak',
      name: 'estatistikak',
      component: () => import('../views/StatsView.vue')
    },
    {
      path: '/aditz-taulak',
      name: 'aditz-taulak',
      component: () => import('../views/ConjugationTables.vue')
    },
  ]
})

export default router