<template>
    <div>
        <el-table
                class="table"
                :data="transaction.txs"
                style="width: 100%"
                border
                empty-text="Data is empty"
                :header-row-style="{color: '#4b8c92'}"
        >
            <el-table-column
                    label="Time"
                    prop="amount">
                <template slot-scope="scope">
                    {{formatDateTime(transaction.timestamp)}}
                </template>
            </el-table-column>
            <el-table-column
                    label="Txhash"
            >
                <template slot-scope="scope">
                    <RouterLink :to="`/tx/${scope.row.tx_hash}`" :title="scope.row.tx_hash">
                        {{scope.row.tx_hash.slice(0,18) + '...'}}
                    </RouterLink>
                </template>
            </el-table-column>
            <el-table-column
                    label="Block"
            >
                <template slot-scope="scope">
                    {{transaction.height}}
                </template>
            </el-table-column>
            <el-table-column
                    label="Txtype"
                    prop="tx_type">
            </el-table-column>
            <el-table-column
                    label="Amount"
            >
                <template slot-scope="scope">
                    {{scope.row.amount | formatAmount}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
  import {formatDateTime} from '../../constants';

  export default {
    props: {
      transaction: {type: Object},
    },
    methods: {
      formatDateTime
    }
  };
</script>
