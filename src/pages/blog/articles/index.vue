<template>
    <d2-container :filename="filename">
        <page-header slot="header" @onArticle="handleArticle" ref="header" @onPatchDelete="patchDelBlog"
                     :isMulti="isMulti"/>
        <page-main :table-data="blogs" :loading="loading" @onDelete="deleteBlog" @onEdit="editBlog"
                   @onPatchSelect="mulSelect"/>
        <page-footer slot="footer" :current="current" :size="size" :total="pagination.total"
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
                size: 10,
                current: 1,
                isMulti: true,
                readyDelBlogs: []
            }
        },
        components: {
            'PageHeader': () => import('../components/pageHeader'),
            'PageMain': () => import('../components/pageMain'),
            'PageFooter': () => import('../components/pageFooter')
        },
        computed: {
            ...mapState('blog', {
                blogs: s => s.blogs,
                pagination: s => s.pagination
            })
        },
        created() {
            this.getBlog({pageSize: this.size});
        },
        methods: {
            ...mapActions('blog', {
                getBlog: 'getBlog',
                deleteBlogModule: 'deleteBlog'
            }),
            ...mapMutations('blog', {
                setCurrentBlog: 'setCurrentBlog'
            }),
            handlePaginationChange(val) {
                let {size, current} = val;
                this.size = size;
                this.current = current;
                this.getBlog({pageNumber: current, pageSize: this.size});
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
            deleteBlog(delModel) {
                this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    let data = await this.deleteBlogModule(delModel._id);
                    this.$message({
                        type: 'success',
                        message: data
                    });
                }).catch(async () => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            patchDelBlog() {
                console.log(this.readyDelBlogs);
                if (this.readyDelBlogs.length > 0) {
                    let blogIds = this.readyDelBlogs.map(item => item.title);
                    console.log(blogIds)
                }
            },
            mulSelect(val) {
                this.readyDelBlogs = val;
                this.isMulti = !(val && val.length > 0);
            }
        }
    }
</script>

<style scoped>

</style>
