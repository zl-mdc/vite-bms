import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import 'normalize.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import globalApp from './global/index'
const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
// globalApp(app)
app.mount('#app')
