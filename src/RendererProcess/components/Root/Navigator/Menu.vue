<template>

    <div class="Menu">

        <div class="top-wrap">

            <div class="top">

                <el-scrollbar>

                    <div class="functions">

                        <el-menu
                                default-active="1"
                                class="el-menu-vertical-demo"
                        >
                            <el-menu-item index="1">
                                <el-icon><HomeFilled /></el-icon>
                                <span>首页</span>
                            </el-menu-item>

                            <el-menu-item index="2">
                                <el-icon><Tickets /></el-icon>
                                <span>TO-DO</span>
                            </el-menu-item>
                        </el-menu>

                    </div>


                </el-scrollbar>

            </div>

        </div>


        <div class="setting-wrap">

            <el-button :icon="Setting" round @click="openSetting()">设置</el-button>

            <el-button :icon="Setting" round>测试</el-button>

        </div>

    </div>


    <SettingPanel
        ref = "settingPanel"
    />

</template>

<script setup>

    import {
        HomeFilled,
        Tickets,
        Setting,
    } from '@element-plus/icons'

    import SettingPanel from "@/RendererProcess/views/Setting.vue";

</script>

<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        setup() {
            const handleOpen = (key, keyPath) => {
                console.log(key, keyPath)
            }
            const handleClose = (key, keyPath) => {
                console.log(key, keyPath)
            }
            return {
                handleOpen,
                handleClose,
            }
        },

        methods : {
            openSetting (){
                console.log('this.$refs', this.$refs['settingPanel']);
                this.$refs['settingPanel'].openSetting();
            }
        }
    })
</script>

<style scoped>

    /deep/ .el-menu{
        background-color: inherit;
    }


    .Menu{
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .top-wrap{
        position: relative;
        flex : 1;
    }

    .top{
        position: absolute;
        top:0;
        bottom :0;
        width: 100%;

    }

    .functions{
        padding:0 15px;
    }

    .setting-wrap{
        display: flex;
        flex-direction: column;
        flex:0;
        padding:15px;
    }

    .setting-wrap button{
        margin:6px 0;
        font-size: 16px;
    }

    .setting-wrap :deep(.el-icon){
        font-size: 16px;
        margin-right: 6px;
    }

</style>














