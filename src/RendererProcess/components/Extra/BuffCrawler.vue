<template>
    
    <div class="BuffCrawler">
        <el-scrollbar>
            <section class="title bg2">
                <h2>Buff Crawler</h2>
            </section>

            <section class="status-panel bg2">
                <a-descriptions title="Server Info" bordered>
                    <a-descriptions-item label="Product"
                        >Buff Crawler</a-descriptions-item
                    >
                    <a-descriptions-item label="Control Panel" :span="2">
                        <a-space>
                            <a-button @click="startBuffCrawler()"
                                >启动</a-button
                            >
                            <a-button @click="getBuffCrawlerLog()"
                                >获取打印日志</a-button
                            >
                        </a-space>
                    </a-descriptions-item>
                    <a-descriptions-item label="Status">
                        <a-badge
                            :status="serverStatus"
                            :text="serverStatusText"
                        />
                    </a-descriptions-item>
                    <a-descriptions-item label="Start time">{{
                        serverStartTime
                    }}</a-descriptions-item>
                    <a-descriptions-item label="End Time">{{
                        serverEndTime
                    }}</a-descriptions-item>
                    <a-descriptions-item label="Server Info">
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
                <a-space style="flex-wrap: wrap">
                    <a-button @click="confirmAction(actBuff)"
                        >BUFF爬虫启动！！</a-button
                    >
                    <a-button @click="confirmAction(actPageBuff)"
                        >BUFF启动从</a-button
                    >
                    <a-input-number v-model:value="actPage" />
                    <a-button @click="confirmAction(stopBuff)"
                        >BUFF爬虫关闭！！</a-button
                    >
                    <a-button @click="confirmAction(gatherBuff)"
                        >启动BUFF数据汇总</a-button
                    >
                    <a-button @click="reverseBuff()"
                        >启动BUFF数据汇总(倒序)</a-button
                    >
                    <a-button @click="confirmAction(historyBuff)"
                        >启动BUFF历史数据加载</a-button
                    >
                    <a-button @click="confirmAction(actBuffHistoryPrices)"
                        >BUFF历史价格爬虫启动！！</a-button
                    >
                    <a-button @click="confirmAction(stopBuffHistoryPrices)"
                        >BUFF历史价格爬虫关闭！！</a-button
                    >
                    <a-button @click="confirmAction(clearBuff)"
                        >清除BUFF数据！！</a-button
                    >
                    <a-button @click="analysePurchase()"
                        >分析订单</a-button
                    >
                </a-space>
            </section>

            <section class="data-panel bg2">
                <a-transfer
                    v-model:target-keys="targetKeys"
                    :data-source="buffData"
                    :disabled="disabled"
                    :show-search="showSearch"
                    :show-select-all="true"
                    :filter-option="doSearch"
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
                            :columns="
                                direction === 'left'
                                    ? leftColumns
                                    : rightColumns
                            "
                            :class="{ rightTable: direction === 'right' }"
                            :data-source="filteredItems"
                            size="default"
                            :custom-row="
                                ({ key, disabled: itemDisabled }) => ({
                                    onClick: () => {
                                        if (itemDisabled || listDisabled)
                                            return;
                                        onItemSelect(
                                            key,
                                            !selectedKeys.includes(key)
                                        );
                                    },
                                })
                            "
                        >
                            <template #bodyCell="{ column, text, record }">
                                <template
                                    v-if="
                                        ['cost', 'selfBuyNum', 'steamPrice'].includes(
                                            column.dataIndex
                                        )
                                    "
                                >
                                    <div>
                                        <a-input
                                            v-if="editableData[record.key]"
                                            v-model:value="
                                                editableData[record.key][
                                                    column.dataIndex
                                                ]
                                            "
                                            style="margin: -5px 0"
                                        />
                                        <template v-else>
                                            {{ text }}
                                        </template>
                                    </div>
                                </template>
                                <template
                                    v-else-if="column.dataIndex === 'operation'"
                                >
                                    <div class="editable-row-operations">
                                        <a-space>
                                            <span
                                                v-if="editableData[record.key]"
                                            >
                                                <a @click="save(record.key)"
                                                    >Save</a
                                                >
                                                <a-popconfirm
                                                    title="Sure to cancel?"
                                                    @confirm="
                                                        cancel(record.key)
                                                    "
                                                >
                                                    <a>Cancel</a>
                                                </a-popconfirm>
                                            </span>
                                            <span v-else>
                                                <a @click="edit(record.key)"
                                                    >Edit</a
                                                >
                                            </span>
                                        </a-space>
                                    </div>
                                </template>
                            </template>
                        </a-table>
                    </template>

                    <template #footer="{ direction }">
                        <a-button
                            v-if="direction === 'right'"
                            style="float: left; margin: 5px"
                            @click="saveToSteam"
                        >
                            从Steam购买
                        </a-button>
                        <a-button
                            v-if="direction === 'right'"
                            style="float: left; margin: 5px"
                            @click="saveToBuff"
                        >
                            从Buff购买
                        </a-button>
                    </template>
                </a-transfer>
            </section>
        </el-scrollbar>
    </div>
    
