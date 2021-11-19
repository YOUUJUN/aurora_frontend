import { createApp } from 'vue'
import App from './App.vue'
import router from './RendererProcess/router'
import store from './RendererProcess/store'

createApp(App).use(store).use(router).mount('#app')
