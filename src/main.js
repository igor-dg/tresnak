import { createApp } from 'vue';
import './assets/style.css';
import App from './App.vue';
import router from './router';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import '@fontsource/montserrat/latin-400.css'; // Regular
import '@fontsource/montserrat/latin-500.css'; // Medium
import '@fontsource/montserrat/latin-600.css'; // Semi-bold
import '@fontsource/montserrat/latin-700.css'; // Bold


const app = createApp(App);
app.use(router);

const bootstrap = async () => {
  await router.isReady();
  app.mount('#app');

  if (Capacitor.isNativePlatform()) {
    // Let Vue paint the initial route before revealing the web view.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        SplashScreen.hide({ fadeOutDuration: 200 }).catch((error) => {
          console.error('Ezin izan da splash pantaila ezkutatu:', error);
        });
      });
    });
  }
};

bootstrap();
