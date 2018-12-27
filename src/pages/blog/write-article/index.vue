<template>
    <d2-container>
        <template slot="header">
            <el-form :inline="true" size="medium">
                <el-form-item>
                    <el-input style="width: 500px" placeholder="请输入博客标题" v-model="articleTitle"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select
                            v-model="articleType"
                            multiple
                            filterable
                            allow-create
                            default-first-option
                            placeholder="请选择或者输入文章标签">
                        <el-option
                                v-for="item in defaultOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-share" type="primary" @click="publishArticle">发布文章</el-button>
                </el-form-item>
            </el-form>
        </template>
        <mavon-editor v-model="articleContent" :placeholder="placeholder" codeStyle="darcula" @save="saveArticle"/>
        <template slot="footer">
        </template>
    </d2-container>
</template>

<script>
    /**
     * todo: 需要添加背景图片
     */
    export default {
        name: "writeArticle",
        data() {
            return {
                articleTitle: '',
                articleContent: '',
                placeholder: '博客正文',
                defaultOptions: [{
                    value: 'backend',
                    label: '后端'
                }, {
                    value: 'frontend',
                    label: '前端'
                }, {
                    value: '笔记',
                    label: 'note'
                }, {
                    value: '文档',
                    label: 'doc'
                }],
                articleType: []
            }
        },
        created() {

        },
        methods: {
            publishArticle() {
                this.createArticle(true);
            },
            saveArticle() {
                this.createArticle(false);
            },
            createArticle(isDraft) {
                let publishTime = this.$dayjs().format('YYYY-MM-DD HH:mm:ss');
                let blogMain = {
                    title: this.articleTitle,
                    content: this.articleContent,
                    type: this.articleType,
                    date: publishTime,
                    isDraft
                };
                console.log(blogMain);
            }
        }
    }
</script>

<style scoped>
    .el-select {
        margin-right: 20px;
    }
</style>
