import { createRouter, createWebHistory } from 'vue-router'
import Hasiera from '../views/Hasiera.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'hasiera',
      component: Hasiera
    },
    {
      path: '/sinonimoak-jokoa',
      name: 'sinonimoak-jokoa',
      component: () => import('../views/SinimoakJokoa.vue')
    },
    {
      path: '/sinonimoak-zerrenda',
      name: 'sinonimoak-zerrenda',
      component: () => import('../views/SinimoakZerrenda.vue')
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