</template>


<script>
import { sendMessageToNode } from "@/RendererProcess/utilities";
import { errorCaptured } from "@/RendererProcess/utilities/help";

import { computed, defineComponent, ref, reactive, createVNode } from "vue";

import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";

const { ipcRenderer } = window.require("electron");

const originTargetKeys = [];

const leftTableColumns = [
    {
        dataIndex: "name",
        title: "名称",
        width: 300,
        resizable: true,
    },
    {
        dataIndex: "costPerformance",
        title: "性价比",
        sorter: (a, b) => a.costPerformance - b.costPerformance,
    },
    // {
    //     dataIndex: "historyPrices",
    //     title: "buff历史价格",
    //     sorter: (a, b) => a.historyPrices - b.historyPrices,
    // },
    {
        dataIndex: "cost",
        title: "成本",
        sorter: (a, b) => a.cost - b.cost,
    },
    {
        dataIndex: "steamPrice",
        title: "steam价格",
        sorter: (a, b) => a.steamPrice - b.steamPrice,
    },
    {
        dataIndex: "difference",
        title: "差价",
        sorter: (a, b) => a.difference - b.difference,
    },
    {
        dataIndex: "buyNum",
        title: "销售量",
        sorter: (a, b) => a.buyNum - b.buyNum,
    },
    {
        dataIndex: "buffProfits",
        title: "预估利润",
        sorter: (a, b) => a.buffProfits - b.buffProfits,
    },
];

const rightTableColumns = [
    {
        dataIndex: "name",
        title: "名称",
    },
    {
        dataIndex: "cost",
        title: "成本",
        sorter: (a, b) => a.cost - b.cost,
    },
    {
        dataIndex: "steamPrice",
        title: "steam价格",
        sorter: (a, b) => a.steamPrice - b.steamPrice,
    },
    {
        dataIndex: "selfBuyNum",
        title: "购买量",
        sorter: (a, b) => a.selfBuyNum - b.selfBuyNum,
    },
    {
        dataIndex: "operation",
        title: "operation",
    },
];

