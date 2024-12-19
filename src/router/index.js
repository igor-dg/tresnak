import { createRouter, createWebHistory } from 'vue-router'
import Hasiera from '../views/Hasiera.vue'

const baseUrl = import.meta.env.PROD ? '/tresnak/' : '/';

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: '/',
      name: 'hasiera',
      component: Hasiera
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
      path: '/aditzak',
      name: 'aditzak',
      component: () => import('../views/Aditzak.vue')
    }
  ]
})

export default router