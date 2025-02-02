<!-- NavMenu.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { X, Menu } from 'lucide-vue-next'

const isOpen = ref(false)
const router = useRouter()

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
  <div>
    <!-- Botón del menú hamburguesa -->
    <button
      @click="toggleMenu"
      class="menu fixed top-7 right-5 z-50 p-2 rounded-lg shadow-lg bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] hover:from-[var(--gradient-hover-from)] hover:to-[var(--gradient-hover-to)] transition-colors"
      aria-label="Menu"
    >
      <Menu v-if="!isOpen" class="w-6 h-6 text-[var(--text-primary)]" />
      <X v-else class="w-6 h-6 text-[var(--text-primary)]" />
    </button>

    <!-- Overlay del menú -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="toggleMenu"
    ></div>

    <!-- Menú desplegable -->
    <div
      :class="[
        'fixed right-0 top-0 h-full w-80 bg-white/50 z-40 transform transition-transform duration-300 ease-in-out shadow-lg',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <div class="pt-24 px-4">
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
                  class="w-full text-white rounded-full py-3 px-4 flex items-center justify-center gap-2 transition-all text-lg font-semibold focus:outline-none focus:ring-2 bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] hover:from-[var(--gradient-hover-from)] hover:to-[var(--gradient-hover-to)] focus:ring-[var(--gradient-from)] group"
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
  </div>
</template>

<style scoped>
.menu:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}
.menu {
    background: var(--button-transparent-bg);
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.2), -8px -8px 16px rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transition: box-shadow 0.3s ease;
}

.menu:active {
    box-shadow: inset 8px 8px 16px rgba(0, 0, 0, 0.2), inset -8px -8px 16px rgba(255, 255, 255, 0.2);
}
.menu:focus {
    outline: none;
}
</style>