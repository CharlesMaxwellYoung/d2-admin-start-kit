<template>
    <d2-container>
        <d2-container :filename="filename">
            <page-header
                    slot="header"
                    @submit="handleSubmit"
                    ref="header"/>
            <page-main
                    :table-data="table"
                    :loading="loading"/>
            <page-footer
                    slot="footer"
                    :current="page.pageCurrent"
                    :size="page.pageSize"
                    :total="page.pageTotal"
                    @change="handlePaginationChange"/>
        </d2-container>
    </d2-container>
</template>

<script>
    export default {
        name: "articles",
        data() {
            return {
                filename: __filename,
                table: [],
                loading: false,
                page: {
                    pageCurrent: 1,
                    pageSize: 10,
                    pageTotal: 0
                }
            }
        },
        components: {
            'PageHeader': () => import('./components/pageHeader'),
            'PageMain': () => import('./components/pageMain'),
            'PageFooter': () => import('./components/pageFooter')
        },
        methods: {
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
                this.loading = true
                this.$notify({
                    title: '开始请求模拟表格数据'
                })
                BusinessTable1List({
                    ...form,
                    ...this.page
                }).then(res => {
                    this.loading = false
                    this.$notify({
                        title: '模拟表格数据请求完毕'
                    })
                    this.table = res.list
                    this.page.pageTotal = res.page.total
                }).catch(err => {
                    this.loading = false
                    this.$notify({
                        title: '模拟表格数据请求异常'
                    })
                    console.log('err', err)
                })
            }
        }
    }
</script>

<style scoped>

</style>
