import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axiosExample from './components/axiosExample.vue'
import store from './storeVuex/index'



const app = createApp(App)

app.use(router)
app.use(store)
app.component('axios-example', axiosExample)
app.mount('#app')
