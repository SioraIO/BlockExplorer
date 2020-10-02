import {apiGetTransactionByAcount} from "../../api/Api";
import {get, isEmpty} from "lodash";

export default {
  namespaced: true,
  state: {
    addressInfo: {},
    listTransaction: {},
    loadingTransaction: false
  },
  mutations: {
    setAddressInfo: function (state, data) {
      state.addressInfo = data;
    },
    setListTransaction: function (state, data) {
      state.listTransaction = data;
    },
    setLoadingTransaction: function (state, data) {
      state.loadingTransaction = data;
    }
  },
  actions: {
    getAddressInfo: async (context, data) => {
      if (isEmpty(data)) {
        data = undefined;
      }
      context.commit("setAddressInfo", data);
      return Promise.resolve();
    },
    getListTransaction: async (context, address, limit = 20) => {
      context.commit("setLoadingTransaction", true);
      const data = await apiGetTransactionByAcount(address);
      const result = get(data, "data", {});
      if (result) {
        result.limit = limit;
      }
      context.commit("setListTransaction", result);
      context.commit("setLoadingTransaction", false);
    }
  }
};
