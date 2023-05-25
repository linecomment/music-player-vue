import { createApp } from 'vue'
import 'vant/lib/index.css'
import './assets/icon.css';
import Vant from 'vant'
import router from '@/router';
import App from './App.vue'

const app = createApp(App)
app.use(Vant)
app.use(router)
app.mount('#app');
