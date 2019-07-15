<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <!-- 默认插槽 -->
      <slot>管理</slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {}
}
</script>

<style lang="less" scoped>
</style>
