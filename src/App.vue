<template>

    <div class="container light_theme">

        <header class="header-wrap">

            <CustomTitleBar />

        </header>

        <main class="main-wrap">

            <aside class="left-panel-wrap">

                <SideNav />

            </aside>

            <article class="article-wrap">

                <router-view/>

            </article>


        </main>


        <footer>

        </footer>


        <Bg></Bg>

    </div>


</template>

<script>

    import CustomTitleBar from "@/RendererProcess/components/Root/CustomTitleBar.vue"
    import SideNav from "@/RendererProcess/components/Root/SideNav.vue";
    import Bg from "@/RendererProcess/components/Root/Bg.vue";

    export default {
        components : {
            SideNav,
            Bg,
            CustomTitleBar,
        },

        computed : {
            theme (){
                return this.$store.state.SettingManager.theme
            },

            accentColor (){
                return this.$store.state.SettingManager.accentColor
            }
        }
    }

</script>

<style>

    @import "./RendererProcess/assets/cssAssets/themer.css";
    @import "./RendererProcess/assets/cssAssets/utilityClasses.css";


    * {
        scroll-behavior: smooth;
        box-sizing: border-box;
    }

    body{
        height: 100vh;
        overflow: hidden;
        padding: 0;
        margin:0;
    }

    button{
        -webkit-app-region : no-drag;
    }


    #app {
        height: 100vh;
        background: rgb(8, 8, 8);
    }

    .container {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .header-wrap{

    }

    .main-wrap{
        display: flex;
        height: 100vh;
        flex-direction: row;
        padding: 10px;
        gap:10px;
    }

    .left-panel-wrap{
        position: relative;
        flex:0;
        display: flex;
        flex-direction: column;
        width: 220px;
        min-width: 220px;
    }

    .article-wrap{
        position: relative;
        flex:1;
    }




</style>
