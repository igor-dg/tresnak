<script setup>
defineProps({
  title: String,
  description: String,
  route: String,
});
</script>

<template>
  <router-link :to="route" class="nav-card text-decoration-none">
    <div class="card h-100 shadow-sm hover-effect">
      <div class="card-body">
        <h3 class="card-title h4 mb-3">{{ title }}</h3>
        <p class="card-text text-muted">{{ description }}</p>
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

.card {
  border: none;
  border-radius: 1rem;
  background-color: #ffffff;
}

.card-title {
  color: #2c3e50;
}

.card-text {
  line-height: 1.6;
}
</style>
