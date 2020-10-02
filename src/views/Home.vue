<template>
    <div class="home-container">
        <div class="panels">
            <div class="home-panel">
                <p>Block Height</p>
                <span>{{get(blocksLastList, `0.height`)}}</span>
            </div>
            <div class="home-panel">
                <p>Avg Block Time</p>
                <span>{{blockTime}}</span> S
            </div>
            <div class="home-panel">
                <p>Total Transaction</p>
                <span>{{listTransaction.total}}</span>
            </div>
        </div>

        <el-row :gutter="24">
            <el-col :xs="24" :sm="12">
                <Card title="blocks" link="/block">
                    <ul class="home-ul">
                        <li v-for="(item, index) in blocksLastList " :key="index" class="item block">
                            <p class="height">
                                <RouterLink :to="`/block/${item.height}`" class="link">{{ item.height }}</RouterLink>
                            </p>
                            <p class="time">{{ formatDateTime(item.timestamp)}}</p>
                            <p class="txn">Txn: {{ item.num_txs }}</p>
                        </li>
                    </ul>
                </Card>
            </el-col>
            <el-col :xs="24" :sm="12">
                <Card title="transactions" link="/txs/transfers">
                    <ul class="home-ul">
                        <li v-for="(item, index) in listTransaction.txs" :key="index" class="item transactions">
                            <p class="hash">
                                <span>Txhash:</span>
                                <hg-link title="transaction" type="tx" :content="item.tx_hash"/>
                            </p>
                            <p class="block">
                                Block:
                                <hg-link title="block" type="block" :content="item.height"/>
                            </p>
                            <p class="gas">Amount: {{ item.amount | formatAmount }}</p>
                            <p class="time-transaction">{{ formatDateTime(item.timestamp) }}</p>
                        </li>
                    </ul>
                </Card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from "vuex";
  import moment from "dayjs";
  import {get} from "lodash";
  import {formatDateTime} from "../constants";

  export default {
    name: "Home",
    interval: null,
    computed: {
      ...mapState("blocks", {blockList: "list"}),
      ...mapGetters("blocks", {blocksLastList: "lastList"}),
      ...mapState("transaction", {
        loading: "loading",
        listTransaction: "listTransactionLatest"
      }),
      blockTime() {
        if (!this.blockList.length) return 0;
        const first = moment(this.blockList[0].timestamp).unix();
        const last = moment(
          this.blockList[this.blockList.length - 1].timestamp
        ).unix();
        return ((first - last) / this.blockList.length).toFixed(2);
      }
    },
    methods: {
      formatDateTime,
      get,
      ...mapActions({
        getBlock: "blocks/fetchListBlock"
      }),
      ...mapActions({
        getTransaction: "transaction/getTransaction"
      })
    },
    mounted() {
      this.getBlock();
      this.getTransaction({getLatest: true});

      this.interval = setInterval(() => {
        this.getTransaction({getLatest: true});
        this.getBlock();
      }, 5 * 1000);
    },
    beforeDestroy() {
      clearInterval(this.interval);
      this.interval = null;
    }
  };
</script>

<style lang="scss" scoped>
    .home-container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;

        .panels {
            display: flex;
            margin: 0 -1%;
        }

        .home-panel {
            flex-basis: 100%;
            margin: 24px 1% 0;
            text-align: center;
            padding: 24px 0;
            height: 146px;
            overflow: hidden;
            background: white;
            border-radius: 8px;
            box-shadow: $shadow;
            font-size: 1.7em;

            p {
                margin-bottom: 16px;
            }

            span {
                font-size: 36px;
            }
        }

        .item {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 16px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            font-size: 14px;

            > p {
                margin-bottom: 10px;
            }

            > p:last-child {
                margin-bottom: 0;
            }
        }
    }

    .block > .height {
        flex: 1;
        color: $blue;
    }

    .block > .txn {
        flex-basis: 100%;
    }

    .block > .time {
        color: rgba(0, 0, 0, 0.65);
    }

    .transactions > .gas {
        flex-basis: 50%;
        margin-bottom: 0px !important;
    }

    @include responsive($sm) {
        .home-container {
            .panels {
                flex-wrap: wrap;
            }

            .home-panel {
                flex-basis: 98%;
            }
        }
    }
</style>

