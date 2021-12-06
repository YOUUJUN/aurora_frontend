<template>

    <div class="BuffCrawler">

        <el-scrollbar>

            <section class="title bg2">
                <h2>Buff Crawler</h2>
            </section>

            <section class="status-panel bg2">

                <a-descriptions title="User Info" bordered>
                    <a-descriptions-item label="Product">Cloud Database</a-descriptions-item>
                    <a-descriptions-item label="Billing Mode">
                        <a-button @click="startBuffCrawler()">启动</a-button>
                    </a-descriptions-item>
                    <a-descriptions-item label="Automatic Renewal">
                        <a-button @click="getBuffCrawlerLog()">获取打印日志</a-button>
                    </a-descriptions-item>
                    <a-descriptions-item label="Order time">2018-04-24 18:00:00</a-descriptions-item>
                    <a-descriptions-item label="Usage Time" :span="2">2019-04-24 18:00:00</a-descriptions-item>
                    <a-descriptions-item label="Status" :span="3">
                        <a-badge status="processing" text="Running" />
                    </a-descriptions-item>
                    <a-descriptions-item label="Negotiated Amount">$80.00</a-descriptions-item>
                    <a-descriptions-item label="Discount">$20.00</a-descriptions-item>
                    <a-descriptions-item label="Official Receipts">$60.00</a-descriptions-item>
                    <a-descriptions-item label="Config Info">
                        Data disk type: MongoDB
                        <br />
                        Database version: 3.4
                        <br />
                        Package: dds.mongo.mid
                        <br />
                        Storage space: 10 GB
                        <br />
                        Replication factor: 3
                        <br />
                        Region: East China 1
                        <br />
                    </a-descriptions-item>
                </a-descriptions>

            </section>

            <section class="ctrlPanel bg2">

                <a-button  @click="actBuff">BUFF爬虫启动！！</a-button>
                <a-button  @click="actPageBuff()">BUFF启动从</a-button>
                <a-input-number v-model:value="actPage"/>
                <a-button  @click="stopBuff()">BUFF爬虫关闭！！</a-button>
                <a-button  @click="gatherBuff()">启动BUFF数据汇总</a-button>
                <a-button  @click="reverseBuff()">启动BUFF数据汇总(倒序)</a-button>
                <a-button  @click="historyBuff()">启动BUFF历史数据加载</a-button>
                <a-button  @click="actBuffHistoryPrices()">BUFF历史价格爬虫启动！！</a-button>
                <a-button  @click="stopBuffHistoryPrices()">BUFF历史价格爬虫关闭！！</a-button>
                <a-button  @click="clearBuff()">清除BUFF数据！！</a-button>

            </section>

            <section class="data-panel bg2">


                <a-transfer
                        v-model:target-keys="targetKeys"
                        :data-source="buffData"
                        :disabled="disabled"
                        :show-search="showSearch"
                        :show-select-all="true"
                        showSearch = true
                        :filter-option= "doSearch"
                        :list-style="resetTransferStyle"
                        @change="onChange"
                >
                    <template
                            #children="{
                              direction,
                              filteredItems,
                              selectedKeys,
                              disabled: listDisabled,
                              onItemSelectAll,
                              onItemSelect,
                            }"
                            class="ok"
                    >
                        <a-table
                                :row-selection="
                                    getRowSelection({
                                      disabled: listDisabled,
                                      selectedKeys,
                                      onItemSelectAll,
                                      onItemSelect,
                                    })
                                  "
                                :columns="direction === 'left' ? leftColumns : rightColumns"
                                :class="{ rightTable : direction === 'right'}"
                                :data-source="filteredItems"
                                size="small"
                                :custom-row="
                                    ({ key, disabled: itemDisabled }) => ({
                                      onClick: () => {
                                        if (itemDisabled || listDisabled) return;
                                        onItemSelect(key, !selectedKeys.includes(key));
                                      },
                                    })
                                  "
                        />
                    </template>
                </a-transfer>


            </section>

        </el-scrollbar>

    </div>


</template>

