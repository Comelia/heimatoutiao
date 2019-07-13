<template>
  <div class="container">
    <img src="../../assets/images/welcome.jpg" alt="">
  </div>
</template>

<script>
export default {
  // 模拟测试 如果token两小时后失效 是什么页面效果
  created () {
    this.$http
      .get('articles')
      .then(res => {
        console.log(res)
      })
  }
}
</script>

<style lang="less" scoped>
.container {
  text-align: center;
}
</style>
