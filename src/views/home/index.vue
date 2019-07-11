<template>
  <div class="home-container">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header class="my-header">
          <!-- icon -->
          <span class="el-icon-s-fold"></span>
          <span class="text">传智播客</span>
          <!-- 下拉菜单 -->
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.home-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .my-header {
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 16px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
  }
}
</style>