export default defineComponent({
    mounted() {},

    methods: {
        confirmAction(action) {
            let title = "";
            let funcName = action.name.split(" ").pop();
            switch (funcName) {
                case "actBuff":
                    title = "是否启动BUFF爬虫?";
                    break;
                case "actPageBuff":
                    title = "是否启动BUFF爬虫?";
                    break;
                case "stopBuff":
                    title = "是否关闭BUFF爬虫?";
                    break;
                case "gatherBuff":
                    title = "是否创建BUFF数据汇总?";
                    break;
                case "historyBuff":
                    title = "是否启动BUFF历史数据加载?";
                    break;
                case "actBuffHistoryPrices":
                    title = "是否启动BUFF历史价格爬虫?";
                    break;
                case "stopBuffHistoryPrices":
                    title = "是否关闭BUFF历史价格爬虫?";
                    break;
                case "clearBuff":
                    title = "是否清除BUFF数据?";
                    break;
            }

            Modal.confirm({
                title,
                icon: createVNode(ExclamationCircleOutlined),
                onOk() {
                    return new Promise((resolve, reject) => {
                        action().then(() => {
                            resolve();
                        });
                    });
                },

                onCancel() {},
            });
        },

        /*---buff service qpi---*/
        async actBuff() {
            let [err, msg] = await errorCaptured(this.$http2, {
                url: "/actBuff",
                method: "POST",
            });

            if (msg) {
                message.success(msg.data.message);
            }
        },

        async actPageBuff() {
            let [err, msg] = await errorCaptured(this.$http2, {
                url: "/actBuff",
                method: "POST",
                data: {
                    page: this.actPage,
                },
            });

            if (msg) {
                message.success(msg.data.message);
            }
        },

        async stopBuff() {
            let [err, msg] = await errorCaptured(this.$http2, {
                url: "/stopBuff",
                method: "POST",
            });

            if (msg) {
                message.success(msg.data.message);
            }
        },

        async clearBuff() {
            let [err, msg] = await errorCaptured(this.$http2, {
                url: "/clearBuff",
                method: "POST",
            });

            if (msg) {
                message.success(msg.data.message);
            }
        },

        async gatherBuff() {
            let [err, msg] = await errorCaptured(this.$http2, {
                url: "/gatherBuff",
                method: "POST",
            });

            if (msg) {
                this.processBuffData(msg.data.data);
                message.success(msg.data.message);
            }
        },

        reverseBuff() {
            if (this.buffData.length === 0) {
                this.gatherBuff();
            }
            this.buffData.reverse();
        },

        async actBuffHistoryPrices() {
            let [err, msg] = await errorCaptured(this.$http2, {
                url: "/actBuffHistoryPrices",
                method: "POST",
            });

            if (msg) {
                message.success(msg.data.message);
            }
        },

        async stopBuffHistoryPrices() {
            let [err, msg] = await errorCaptured(this.$http2, {
                url: "/stopBuffHistoryPrices",
                method: "POST",
            });

            if (msg) {
                message.success(msg.data.message);
            }
        },

        async historyBuff() {
            let [err, msg] = await errorCaptured(this.$http2, {
                url: "/getBuffHistoryPrices",
                method: "POST",
            });

            if (msg) {
                this.processBuffData(msg.data.data);
                message.success(msg.data.message);
            }
        },


        analysePurchase(){
            this.goTo('/Crawler/PurchaseAnalyser');
        },



        /*------*/
        processBuffData(buffData) {
            for (let i = 0; i < buffData.length; i++) {
                let data = buffData[i];
                this.buffData.push({
                    key: i.toString(),
                    name: data.name,
                    costPerformance: new Number(data.costPerformance).toFixed(
                        2
                    ),
                    historyPrices: data.historyPrice,
                    cost: new Number(data.cost).toFixed(2),
                    steamPrice: new Number(data.steamPrice).toFixed(2),
                    difference: new Number(data.difference).toFixed(2),
                    buyNum: data.buyNum,
                    buffProfits: new Number(data.buffProfits).toFixed(2),
                });
            }
        },

        resetTransferStyle(params) {
            console.log("params", params);
            if (params.direction === "left") {
                return {
                    flex: 1,
                };
            } else {
                return {
                    flex: 0,
                };
            }
        },

        doSearch(inputValue, item) {
            return item.name.indexOf(inputValue) > -1;
        },

        /*---transfer footer---*/

        async saveToSteam() {
            let targetKeys = this.targetKeys;
            let buffData = this.buffData;

            if (!targetKeys) {
                return;
            }

            let rightData = [];
            for (let i = 0; i < targetKeys.length; i++) {
                console.log(targetKeys[i]);
                rightData.push(buffData[targetKeys[i]]);
            }

            console.log("rightData", rightData);

            let [err, msg] = await errorCaptured(this.$http2, {
                url: "/saveSteamPurchase",
                method: "POST",
                data: {
                    goods: rightData,
                    buy_time: new Date().getTime(),
                },
            });

            if (msg) {
                if(msg.data.status == 1){
                    message.success(msg.data.message);
                }else{
                    message.error(msg.data.message);
                }
            }

            if (err) {
                console.log("err", err);
            }
        },

        async saveToBuff() {

            let targetKeys = this.targetKeys;
            let buffData = this.buffData;

            if (!targetKeys) {
                return;
            }

            let rightData = [];
            for (let i = 0; i < targetKeys.length; i++) {
                rightData.push(buffData[targetKeys[i]]);
            }

            console.log("rightData", rightData);

            let [err, msg] = await errorCaptured(this.$http2, {
                url: "/saveBufffPurchase",
                method: "POST",
                data: {
                    goods: rightData,
                    buy_time: new Date().getTime(),
                },
            });

            if (msg) {
                if(msg.data.status == 1){
                    message.success(msg.data.message);
                }else{
                    message.error(msg.data.message);
                }
            }

            if (err) {
                console.log("err", err);
            }


        },





        goTo (target){
            this.$router.push(target);
        },
    },
});
</script>

