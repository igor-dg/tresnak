<!-- NavMenu.vue -->
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { X, Menu } from 'lucide-vue-next'

const isOpen = ref(false)
const router = useRouter()

const navigationItems = [
  {
    name: 'Hasiera',
    route: '/',
    description: 'Orri nagusia'
  },
  {
    name: 'Hiztegia',
    route: '/hiztegia',
    description: 'C1-eko hiztegia'
  },
  {
    name: 'Aditzak',
    route: '/aditzak',
    description: 'Aditz laguntzaileak'
  },
  {
    name: 'Sinonimoak',
    route: '/sinonimoak-jokoa',
    description: 'Sinonimoen jokoa'
  },
  {
    name: 'Sinonimoen Zerrenda',
    route: '/sinonimoak-zerrenda',
    description: 'Sinonimoen zerrenda'
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
      class="menu fixed top-7 right-5 z-50 p-2 rounded-lg shadow-lg bg-[var(--bg-card)] hover:bg-gray-100 transition-colors"
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
        'fixed right-0 top-0 h-full w-80 bg-[var(--bg-card)] z-40 transform transition-transform duration-300 ease-in-out shadow-lg',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      ]"
    >
      <div class="pt-24 px-4">
        <nav>
          <ul class="space-y-4">
            <li v-for="item in navigationItems" :key="item.route">
              <button
                @click="navigateTo(item.route)"
                class="w-full text-left p-4 rounded-lg bg-[var(--button-bg)] hover:bg-[var(--button-hover-bg)] transition-colors group"
              >
                <span class="block text-lg font-semibold text-[var(--button-text-primary)]">
                  {{ item.name }}
                </span>
                <span class="text-sm text-[var(--button-text-secondary)]">
                  {{ item.description }}
                </span>
              </button>
            </li>
          </ul>
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
    border-radius: 12px;
    transition: box-shadow 0.3s ease;
}

.menu:active {
    color:black;
    box-shadow: inset 8px 8px 16px rgba(0, 0, 0, 0.2), inset -8px -8px 16px rgba(255, 255, 255, 0.2);
}
</style>