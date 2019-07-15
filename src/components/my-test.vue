<template>
 <div class="container">
   <!-- 具名插槽 -->
   <!-- 当你要同时插入多处内容的时候,使用具名插槽 -->
   <!-- <template><slot name="content">内容</slot></template> -->
   <!-- <slot><slot name="footer">底部</slot></p> -->

   <!-- 作用域插槽 -->
   <!-- 当你使用该组件的时候,在插槽上要使用,组件内部的数据,使用作用域插槽 -->
     <!-- <slot name="content" :test="innerData">内容</slot> -->
     <p><slot name="content" :test="innerData">内容</slot></p>
 </div>
</template>

<script>
export default {
  data () {
    return {
      innerData: 'aaaa'
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>

</style>
