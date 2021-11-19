<template>




    <div class="container">

        <header>

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


    </div>


</template>

<script>

    import SideNav from "@/RendererProcess/components/Root/SideNav.vue";

    export default {
        components : {
            SideNav
        }
    }

</script>

<style>

    @import "./RendererProcess/assets/cssAssets/utilityClasses.css";


    * {
        scroll-behavior: smooth;
    }

    body{
        height: 100vh;
        overflow: hidden;
        padding: 0;
        margin:0;
    }


    #app {
        height: 100vh;
    }

    .container{
        height: 100%;
        /*background-color: red;*/
    }

    .main-wrap{
        display: flex;
        flex-direction: row;
    }

    .left-panel-wrap{
        height: 100vh;
        width: 300px;
        background-color: #1e1f26;
    }

    .article-wrap{
        flex:1;
        height: 100vh;
        /*background-color: #131417;*/
    }




</style>
