<template>

    <h1>hello</h1>
</template>

<script>
    export default {
        name: "BuffCrawler",
        data() {
            return {
                name: 'youjun',
                actPage : 0,
                buffGatherData : []
            };
        },

        methods : {
            actBuff () {
                this.$http({
                    url : "/actBuff",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            actPageBuff() {
                this.$http({
                    url : "/actBuff",
                    method: 'POST',
                    data : {
                        page : this.actPage
                    }
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            stopBuff (){
                this.$http({
                    url : "/stopBuff",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            clearBuff (){
                this.$http({
                    url : "/clearBuff",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            gatherBuff(){
                this.$http({
                    url : "/gatherBuff",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    this.buffGatherData = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            reverseBuff(){
                if(this.buffGatherData.length === 0){
                    this.gatherBuff();
                }
                this.buffGatherData.reverse();
            },

            actBuffHistoryPrices(){
                this.$http({
                    url : "/actBuffHistoryPrices",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            stopBuffHistoryPrices(){
                this.$http({
                    url : "/stopBuffHistoryPrices",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            historyBuff(){
                this.$http({
                    url : "/getBuffHistoryPrices",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    this.buffGatherData = msg.data;
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            getName (name){
                console.log("name",name);
                var input = document.createElement("input");
                // input.style.visibility = "hidden";
                input.value = name;
                document.body.appendChild(input);
                input.select();
                document.execCommand("Copy");
            },

            goTo(url){
                window.open(url,'__blank');
            }
        }
    }
</script>

<style scoped>

</style>
