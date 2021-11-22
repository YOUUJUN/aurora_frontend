<template>

    <div class="customTitleBar bg1">

        <div class="leftSide">
            <p>侦察姬</p>
        </div>

        <div class="rightSide">

            <div class="ctrlBtn-wrap">

                <el-button :icon="Search" circle>点我</el-button>

                <button>
                    <img src="@/RendererProcess/assets/images/minimize.svg">
                </button>

                <button>
                    <img src="@/RendererProcess/assets/images/fullscreen.svg">
                </button>

                <button>
                    <img src="@/RendererProcess/assets/images/close.svg">
                </button>

            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "CustomTitleBar"
    }
</script>

<style scoped>

    .customTitleBar{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 5px 20px;
        width: 100%;
        -webkit-app-region: drag;
    }

    .leftSide{
        display: flex;
        flex-direction: row;
    }

    .leftSide p{
        font-size:.9em;
        margin:0;
        padding:0;
    }

    .ctrlBtn-wrap{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .ctrlBtn-wrap button img{
        width: 20px;
        height: auto;
    }



</style>