<script>

    import { sendMessageToNode } from "@/RendererProcess/utilities";

    import {computed, defineComponent, ref} from 'vue'

    const buffData = ref([]);


    const originTargetKeys = [];

    const leftTableColumns = [
        {
            dataIndex: 'name',
            title: '名称',
            resizable : true,
        },
        {
            dataIndex: 'costPerformance',
            title: '性价比',
            sorter: (a, b) => a.costPerformance - b.costPerformance,
            resizable : true,
        },
        {
            dataIndex: 'historyPrices',
            title: 'buff历史价格',
            sorter: (a, b) => a.historyPrices - b.historyPrices,
            resizable : true,
        },
        {
            dataIndex: 'cost',
            title: '成本',
            sorter: (a, b) => a.cost - b.cost,
            resizable : true,
        },
        {
            dataIndex: 'steamPrice',
            title: 'steam价格',
            sorter: (a, b) => a.steamPrice - b.steamPrice,
            resizable : true,
        },
        {
            dataIndex: 'difference',
            title: '差价',
            sorter: (a, b) => a.difference - b.difference,
            resizable : true,
        },
        {
            dataIndex: 'buyNum',
            title: '销售量',
            sorter: (a, b) => a.buyNum - b.buyNum,
            resizable : true,
        },
        {
            dataIndex: 'buffProfits',
            title: '预估利润',
            sorter: (a, b) => a.buffProfits - b.buffProfits,
            resizable : true,
        },
    ];
    const rightTableColumns = [
        {
            dataIndex: 'name',
            title: '名称',
            resizable : true,
        },
    ];



    export default defineComponent({

        setup(props){

            const actPage = ref(0);

            /*--data transfer--*/
            const targetKeys = ref(originTargetKeys);
            const disabled = ref(false);
            const showSearch = ref(false);
            const leftColumns = ref(leftTableColumns);
            const rightColumns = ref(rightTableColumns);

            const onChange = (nextTargetKeys) => {
                console.log('nextTargetKeys', nextTargetKeys);
            };

            const getRowSelection = ({
                                         disabled,
                                         selectedKeys,
                                         onItemSelectAll,
                                         onItemSelect,
                                     }) => {
                return {
                    getCheckboxProps: (item) => ({
                        disabled: disabled || item.disabled,
                    }),
                    onSelectAll(selected, selectedRows) {
                        const treeSelectedKeys = selectedRows
                            .filter(item => !item.disabled)
                            .map(({ key }) => key);
                        onItemSelectAll(treeSelectedKeys, selected);
                    },
                    onSelect({ key }, selected) {
                        onItemSelect(key, selected);
                    },
                    selectedRowKeys: selectedKeys,
                };
            };


            /*--buff--*/

            const startBuffCrawler = () =>{
                sendMessageToNode('startBuffCrawler');
            };

            const getBuffCrawlerLog = () => {
                sendMessageToNode('getBuffCrawlerLog');
            }

            return {
                actPage,

                targetKeys,
                disabled,
                showSearch,
                leftColumns,
                rightColumns,
                onChange,
                getRowSelection,

                startBuffCrawler,
                getBuffCrawlerLog,

                buffData

            }

        },

        methods : {

            gatherBuff(){
                this.$http2({
                    url : "/gatherBuff",
                    method: 'POST'
                }).then(msg => {
                    var msg = msg.data;
                    this.processBuffData(msg.data);
                    alert(msg.message);
                }).catch(err => {
                    console.log(err);
                })
            },

            processBuffData (buffData){
                for (let i = 0; i < buffData.length; i++) {
                    let data = buffData[i];
                    this.buffData.push({
                        key: i.toString(),
                        name: data.name,
                        costPerformance: data.costPerformance,
                        historyPrices : data.historyPrices,
                        cost : data.cost,
                        steamPrice : data.steamPrice,
                        difference : data.difference,
                        buyNum : data.buyNum,
                        buffProfits : data.buffProfits
                    });
                }
            },

            resetTransferStyle(params){
                console.log('params', params)
                if(params.direction === 'left'){
                    return {
                        "flex" : 1
                    }
                }else{
                    return {
                        "flex" : 0
                    }
                }
            },

            doSearch(inputValue, item){
                return item.name.indexOf(inputValue) > -1;
            }
        }

    })
</script>

<style scoped>

    .BuffCrawler{
        border-radius: 20px;
        height: 100%;
        overflow: hidden;
    }

    .title{
        padding:15px 25px;
        margin-bottom:10px;
        border-radius: 20px;
    }

    .title h2{
        font-size: 18px;
        margin:0;
    }

    .status-panel{
        padding:15px 25px;
        margin-bottom:10px;
        border-radius: 20px;
    }

    .ctrlPanel{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
        align-items: center;
        padding:15px 25px;
        margin-bottom:10px;
        border-radius: 20px;
    }

    .ctrlPanel:deep(.ant-btn){
        margin:6px 0;
    }

    .data-panel{
        padding:15px;
        border-radius: 20px;
    }


    /*--右边穿梭框--*/

    .rightTable{
        width: 400px;
    }


</style>
