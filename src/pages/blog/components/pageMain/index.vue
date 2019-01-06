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
                    <el-tag size="medium" type="info" v-for="(item,index) in scope.row.tags" :key="index">{{item}}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column label="文章状态" align="center">
                <template slot-scope="scope">
                    <el-tag size="medium" type="danger" v-if="scope.row.isHidden">未发布</el-tag>
                    <el-tag size="medium" type="success" v-else>已发布</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="创建时间" width="150" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    {{scope.row.createTime | dFormat}}
                </template>
            </el-table-column>

            <el-table-column align="center" label="修改时间" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    {{scope.row.updateTime | dFormat}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
                </template>
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
                currentTableData: []
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
            handleSelectionChange(val) {
                this.$emit('onPatchSelect', val)
            },
            handleEdit({row}) {
                this.$emit('onEdit', row);
            },
            handleDelete({row}) {
                this.$emit('onDelete', row);
            }
        }
    }
</script>
