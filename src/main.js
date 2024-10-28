import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'
import 'bootstrap'
// import 'bootstrap/scss/bootstrap.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'

const emitter = mitt()
const app = createApp(App).use(router)

app.config.globalProperties.emitter = emitter
app.mount('#app')
