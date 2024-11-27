<script setup>
const props = defineProps(['sistemas'])
const emit = defineEmits(['update:sistemas'])
</script>

<template>
    <div>
      <h4>Sistemak</h4>
      <div v-for="sistema in sistemas" :key="sistema.id" class="toggle-switch-container">
        <label class="toggle-switch">
          <input 
            type="checkbox" 
            v-model="sistema.active" 
            @change="$emit('update:sistemas', sistemas)"
          >
          <span class="slider round"></span>
        </label>
        <span class="toggle-label">{{ sistema.name }}</span>
      </div>
    </div>
  </template>
  
  <style scoped>
  .toggle-switch-container {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    margin-right: 10px;
  }
  
  .toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
  }
  
  input:checked + .slider {
    background-color: #2196F3;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }
  
  .slider.round {
    border-radius: 34px;
  }
  
  .slider.round:before {
    border-radius: 50%;
  }
  
  .toggle-label {
    font-size: 1rem;
  }
  </style>