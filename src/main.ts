import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

if (window.location.pathname === '/') {
    const zeros = '0'.repeat(50);
    window.history.replaceState(null, '', `${window.location.pathname}${zeros}`);
}

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
