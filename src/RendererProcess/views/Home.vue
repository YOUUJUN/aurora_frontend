<template>

    <div class="Home">

<!--            <Form />-->
            <UserCenter />

            <Dialog />

    </div>

</template>

<script setup>

    import Form from "@/RendererProcess/components/Root/Player/Form.vue";
    import UserCenter from "@/RendererProcess/components/Root/Player/UserCenter.vue"

    import Dialog from "@/RendererProcess/components/Root/Player/Dialog.vue";

</script>

<style scoped>

    .Home{
        position: absolute;
        top:0;
        bottom:0;
        width: 100%;
        overflow: hidden;
    }

</style>

