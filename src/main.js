import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './style.css';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core';

// Importa los íconos que necesites
import { fas } from '@fortawesome/free-solid-svg-icons'; // Íconos sólidos
import { far } from '@fortawesome/free-regular-svg-icons'; // Íconos regulares
import { fab } from '@fortawesome/free-brands-svg-icons'; // Íconos de marcas

// Importa el componente de Vue para Font Awesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Añade los íconos a la biblioteca
library.add(fas, far, fab);

const app = createApp(App);

// Usa Vue Router
app.use(router);

// Registra el componente de Font Awesome globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

// Monta la aplicación en el div con id "app"
app.mount('#app');
