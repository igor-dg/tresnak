import { createApp } from 'vue';
import './assets/style.css';
import App from './App.vue';
import router from './router';
import '@fontsource/montserrat/400.css'; // Regular
import '@fontsource/montserrat/500.css'; // Medium
import '@fontsource/montserrat/600.css'; // Semi-bold
import '@fontsource/montserrat/700.css'; // Bold


const app = createApp(App);
app.use(router);
app.mount('#app');