import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Blocks from "./views/Blocks.vue";
import BlockDetail from "./views/BlockDetail.vue";
import Transactions from "./views/Transactions.vue";
import TransactionInfo from "./views/TransactionInfo.vue";
import AddressInfo from "./views/AddressInfo.vue";
import NotFound from "./views/NotFound.vue";
import View from "@/components/View";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/block",
      component: View,
      children: [
        {
          path: "",
          name: "blocks",
          component: Blocks
        },
        {
          path: "/block/:id",
          name: "blockDetail",
          component: BlockDetail
        }
      ]
    },
    {
      path: "/txs/:category",
      name: "transactions",
      component: Transactions
    },
    {
      path: "/tx/:hash",
      name: "transactionInfo",
      component: TransactionInfo
    },
    {
      path: "/address/:address",
      name: "addressInfo",
      component: AddressInfo
    },
    {
      path: "*/:error",
      name: "notFound",
      component: NotFound
    }
  ]
});
