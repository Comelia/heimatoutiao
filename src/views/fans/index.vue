<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝管理" name="list">
          <div class="fansList" v-for="item in fanslist" :key="item.name">
            <!-- <img src= alt=""> -->
            <div class="block">
              <el-avatar :size="100" :src="item.photo"></el-avatar>
            </div>
            <p>{{item.name}}</p>
            <el-button type="primary" size="mini" plain>+ 关注</el-button>
          </div>
          <div class="footer">
            <el-pagination
              v-if="total>fans.per_page"
              background
              layout="prev, pager, next"
              :total="total"
              :page-size="fans.per_page"
              :current-page="fans.page"
              @current-change="pager"
            ></el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="photo">粉丝画像</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 粉丝管理默认显示
      activeName: 'list',
      // 发送给后端的数据
      fans: {
        page: 1,
        per_page: 20
      },
      // 渲染粉丝列表数据
      fanslist: [],
      // 总个数
      total: 0
    }
  },
  created () {
    // 组件加载完毕 获取粉丝列表
    this.getFans()
  },
  methods: {
    // 分页
    pager (newPage) {
      // 更新页码
      this.fans.page = newPage
      this.getFans()
    },
    // 获取粉丝列表
    async getFans () {
      const {
        data: { data }
      } = await this.$http.get('followers', { params: this.fans })
      this.fanslist = data.results
      this.total = data.total_count
      // console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.fansList {
  display: inline-block;
  width: 160px;
  height: 210px;
  border: 1px dashed #ddd;
  text-align: center;
  padding: 10px;
  margin: 0 20px 20px 0;
}
</style>
