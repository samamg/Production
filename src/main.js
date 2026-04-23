import { createApp } from 'vue'
import App from './App.vue'
import 'primeicons/primeicons.css'
import "vue-toastification/dist/index.css";
import router from './router'
import Toast from "vue-toastification";


const app = createApp(App)
app.use(Toast)
app.use(router)
app.mount('#app')
