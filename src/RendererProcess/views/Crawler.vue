<template>

    <div class="Crawler">

        <router-view/>

    </div>

</template>

<script setup>

</script>

<script>
    export default {
        name: "Crawler",
    }
</script>

<style scoped>

    .Crawler{
        position: absolute;
        top:0;
        bottom:0;
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: hidden;
    }

</style>


