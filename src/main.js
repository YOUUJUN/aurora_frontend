import { createApp } from 'vue'
import App from './App.vue'
import router from './RendererProcess/router'
import store from './RendererProcess/store'
import axios from '@/RendererProcess/utilities/http';
import localHttp from '@/RendererProcess/utilities/localhttp';

import {
    ElButton,
    ElButtonGroup,
    ElForm,
    ElFormItem,
    ElRadio,
    ElRadioGroup,
    ElCheckbox,
    ElSelect,
    ElOption,
    ElInput,
    ElDatePicker,
    ElTimePicker,
    ElCol,
    ElSwitch,
    ElAvatar,
    ElMenu,
    ElSubMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElRadioButton,
    ElScrollbar,
    ElIcon,
    ElDialog,
    ElTabs,
    ElDrawer,
    ElCard

} from 'element-plus';
import 'element-plus/dist/index.css'

const components = [
    ElButton,
    ElButtonGroup,
    ElForm,
    ElFormItem,
    ElRadio,
    ElRadioGroup,
    ElCheckbox,
    ElSelect,
    ElOption,
    ElInput,
    ElDatePicker,
    ElTimePicker,
    ElCol,
    ElSwitch,
    ElAvatar,
    ElMenu,
    ElSubMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElRadioButton,
    ElScrollbar,
    ElIcon,
    ElDialog,
    ElTabs,
    ElDrawer,
    ElCard
];

import {
    Card,
    Avatar,
    Button,
    Input,
    InputNumber,
    Descriptions,
    Badge,
    Transfer,
    Table,
    Pagination,
    Space
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const antComponents = [
    Card,
    Avatar,
    Button,
    Input,
    InputNumber,
    Descriptions,
    Badge,
    Transfer,
    Table,
    Pagination,
    Space
];


const app = createApp(App);

components.forEach((component) => {
    app.use(component);
});

antComponents.forEach((component) => {
    app.use(component);
});


app.use(store)
    .use(router)
    .mount('#app');

app.config.globalProperties.$http = axios;

app.config.globalProperties.$http2 = localHttp;

