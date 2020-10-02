<template>
    <el-table
            class="table-transaction"
            :data="list.txs"
            v-loading="loading"
            style="width: 100%"
            border
            :header-row-style="{color: '#4b8c92'}"
    >
        <el-table-column
                v-for="item in fields"
                :key="item.name"
                :label="item.name"
                :width="item.width"
                :align="item.align"
        >
            <template slot-scope="scope">
        <span
                v-if="item.name.match('Index')"
        >{{ (list.current_page - 1)*list.limit + (scope.$index + 1) }}</span>
                <span v-else-if="item.name === 'Timestamp'">{{ formatDateTime(scope.row.timestamp) }}</span>
                <span v-else-if="item.name === 'Txhash'">
          <hg-link
                  :type="item.linkType"
                  :content="scope.row.tx_hash"
                  :ellipsis="false"
                  title="transaction"
          />
        </span>
                <span v-else-if="item.name === 'Block'">
          <hg-link
                  :type="item.linkType"
                  :content="scope.row.height"
                  :ellipsis="false"
                  title="block"
          />
        </span>
                <span v-else-if="item.name === 'From'">
          <hg-link
                  :type="item.linkType"
                  :content="scope.row.from_acc"
                  :ellipsis="false"
                  :title="scope.row.from_acc"
          />
        </span>
                <span v-else-if="item.name === 'To'">
          <hg-link
                  :type="item.linkType"
                  :content="scope.row.to_acc"
                  :ellipsis="false"
                  title="address"
          />
        </span>
                <span v-else>
                    <span v-if="address">

                        <span v-if="address === scope.row.fee_receiver">

                               <span v-if="scope.row.from_acc ===scope.row.fee_receiver ">
                                     {{ get(scope.row, item.field) | formatAmount}}
                               </span>

                               <span v-else-if="scope.row.to_acc === scope.row.fee_receiver">
                                      {{ addFeeAmount(get(scope.row, item.field),scope.row.tx_fee)}}
                               </span>

                               <span v-else>
                                      {{ scope.row.tx_fee | formatAmount}}
                               </span>

                        </span>

                        <span v-else>
                            <span v-if="scope.row.to_acc === scope.row.fee_receiver">
                                  {{ addFeeAmount(get(scope.row, item.field),scope.row.tx_fee)}}
                           </span>
                            <span v-else>
                                  {{ get(scope.row, item.field) | formatAmount}}
                            </span>

                        </span>

                    </span>

                 <span v-else>
                     <span v-if="scope.row.to_acc === scope.row.fee_receiver">
                       {{ addFeeAmount(get(scope.row, item.field),scope.row.tx_fee)}}
                     </span>
                     <span v-else>
                           {{ get(scope.row, item.field) | formatAmount}}
                     </span>
                 </span>
        </span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {get} from "lodash";
    import {formatDateTime} from "../../constants";
    import {formatAmount} from "../../utils/filters";
    import SDK from 'xek-sdk';

    export default {
        props: {
            loading: {type: Boolean, default: false},
            list: {type: Object, default: {}},
            fields: {type: Array, default: []},
            address: {type: String}
        },
        methods: {
            get,
            formatDateTime,
            addFeeAmount(amount, fee) {
                console.log("amount", amount);
                console.log("fee", fee);

                console.log("result", SDK.Utils.bigNumToString(SDK.Utils.subtraction(amount, "-" + fee)));
                let _amount = amount || 0;
                let _fee = fee || 0;

                return formatAmount(SDK.Utils.bigNumToString(SDK.Utils.subtraction(_amount, "-" + _fee)));
            },
        }
    }
    ;
</script>

<style lang="scss">
    .table-transaction {
        box-shadow: 1px 1px 6px 0px rgba(0, 0, 0, 0.15);
    }
</style>
