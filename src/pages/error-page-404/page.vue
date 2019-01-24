<template>
    <div className="basic-exception">
        <d2-container>
            <div class="exception-content">
                <img :src="imgSrc" class="imgException"/>
                <div>
                    <h3 class="title">{{$t('error.titleNotFound')}}</h3>
                    <p class="description">{{$t('error.contentNotFount')}}</p>
                    <el-button class="d2-mt" @click="$router.replace({ path: '/' })">
                        返回首页
                    </el-button>
                </div>
            </div>
        </d2-container>
    </div>
</template>
<script>
    const imgSrc =
        'https://img.alicdn.com/tfs/TB1w4M7bNrI8KJjy0FpXXb5hVXa-260-260.png';
    export default {
        name: 'BasicException',
        data() {
            return {
                imgSrc
            };
        },
    };
</script>
<style lang="scss" scoped>
    $container-height: 70vh;
    .exception-content {
        display: flex;
        align-items: center;
        justify-content: center;
        .title {
            color: rgb(51, 51, 51);
        }
        .description {
            color: rgb(102, 102, 102);
        }
    }

    @media screen and (max-width: 1199px) and (min-width: 721px) {
        .exception-content {
            .imgException {
                max-width: 180px;
                margin-right: 30px;
            }
            .title {
                font-size: 20px;
                margin: 10px 0;
            }
            .description {
                font-size: 14px;
            }
        }
    }

    @media screen and (min-width: 1200px) {
        .exception-content {
            min-height: $container-height;
            .imgException {
                max-width: 260px;
                margin-right: 50px;
            }
            .title {
                font-size: 24px;
                margin: 20px 0;
            }
            .description {
                font-size: 16px;
            }
        }
    }
</style>
