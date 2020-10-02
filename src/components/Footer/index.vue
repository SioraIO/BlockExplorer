<template>
    <div class="footer-container">
        <p>POWERED BY KATANA EXPLORER</p>
    </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
    .footer-container {
        display: flex;
        height: 68px;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.8);

        p {
            font-size: $global-fs;
        }

        > img {
            margin-right: $basic-margin;
        }
    }

    @include responsive($sm) {
        .footer-container {
            > img {
                display: none;
            }
        }
    }
</style>

