<template>
    <d2-container :filename="filename">
        <page-header slot="header" @onArticle="handleArticle" ref="header"/>
        <page-main :table-data="blogs" :loading="loading" @onDelete="deleteBlog" @onEdit="editBlog"/>
        <page-footer slot="footer" :current="page.pageCurrent" :size="page.pageSize" :total="page.pageTotal"
                     @change="handlePaginationChange"/>
    </d2-container>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex';

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
                });
                this.page = val;
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
                this.setCurrentBlog(row);
            },
            deleteBlog() {

            }
        }
    }
</script>

<style scoped>

</style>
