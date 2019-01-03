<template>
    <d2-container>
        <template slot="header">
            <el-form :inline="true" size="medium">
                <el-form-item>
                    <el-input placeholder="请输入博客标题" v-model="articleTitle"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select
                            v-model="articleTags"
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
                    <el-input placeholder="请输入博客简介" type="textarea" v-model="articleAbstract"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <mavon-editor v-model="articleContent" :placeholder="placeholder" :boxShadow="false" codeStyle="darcula"
                      @save="saveArticle"
                      @change="editHandle"/>
        <template slot="footer">
            <el-form :inline="true" size="medium">
                <el-form-item v-if="!isPublishArticle">
                    <el-button icon="el-icon-check" type="success" @click="savePublish">提交更改</el-button>
                    <el-button icon="el-icon-share" type="danger" @click="publishArticle">发布文章</el-button>
                </el-form-item>
                <el-form-item v-else>
                    <el-button icon="el-icon-check" type="success" @click="savePublish">保存文章</el-button>
                    <el-button icon="el-icon-close" type="primary" @click="cancelPublish">取消发布</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-back" type="info" @click="backToHome">取消</el-button>
                </el-form-item>
            </el-form>
        </template>
    </d2-container>
</template>

<script>

    import {mapActions, mapState, mapMutations} from 'vuex';
    import isEmpty from 'lodash/isEmpty'
    import debounce from 'lodash/debounce'

    const TIMES = 1000;
    export default {
        name: "writeArticle",
        data() {
            return {
                articleTitle: '',
                articleContent: '',
                articleAbstract: '',
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
                articleTags: [],
                publishText: '未发布',
                createArticleThrottle: null
            }
        },
        computed: {
            ...mapState('blog', {
                currentBlog: 'currentBlog'
            }),

            isPublishArticle() {
                return this.currentBlog._id && !this.currentBlog.isHidden
            }
        },
        created() {
            if (!isEmpty(this.currentBlog._id)) {
                let {title, content, tags, _id, abstract} = this.currentBlog;
                this.articleTitle = title;
                this.articleContent = content;
                this.articleTags = tags;
                this.blogId = _id;
                this.articleAbstract = abstract;
            } else {
                this.articleTitle = `${this.$dayjs().format('YYYY-MM-DD HH:mm:ss')}_草稿`;
            }
            this.createArticleThrottle = debounce(this.createArticle, TIMES)
        },
        methods: {
            ...mapActions('blog', {
                'saveBlog': 'saveBlog',
                'updateBlog': 'updateBlog',
                'updateOrSave': 'updateOrSave'
            }),

            ...mapMutations('blog', {
                setCurrentBlog: 'setCurrentBlog'
            }),

            publishArticle() {
                this.createArticle(false);
                this.$router.push({name: 'article-articles'})
            },

            saveArticle() {
                let currentBlogStatus = this.currentBlog.isHidden;
                this.createArticle(currentBlogStatus);
            },
            /**
             * 返回博客列表首页
             */
            backToHome() {
                this.setCurrentBlog({});
                this.$router.push({
                    name: 'article-articles'
                });
            },
            cancelPublish() {
                this.createArticle(true);
                this.$router.push({name: 'article-articles'})
            },
            savePublish() {
                let currentBlogStatus = this.currentBlog.isHidden;
                this.createArticle(currentBlogStatus);
                this.$router.push({name: 'article-articles'})
            },
            createArticle(isHidden = true) {
                this.$message('正在保存草稿');
                this.updateOrSave({
                    title: this.articleTitle,
                    content: this.articleContent,
                    tags: this.articleTags,
                    isHidden,
                    _id: this.blogId,
                    abstract: this.articleAbstract
                }).then(({data}) => {
                    if (data) {
                        this.$message({
                            message: data,
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: data,
                            type: 'error'
                        });
                    }
                })
            },
            editHandle() {
                // this.createArticleThrottle(false)
            }
        }
    }
</script>

<style scoped>
</style>
