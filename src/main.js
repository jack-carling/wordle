import { createApp } from 'vue';
import { registerSW } from 'virtual:pwa-register';
import App from './App.vue';

createApp(App).mount('#app');

registerSW();
