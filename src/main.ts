import { createApp } from 'vue';
import VueGtag from 'vue-gtag-next';
import App from './App.vue';
import './registerServiceWorker';

createApp(App)
  .use(VueGtag, {
    config: {
      id: 'G-JLMJX3X46F', //
    },
  })
  .mount('#app');
