<template>
  <div class="container">
    <!-- 图片按钮 -->
    <div class="img-btn">
      <img src="../assets/images/default.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-image'
}
</script>

<style lang="less" scoped>
.img-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}

</style>
