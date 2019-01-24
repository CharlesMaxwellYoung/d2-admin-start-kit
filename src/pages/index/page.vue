<template>
    <d2-container :filename="filename" class="page">
        <template slot="footer">
        </template>
    </d2-container>
</template>

<script>
    export default {
        data() {
            return {
                filename: __filename
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page {
        .page__logo {
            width: 120px;
        }
        .page__btn-group {
            color: $color-text-placehoder;
            font-size: 12px;
            margin-top: 0px;
            margin-bottom: 20px;
            span {
                color: $color-text-sub;
                &:hover {
                    color: $color-text-main;
                }
            }
        }
    }
</style>
