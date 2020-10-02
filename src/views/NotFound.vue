<template>
    <div class="not-found-container">
        <Card title="Not Found">
            <div v-if="!isAddress" class="content">
                <p>Sorry, This page is not found.</p>
                <p>Return to <a @click="requestHome" style="cursor: pointer">HomePage</a>.</p>
            </div>
            <div class="content" v-else>
                <p>This address has not been activated or existed now.</p>
                <p>Please send or receive coins to activate it.</p>
                <p>Return to <a @click="requestHome" style="cursor: pointer">HomePage</a>.</p>
            </div>

        </Card>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                params: "",
                isAddress: false
            };
        },
        created() {
            this.params = this.$route.query.back ? this.$route.query.back : "";
            let _this = this;
            window.onpopstate = function () {
                if (_this.params !== "" && _this.params === "home") {
                    _this.params = "";
                    if (_this.$route.path !== "/home") {
                        _this.$router.push("/home");
                    }
                }
            };
        },
        methods: {
            requestHome() {
                this.params = "";
                this.$router.push("/home");
            }
        },
        beforeMount() {
            const params = this.$route.query.back ? this.$route.query.back : "";
            if (params === "home") {
                this.isAddress = true;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .not-found-container {
        font-size: 24px;
        text-align: center;
        color: rgba(255, 255, 255, 0.8);

        .content {
            margin: 64px 0;
        }
    }
</style>



