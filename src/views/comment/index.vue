<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 列表 -->
      <el-table :data="comments">
        <el-table-column label="标题" prop="title" width="400px"></el-table-column>
        <el-table-column label="总评论数"  prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status? '正常': '关闭' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.comment_status" type="success" size="mini">打开评论</el-button>
            <el-button v-else type="danger" size="mini">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination style="margin-top:20px" background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 评论信息
      comments: [],
      // 参数信息
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comments'
      }
    }
  },
  created () {
    // 获取评论信息
    this.getComments()
  },
  methods: {
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', {
        params: this.reqParams
      })
      this.comments = data.results
    }
  }
}
</script>

<style lang="less" scoped>
</style>
