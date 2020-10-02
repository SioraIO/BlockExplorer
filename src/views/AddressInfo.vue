<template>
    <div class="address-info" v-if="addressInfo && addressInfo.balance">
        <sub-title title="ADDRESS" :sub="address"/>
        <div class="address-detail-content">
            <card title="Address Information">
                <data-item label="Balance">
                    <span>{{ addressInfo.balance | formatAmount }}</span>
                </data-item>
                <data-item label="Address">
                    <span>{{ address }}</span>
                </data-item>
            </card>
            <card title="Transaction List">
                <transaction-list :fields="fields" :loading="loading" :list="list" :address="address"/>
                <div class="pagination-transaction">
                    <el-pagination
                            background
                            layout="jumper, prev, pager, next, total"
                            :current-page="list.current_page"
                            :page-size="limit"
                            :total="list.total"
                            @current-change="hadleClickPage"
                    />
                </div>
            </card>
            `
        </div>
    </div>
</template>

<script>
    import {get, isEmpty} from "lodash";
    import {mapState, mapActions} from "vuex";
    import {formatDateTime} from "../constants";
    import {fields} from "../constants/columnTransaction";
    import {apiGetAddressInfo} from '../api/Api';

    export default {
        data: function () {
            return {
                limit: 20,
                fields
            };
        },
        computed: {
            ...mapState("address", {
                addressInfo: "addressInfo",
                list: "listTransaction",
                loading: "loadingTransaction"
            }),
            address: function () {
                return this.$route.params.address;
            }
        },
        methods: {
            get,
            isEmpty,
            formatDateTime,
            ...mapActions("address", {
                getAddressInfo: "getAddressInfo",
                getListTransaction: "getListTransaction"
            }),
            hadleClickPage(page) {
                this.getListTransaction({
                    address: this.address,
                    page
                });
                window.scroll(0, 350);
            }
        },
        async beforeMount() {
            let {data} = await apiGetAddressInfo(this.address);
            this.getAddressInfo(data);
            this.getListTransaction({
                address: this.address
            });
        },
        watch: {
            async address() {
                let {data} = await apiGetAddressInfo(this.address);
                this.getAddressInfo(data);
                this.getListTransaction({
                    address: this.address
                });
                window.scroll(0, 0);
            },
            addressInfo: {
                handler(newValue) {
                    if (!newValue) {
                        this.$router.push("/404?back=home");
                    }
                }
            }
        }
    };
</script>

<style lang="scss">
    .address-info {
        .el-pagination__total {
            float: right;
            font-size: 25px !important;
            font-weight: bold;
            color: #679da3;
        }
    }
</style>
