import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import Select2 from 'vue3-select2-component';

createApp(App).use(router).component('Select2', Select2).mount('#app')
