<template>

    <section class="container">

        <el-drawer
                custom-class="Setting blurred_bg blur40 bg2"
                modal-class="Setting-model"
                v-model="drawer"
                title="I am the title"
                :direction="direction"
                size="auto"
        >
            <span>Hi, there!</span>
        </el-drawer>

    </section>

</template>

<script setup>
    const props = defineProps({

    });

    import {ref} from "vue";

    let drawer = ref(false);
    let direction = ref('btt');

    function openSetting() {
        drawer.value = true;
    }

    defineExpose({
        openSetting
    })


</script>

<style scoped>

    .container{
        padding:10px;
    }

    .container:deep(.el-drawer){
        background-color: unset;
    }

    .container:deep(.Setting){
        top:10px;
        bottom:10px;
        left: 10px;
        right:10px;
        height: auto;
        width: auto;
        border: 1px solid rgba(255, 255, 255, 0.315);
        border-radius: 20px;
    }

    .container:deep(.Setting-model){
        top:40px;
        height:auto;
    }


</style>





















