import { createApp } from 'vue'
import App from './App.vue'
import router from './RendererProcess/router'
import store from './RendererProcess/store'

import ElementPlus from 'element-plus';

createApp(App)
    .use(store)
    .use(router)
    .use(ElementPlus)
    .mount('#app');
