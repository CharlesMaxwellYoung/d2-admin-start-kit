<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <div v-if="$route.meta && $route.meta.breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in $route.meta.breadcrumb" :key="index"
                          :to="{path:item.pathName}">
        {{item.name}}
      </el-breadcrumb-item>
    </div>
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
