<template>

    <div class="Crawler">

        <section class="title">
            <h2>标题</h2>
        </section>

        <section class="panel-wrap bg2">
            <div class="panel">

                <el-scrollbar>

                    <div class="cards-wrap">

                        <el-card
                                shadow="hover"
                                class="card"
                                :body-style="{ padding: '0px' }"
                        >
                            <img
                                    src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                                    class="image"
                            />
                            <div style="padding: 14px">
                                <span>Yummy hamburger</span>
                                <div class="bottom">
                                    <time class="time">2021-11-29</time>
                                    <el-button type="text" class="button">Operating</el-button>
                                </div>
                            </div>
                        </el-card>

                    </div>

                </el-scrollbar>

            </div>
        </section>

    </div>

</template>

<script setup>



</script>

<script>
    export default {
        name: "Crawler"
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

    .title{
        flex:0;
    }

    .panel-wrap{
        position: relative;
        flex: 1;
        border-radius: 20px;
        overflow: hidden;
    }

    .panel{
        position: absolute;
        top:0;
        bottom:0;
        width: 100%;
    }

    .cards-wrap{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        padding:30px;
    }

    .cards-wrap :deep(.el-card){
        margin:15px;
    }

</style>
