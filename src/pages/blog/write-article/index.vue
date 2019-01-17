<template>
    <d2-container>
        <template slot="header">
            <div class="header">
                新增文章
            </div>
        </template>
        <el-form size="medium" label-width="80px">
            <el-form-item label="文章标题">
                <el-input placeholder="请输入博客标题" v-model="articleTitle"></el-input>
            </el-form-item>
            <el-form-item label="文章标签">
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
            <el-form-item label="封面">
                <el-upload
                        :action="getUploadUrl"
                        list-type="picture-card"
                        :on-success="handleSuccess"
                        :file-list="uploadImages"
                        :on-remove="handleRemove"
                        :limit="1"
                        :on-exceed="showLimitTips"
                        :disabled="saveBlogId === '' && blogId === ''"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="文章描述">
                <el-input placeholder="请输入博客简介" type="textarea" v-model="articleAbstract"></el-input>
            </el-form-item>
            <el-form-item label="文章正文">
                <mavon-editor v-model="articleContent"
                              :placeholder="placeholder"
                              :boxShadow="false"
                              codeStyle="darcula"
                              @save="saveArticle"
                              @change="editHandle"
                              @imgAdd="imgAdd"
                              @imgDel="imgDel"/>
            </el-form-item>
        </el-form>
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

    const TIMER = 1000;
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
                createArticleThrottle: null,
                dialogImageUrl: '',
                dialogVisible: false,
                thumbnail: '',
                uploadDisable: true,
                uploadImages: [],
                saveBlogId: ''
            }
        },
        computed: {
            ...mapState('blog', {
                currentBlog: s => s.currentBlog,
                actionUrl: s => s.actionUrl,
                imageUrl: s => s.imageUrl
            }),

            isPublishArticle() {
                return this.currentBlog._id && !this.currentBlog.isHidden
            },
            getUploadUrl() {
                let id = this.saveBlogId || this.blogId;
                return `${this.actionUrl}?ident=${id}`;
            }
        },

        created() {
            this.uploadImages = [];
            if (!isEmpty(this.currentBlog._id)) {
                let {title, content, tags, _id, abstract, thumbnail} = this.currentBlog;
                this.articleTitle = title;
                this.articleContent = content;
                this.articleTags = tags;
                this.blogId = _id;
                this.articleAbstract = abstract;
                this.thumbnail = thumbnail;
                if (thumbnail) {
                    this.uploadImages.push({
                        name: '封面图',
                        url: 'http://127.0.0.1:7001/public/upload/' + thumbnail
                    })
                }
            } else {
                this.articleTitle = `${this.$dayjs().format('YYYY-MM-DD HH:mm:ss')}_草稿`;
            }
            this.createArticleThrottle = debounce(this.createArticle, TIMER);
        },
        methods: {
            ...mapActions('blog', {
                'saveBlog': 'saveBlog',
                'updateBlog': 'updateBlog',
                'updateOrSave': 'updateOrSave',
                'uploadImage': 'uploadImage'
            }),

            ...mapMutations('blog', {
                setCurrentBlog: 'setCurrentBlog'
            }),

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handleSuccess({data = ''}) {
                this.thumbnail = data;
            },
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
                    _id: this.saveBlogId || this.blogId,
                    abstract: this.articleAbstract,
                    thumbnail: this.thumbnail
                }).then(({data, success}) => {
                    this.saveBlogId = data._id || null;
                    if (success) {
                        this.$message({
                            message: '成功',
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
            },
            showLimitTips() {
                this.$message({
                    message: '只能上传一张封面',
                    type: 'error'
                });
            },
            imgAdd(pos, $file) {
            },
            imgDel() {
            }
        }
    }
</script>

<style scoped>
    .header {
        text-align: center;
    }
</style>
