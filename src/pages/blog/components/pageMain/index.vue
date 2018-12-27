<template>
    <div>
        <el-table
                :data="currentTableData"
                v-loading="loading"
                size="mini"
                stripe
                style="width: 100%;"

                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>

            <el-table-column align="center" label="文章标题" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{scope.row.title}}
                </template>
            </el-table-column>

            <el-table-column align="center" label="类别" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{scope.row.title}}
                </template>
            </el-table-column>

            <el-table-column label="文章状态" width="180" align="center">
                <template slot-scope="scope">
                    <boolean-control
                            :value="scope.row.type"
                            @change="(val) => {
              handleSwitchChange(val, scope.$index)}">
                        <d2-icon
                                name="check-circle"
                                style="font-size: 20px; line-height: 32px; color: #67C23A;"
                                slot="active"/>
                        <d2-icon
                                name="times-circle"
                                style="font-size: 20px; line-height: 32px; color: #F56C6C;"
                                slot="inactive"/>
                    </boolean-control>
                </template>
            </el-table-column>
            <el-table-column align="center" label="发布时间" width="150" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{scope.row.timeCreated}}
                </template>
            </el-table-column>

            <el-table-column lalign="center" abel="修改时间" width="150" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    {{scope.row.updatedTime}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <el-button type="text" size="small">编辑</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

    export default {
        props: {
            tableData: {
                default: () => []
            },
            loading: {
                default: false
            }
        },
        data() {
            return {
                currentTableData: [],
                multipleSelection: []
            }
        },
        watch: {
            tableData: {
                handler(val) {
                    this.currentTableData = val
                },
                immediate: true
            }
        },
        methods: {
            handleSwitchChange(val, index) {
                const oldValue = this.currentTableData[index]
                this.$set(this.currentTableData, index, {
                    ...oldValue,
                    type: val
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val
            }
        }
    }
</script>
