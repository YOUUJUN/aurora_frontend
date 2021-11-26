<template>

    <div class="Menu">

        <div class="top-wrap">

            <div class="top">

                <el-scrollbar>

                    <div class="functions">



                    </div>


                </el-scrollbar>

            </div>

        </div>


        <div class="setting-wrap">

            <el-button :icon="Setting" round @click="openSetting()">设置</el-button>

        </div>

    </div>


    <SettingPanel
        ref = "settingPanel"
    />

</template>

<script setup>

    import {
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
        display: flex;
        flex-direction: column;
    }

    .setting-wrap{
        display: flex;
        flex-direction: column;
        flex:0;
        padding:15px;
    }

    .setting-wrap button{
        font-size: 16px;
    }

    .setting-wrap :deep(.el-icon){
        font-size: 16px;
        margin-right: 6px;
    }

</style>














