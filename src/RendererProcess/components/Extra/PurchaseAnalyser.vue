<template>
    <div class="Purchase">
        <el-scrollbar>
            <a-page-header
                style="border: 1px solid rgb(235, 237, 240)"
                title="Purchase Analyser"
                sub-title="This is a subtitle"
                @back="goBack()"
            />
            <!-- <section class="breadCrumbPanel bg2">
                <a-breadcrumb :routes="routes">
                    <template #itemRender="{ route, params, routes, paths }">
                        <span
                            v-if="routes.indexOf(route) === routes.length - 1"
                            >{{ route.breadcrumbName }}</span
                        >
                        <router-link v-else :to="paths.join('/')">{{
                            route.breadcrumbName
                        }}</router-link>
                    </template>
                </a-breadcrumb>
            </section> -->

            <a-tabs v-model:activeKey="tabActiveKey" size="large" centered>
                <a-tab-pane key="1" tab="Steam Purchases">
                    <section class="ctrlPanel bg2">
                        <a-space align="start">
                            <a-button @click="getSteamPurchases()"
                                >获取Steam订单信息</a-button
                            >
                        </a-space>
                    </section>

                    <section class="data-panel bg2">
                        <a-table
                            :columns="columns"
                            :data-source="steamPurchaseData"
                        >
                            <template #bodyCell="{ column, record }">
                                <template v-if="column.key === 'action'">
                                    <span>
                                        <a>Invite 一 {{ record.name }}</a>
                                        <a-divider type="vertical" />
                                        <a>Delete</a>
                                        <a-divider type="vertical" />
                                        <a class="ant-dropdown-link">
                                            More actions
                                        </a>
                                    </span>
                                </template>
                            </template>
                        </a-table>
                    </section>
                </a-tab-pane>
                <a-tab-pane key="2" tab="Buff Purchases" force-render>
                    <section class="ctrlPanel bg2">
                        <a-space align="start">
                            <a-button @click="getBuffPurchases()"
                                >获取Buff订单信息</a-button
                            >
                        </a-space>
                    </section>

                    <section class="data-panel bg2">
                        <a-table
                            :columns="columns"
                            :data-source="buffPurchaseData"
                        >
                            <template #bodyCell="{ column, record }">
                                <template v-if="column.key === 'action'">
                                    <span>
                                        <a>Invite 一 {{ record.name }}</a>
                                        <a-divider type="vertical" />
                                        <a>Delete</a>
                                        <a-divider type="vertical" />
                                        <a class="ant-dropdown-link">
                                            More actions
                                        </a>
                                    </span>
                                </template>
                            </template>
                        </a-table>
                    </section>
                </a-tab-pane>
            </a-tabs>
        </el-scrollbar>
    </div>
</template>

<script>
import { errorCaptured } from "@/RendererProcess/utilities/help";
import { defineComponent, ref } from "vue";
import { message, Modal } from "ant-design-vue";

export default defineComponent({
    setup() {},

    methods: {
        async getSteamPurchases() {
            let [err, msg] = await errorCaptured(this.$http2, {
                url: "/getSteamPurchases",
                method: "POST",
            });

            if (msg) {
                console.log("msg", msg);
                this.steamPurchaseData = this.processData(msg.data.data);
                message.success(msg.data.message);
            }
        },

        async getBuffPurchases() {
            let [err, msg] = await errorCaptured(this.$http2, {
                url: "/getBuffPurchases",
                method: "POST",
            });

            if (msg) {
                console.log("msg", msg);
                this.buffPurchaseData = this.processData(msg.data.data);
                message.success(msg.data.message);
            }
        },

        /*------*/
        processData(payload) {
            console.log("payload", payload);
            let newData = [];
            for (let i = 0; i < payload.length; i++) {
                let data = payload[i];
                newData.push({
                    key: i.toString(),
                    name: data.goods_name,
                    buff_price: new Number(data.buff_price).toFixed(2),
                    steam_price: new Number(data.steam_price).toFixed(2),
                    self_buy_num: data.buy_num,
                    buy_time: data.buy_time,
                });
            }

            return newData;
        },

        goBack() {
            this.$router.back();
        },
    },
});
</script>

<script setup>
const routes = ref([
    {
        path: "/",
        breadcrumbName: "home",
    },

    {
        path: "/CrawlerList",
        breadcrumbName: "first",
    },

    {
        path: "/",
        breadcrumbName: "second",
        children: [
            {
                path: "/BuffCrawler",
                breadcrumbName: "BuffCrawler",
            },
            {
                path: "/PurchaseAnalyser",
                breadcrumbName: "Layout",
            },
        ],
    },
]);

const tabActiveKey = ref("1");

const columns = [
    {
        dataIndex: "name",
        title: "名称",
    },
    {
        dataIndex: "buff_price",
        title: "成本",
        sorter: (a, b) => a.buff_price - b.buff_price,
    },
    {
        dataIndex: "steam_price",
        title: "steam价格",
        sorter: (a, b) => a.steam_price - b.steam_price,
    },
    {
        dataIndex: "self_buy_num",
        title: "购买量",
        sorter: (a, b) => a.selfBuyNum - b.selfBuyNum,
    },
    {
        dataIndex: "buy_time",
        title: "购买日期",
    },
    {
        dataIndex: "operation",
        title: "operation",
    },
];

const steamPurchaseData = ref([]);
const buffPurchaseData = ref([]);

const doSearch = (inputValue, item) => {
    return item.name.indexOf(inputValue) > -1;
};

defineExpose({
    steamPurchaseData,
    buffPurchaseData,
});
</script>


<style scoped>
.Purchase {
    border-radius: 20px;
    height: 100%;
    overflow: hidden;
}

.breadCrumbPanel {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: 15px 25px;
    margin-bottom: 10px;
    border-radius: 20px;
}

.ctrlPanel {
    display: flex;
    flex-direction: row;
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
</style>