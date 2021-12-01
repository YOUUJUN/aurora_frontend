<template>

    <div class="BuffCrawler">

        <el-scrollbar>

            <section class="title bg2">
                <h2>Buff Crawler</h2>
            </section>

            <section class="status-panel bg2">

                <a-descriptions title="User Info" bordered>
                    <a-descriptions-item label="Product">Cloud Database</a-descriptions-item>
                    <a-descriptions-item label="Billing Mode">Prepaid</a-descriptions-item>
                    <a-descriptions-item label="Automatic Renewal">YES</a-descriptions-item>
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
                        :data-source="mockData"
                        :disabled="disabled"
                        :show-search="showSearch"
                        :filter-option="(inputValue, item) => item.title.indexOf(inputValue) !== -1"
                        :show-select-all="false"
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

    import {defineComponent, ref} from 'vue'

    const mockData = [];
    for (let i = 0; i < 10; i++) {
        mockData.push({
            key: i.toString(),
            title: `content${i + 1}`,
            description: `description of content${i + 1}`,
            disabled: i % 4 === 0,
        });
    }

    const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

    const leftTableColumns = [
        {
            dataIndex: 'title',
            title: 'Name',
        },
        {
            dataIndex: 'description',
            title: 'Description',
        },
    ];
    const rightTableColumns = [
        {
            dataIndex: 'title',
            title: 'Name',
        },
    ];



    export default defineComponent({

        setup(props){

            const actPage = ref(0);

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


            return {
                actPage,

                mockData,
                targetKeys,
                disabled,
                showSearch,
                leftColumns,
                rightColumns,
                onChange,
                getRowSelection,
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


</style>
