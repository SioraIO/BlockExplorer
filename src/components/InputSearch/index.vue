<template>
    <div>
        <div :class="`search-container ${mini && !expand ? 'mini' : ''}`">

            <el-autocomplete
                    ref="input"
                    class="search-inner"
                    placeholder="Address/ Txhash/ Block"
                    v-model.trim="value"
                    @keyup="querySearch"
                    :fetch-suggestions="querySearch"
                    @keyup.enter.native="onSearch"
                    :clearable="!mini"
                    :maxlength="64"
            ></el-autocomplete>
            <i
                    class="el-icon-search search-icon"
                    @click="onSearch"
            ></i>

        </div>
        <span v-if="warning" class="sp-warning">* Please enter a text to search </span>
    </div>
</template>

<script>
  import {isEmpty} from "lodash";
  import * as Api from '../../api/Api';
  import {mapActions} from 'vuex';

  export default {
    props: {
      mini: Boolean,
      expand: Boolean
    },
    data() {
      return {
        value: "",
        warning: false
      };
    },
    methods: {
      ...mapActions({
        getBlockDetail: 'blocks/fetchBlockDetail',
        getInfoTransaction: "transaction/getInfoTransaction"
      }),
      querySearch: async function (queryString, cb) {
        cb([]);
        if (isEmpty(queryString)) {
          this.warning = true;
          return;
        }
        this.warning = false;
      },
      onSearch: async function () {
        let {value} = this;
        if (value === '') {
          this.warning = true;
          return false;
        }
        this.warning = false;
        value = value.replace(/ /g, "");

        // jump to block detail page;
        const numberPattern = /^\d+$/g;
        if (numberPattern.test(value)) {
          let {data} = await Api.apiGetBlockDetail(value);
          if (data) {
              await this.getBlockDetail(data);
              //await this.$store.dispatch("blocks/fetchBlockDetail", value)
              this.$router.push({path: "/block/" + value});
              return false
          }
        }

        // jump to address detail page;
        const addPattern = /^[0-9A-F]{40}$/;
        if (addPattern.test(value)) {
          await this.$store.dispatch("address/getAddressInfo", value);
          this.$router.push({path: "/address/" + value});
          return false;
        }

        // jump to tx detail page;
        const txPattern = /^[0-9A-F]{64}$/;
        if (txPattern.test(value)) {
          let {data} = await Api.apiGetInfoTransaction(value);
          if (data) {
              await this.getInfoTransaction(data);
              // await this.$store.dispatch("transaction/getInfoTransaction", value)
              this.$router.push({path: "/tx/" + value});
              return false
          }
        }

        // else show 404
        this.$router.push({path: `/404`});
      }
    }
  };
</script>

<style lang="scss" scoped>
    .sp-warning {
        color: aqua;
    }

    .search-container {
        width: 100%;
        display: flex;
        align-items: center;
        flex-shrink: 0;
        height: 48px;
        border: 1px solid white;
        border-radius: 4px;
        transition: all $trans;

        .search-inner {
            flex: 1 1 auto;
        }

        .search-icon {
            margin-right: 24px;
            font-size: 18px;
            color: rgba(255, 255, 255, 0.75);
            z-index: 9;
        }

        &.mini {
            width: 40px;
            border: none;

            .search-inner {
                width: 8px;
            }

            .search-icon {
                margin-right: 0;
                cursor: pointer;

                &:hover {
                    color: white;
                }
            }
        }
    }

    @include responsive($sm) {
        .search-container {
            margin-top: $basic-padding;
        }
    }
</style>