<script setup>
const actPage = ref(0);

/*--data transfer--*/
const targetKeys = ref(originTargetKeys);
const disabled = ref(false);
const showSearch = ref(true);
const leftColumns = ref(leftTableColumns);
const rightColumns = ref(rightTableColumns);

/*--修改行--*/
const editableData = reactive({});
const edit = (key) => {
    editableData[key] = buffData.value.filter((item) => key === item.key)[0];
};
const save = (key) => {
    Object.assign(
        buffData.value.filter((item) => key === item.key)[0],
        editableData[key]
    );
    delete editableData[key];
};
const cancel = (key) => {
    delete editableData[key];
};

/*--buff--*/
const buffData = ref([]);
const serverStatus = ref("default");
const serverStatusText = ref("closed");
const serverStartTime = ref("");
const serverEndTime = ref("");

const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log("nextTargetKeys", nextTargetKeys);
    let rightData = [];
    console.log("buffData", buffData);
    for (let i = 0; i < nextTargetKeys.length; i++) {
        rightData.push(buffData._rawValue[nextTargetKeys[i]]);
    }
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
                .filter((item) => !item.disabled)
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

const startBuffCrawler = () => {
    Modal.confirm({
        title: "是否确认打开服务?",
        icon: createVNode(ExclamationCircleOutlined),
        content: "该操作会在后台启动 pm2 buffCrawler 服务",
        onOk() {
            return new Promise((resolve, reject) => {
                sendMessageToNode("startBuffCrawler");
                ipcRenderer.on("buffCrawlerRunning", (e, payload) => {
                    serverStatus.value = "processing";
                    serverStatusText.value = "Running";
                    serverStartTime.value = new Date().toLocaleString();
                    message.success("服务启动成功!");
                    resolve();
                });
            });
        },

        onCancel() {},
    });
};

const getBuffCrawlerLog = () => {
    sendMessageToNode("getBuffCrawlerLog");
};

defineExpose({
    buffData,
    targetKeys,
});
</script>

<style scoped>
.BuffCrawler {
    border-radius: 20px;
    height: 100%;
    overflow: hidden;
}

.title {
    padding: 15px 25px;
    margin-bottom: 10px;
    border-radius: 20px;
}

.title h2 {
    font-size: 18px;
    margin: 0;
}

.status-panel {
    padding: 15px 25px;
    margin-bottom: 10px;
    border-radius: 20px;
}

.ctrlPanel {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    padding: 15px 25px;
    margin-bottom: 10px;
    border-radius: 20px;
}

.data-panel {
    padding: 15px;
    border-radius: 20px;
}

/*--右边穿梭框--*/

.rightTable {
    width: 640px;
}
</style>
