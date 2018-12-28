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

    import {mapActions, mapState} from 'vuex';

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
                blogId: '',
                defaultOptions: [{
                    value: '后端',
                    label: '后端'
                }, {
                    value: '前端',
                    label: '前端'
                }, {
                    value: '笔记',
                    label: '笔记'
                }, {
                    value: '文档',
                    label: '文档'
                }],
                articleType: []
            }
        },
        computed: {
            ...mapState('blog', {
                currentBlog: 'currentBlog'
            })
        },
        created() {
            if (this.currentBlog) {
                let {title, content, type, _id} = this.currentBlog;
                this.articleTitle = title;
                this.articleContent = content;
                this.articleType = type;
                this.blogId = _id;
            }
        },
        methods: {
            ...mapActions('blog', {
                'saveBlog': 'saveBlog',
                'updateBlog': 'updateBlog'
            }),
            publishArticle() {
                this.createArticle(false);
            },
            saveArticle() {
                this.createArticle(true);
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
                if (blogMain.isDraft && this.blogId) {
                    blogMain._id = this.blogId;
                    this.updateBlog(blogMain);
                } else {
                    this.saveBlog(blogMain);
                }
            }
        }
    }
</script>

<style scoped>
</style>
