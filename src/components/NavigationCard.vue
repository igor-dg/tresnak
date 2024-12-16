<script setup>
defineProps({
  title: String,
  description: String,
  route: String,
});
</script>

<template>
  <router-link :to="route" class="text-[var(--text-primary)] text-decoration-none h-full block">
    <div class="card bg-white/30 shadow-sm hover-effect backdrop-blur-lg rounded-3xl p-6 h-full flex flex-col">
      <div class="card-body flex-grow">
        <h3 class="card-title h4 mb-3 text-[var(--text-primary)]">{{ title }}</h3>
        <p class="card-text text-muted text-[var(--text-secondary)]">{{ description }}</p>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.hover-effect {
  transition: transform 0.2s, box-shadow 0.2s;
}

.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.card-text {
  line-height: 1.6;
}
</style>
