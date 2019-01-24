<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-if="$route.meta && $route.meta.breadcrumb" v-for="(item, index) in $route.meta.breadcrumb"
                            :key="index"
                            :to="{path:item.pathName}">
            {{item.name}}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<style lang="scss">
    .el-breadcrumb {
        float: left;
        height: 60px;
        width: 400px;
        display: flex;
        align-items: center;
    }

</style>
