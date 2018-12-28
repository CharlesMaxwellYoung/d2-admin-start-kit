<template>
    <d2-container :filename="filename">
        <page-header slot="header" @submit="handleSubmit" @onArticle="handleArticle" ref="header"/>
        <page-main :table-data="blogs" :loading="loading" @onDelete="" @onEdit="editBlog"/>
        <page-footer slot="footer" :current="page.pageCurrent" :size="page.pageSize" :total="page.pageTotal"
                     @change="handlePaginationChange"/>
    </d2-container>
</template>

<script>
    import {mapState, mapActions, mapGetters, mapMutations} from 'vuex';

    export default {
        name: "articles",
        data() {
            return {
                filename: __filename,
                loading: false,
                page: {
                    pageCurrent: 1,
                    pageSize: 10,
                    pageTotal: 0
                }
            }
        },
        components: {
            'PageHeader': () => import('../components/pageHeader'),
            'PageMain': () => import('../components/pageMain'),
            'PageFooter': () => import('../components/pageFooter')
        },
        computed: {
            ...mapState('blog', {
                blogs: s => s.blogs
            })
        },
        created() {
            this.getBlog();
        },
        methods: {
            ...mapActions('blog', {
                getBlog: 'getBlog'
            }),
            ...mapMutations('blog', {
                setCurrentBlog: 'setCurrentBlog'
            }),
            handlePaginationChange(val) {
                this.$notify({
                    title: '分页变化',
                    message: `当前第${val.current}页 共${val.total}条 每页${val.size}条`
                })
                this.page = val
                // nextTick 只是为了优化示例中 notify 的显示
                this.$nextTick(() => {
                    this.$refs.header.handleFormSubmit()
                })
            },
            handleSubmit(form) {
                this.loadingloading = true
                this.$notify({
                    title: '开始请求模拟表格数据'
                })
            },
            handleArticle() {
                this.$router.push({
                    name: 'article-write-article'
                });
                this.setCurrentBlog({});
            },
            editBlog(row) {
                this.$router.push({
                    name: 'article-write-article'
                });
                console.log(row);
                this.setCurrentBlog(row);
            }
        }
    }
</script>

<style scoped>

</style>
