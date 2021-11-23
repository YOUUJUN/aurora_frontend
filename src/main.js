import { createApp } from 'vue'
import App from './App.vue'
import router from './RendererProcess/router'
import store from './RendererProcess/store'

import {ElButton, ElButtonGroup} from 'element-plus';
import 'element-plus/dist/index.css'

const components = [ElButton, ElButtonGroup];

const app = createApp(App);

components.forEach((component) => {
    app.use(component);
});


app.use(store)
    .use(router)
    .mount('#app');
