import { createApp } from 'vue'
import App from './App.vue'
import router from './RendererProcess/router'
import store from './RendererProcess/store'

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
    ElDrawer

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
    ElDrawer
];

const app = createApp(App);

components.forEach((component) => {
    app.use(component);
});


app.use(store)
    .use(router)
    .mount('#app');
