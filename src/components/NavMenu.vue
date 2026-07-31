<!-- NavMenu.vue -->
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { X, Menu } from 'lucide-vue-next'
import BaseButton from '@/components/ui/BaseButton.vue'

const isOpen = ref(false)
const router = useRouter()
const route = useRoute()

const navigationGroups = [
  {
    title: 'Ikasteko erronkak',
    items: [
      {
        name: 'Aditzak',
        route: '/aditzak',
        description: 'Aditz laguntzaileak'
      },
      {
        name: 'Sinonimoak',
        route: '/sinonimoak-jokoa',
        description: 'Sinonimoen jolasa'
      },
      {
        name: 'Hiztegle',
        route: '/hiztegle',
        description: 'Hiztegia eta jolasak'
      }
    ]
  },
  {
    title: null, // Para elementos sueltos
    items: [
      {
        name: 'Estatistikak',
        route: '/estatistikak',
        description: 'Ikastearen estatistikak'
      }
    ]
  },
  {
    title: 'Baliabideak',
    items: [
      {
        name: 'Hiztegia',
        route: '/hiztegia',
        description: 'C1-eko hiztegia'
      },
      {
        name: 'Sinonimoen Zerrenda',
        route: '/sinonimoak-zerrenda',
        description: 'Sinonimoen zerrenda'
      },
      {
        name: 'Aditz taulak',
        route: '/aditz-taulak',
        description: 'Euskal aditzak jokatzeko taulak'
      }
    ]
  }
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const navigateTo = (route) => {
  router.push(route)
  isOpen.value = false
}
</script>

<template>
    <header class="mobile-topbar md:hidden">
      <router-link
        to="/"
        class="flex items-center gap-2 min-w-0 text-[var(--text-primary)] no-underline"
        aria-label="Itzuli hasierara"
      >
        <img src="/logo_basic.svg" alt="" class="w-5 h-5 shrink-0" />
        <span class="min-w-0 truncate text-base font-bold text-[var(--text-primary)]">
          {{ route.meta.title || 'Jokatu!' }}
        </span>
      </router-link>
      <BaseButton
        variant="ghost"
        icon-only
        class="shrink-0"
        :aria-label="isOpen ? 'Itxi menua' : 'Ireki menua'"
        :aria-expanded="isOpen"
        @click="toggleMenu"
      >
        <Menu v-if="!isOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </BaseButton>
    </header>

    <!-- Marca en escritorio -->
    <router-link
      to="/"
      class="hidden md:flex items-center gap-2 fixed top-5 left-5 z-50 font-bold text-base text-[var(--text-primary)]"
    >
      <img src="/logo_basic.svg" alt="" class="w-6 h-6" />
      <span>Jokatu!</span>
    </router-link>

    <!-- Botón flotante en escritorio -->
    <BaseButton
      variant="secondary"
      icon-only
      @click="toggleMenu"
      class="hidden md:inline-flex fixed top-5 right-5 z-50 shadow-sm"
      aria-label="Menua"
    >
      <Menu v-if="!isOpen" class="w-6 h-6" />
      <X v-else class="w-6 h-6" />
    </BaseButton>

    <!-- Overlay del menú -->
    <div
      v-if="isOpen"
      class="fixed inset-0 modal-backdrop z-[55]"
      @click="toggleMenu"
    ></div>

    <!-- Menú desplegable -->
    <div
      :class="[
        'fixed right-0 top-0 flex h-full w-80 max-w-[88vw] flex-col bg-[var(--bg-elevated)] border-l border-[var(--border-card)] z-[60] transform transition-transform duration-300 ease-in-out shadow-xl',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <div class="nav-drawer__header flex shrink-0 items-center justify-between border-b border-[var(--border-card)] px-4">
        <span class="font-bold text-[var(--text-primary)]">Menua</span>
        <BaseButton
          variant="ghost"
          icon-only
          aria-label="Itxi menua"
          @click="toggleMenu"
        >
          <X class="w-6 h-6" />
        </BaseButton>
      </div>

      <div class="min-h-0 flex-1 overflow-y-auto px-4 pt-6 safe-area-bottom">
        <nav>
          <div v-for="(group, index) in navigationGroups" :key="index" class="mb-8">
            <!-- Título del grupo si existe -->
            <h2 v-if="group.title" class="text-lg font-bold text-[var(--text-primary)] mb-4">
              {{ group.title }}
            </h2>
            
            <!-- Elementos del grupo -->
            <ul class="space-y-4">
              <li v-for="item in group.items" :key="item.route">
                <button
                  @click="navigateTo(item.route)"
                  class="w-full text-left rounded-md py-3 px-4 flex items-center gap-3 transition-all text-base font-semibold bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-primary)] hover:bg-[var(--accent-primary-soft)] hover:border-[var(--accent-primary)] group"
                >
                  <span >
                    {{ item.name }}
                  </span>
                  <!-- <span class="text-sm text-[var(--text-primary)]">
                    {{ item.description }}
                  </span> -->
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
</template>
