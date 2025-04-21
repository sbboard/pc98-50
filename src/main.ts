import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

const params = new URLSearchParams(window.location.search);
const progressParam = params.get('progress');
if (!progressParam) {
    const zeros = '0'.repeat(50);
    window.history.replaceState(null, '', `${window.location.pathname}?progress=${zeros}`);
}

const app = createApp(App);

app.use(createPinia());

app.mount('#app');
