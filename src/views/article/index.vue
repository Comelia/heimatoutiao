<template>
  <div class="container">
    <!-- 筛选条件 -->
    <el-card class="box-card">
      <div slot="header">
        <!-- 面包屑导航 -->
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 筛选表单 -->
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="1">草稿</el-radio>
            <el-radio :label="2">待审核</el-radio>
            <el-radio :label="3">审核通过</el-radio>
            <el-radio :label="4">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <!-- 子传父 绑定自定义事件 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
            v-model="dateValues"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="search()" type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 筛选结果 -->
    <el-card class="box-card">
      <div slot="header">
        根据筛选条件同查询到 <b>{{ total }}</b> 条结果:
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <!-- <img :src="scope.row.cover.images[0]" alt=""> -->
            <!-- 图片组件 -->
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:75px">
              <!-- 当图片加载失败时显示占位图 -- 具名插槽 -->
              <div slot="error">
                <img src="../../assets/images/error.gif" width="100px" height="75px"  alt="" >
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态" >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag  v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag  v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag  v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" @click="edit(scope.row.id)" circle plain type="primary"></el-button>
            <el-button icon="el-icon-delete" @click="del(scope.row.id)" circle plain type="danger"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <!-- current-change 改变页码触发的事件 -->
        <!-- :current-page  当前页面 -->
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pager"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import MyBread from '@/components/my-bread.vue'

export default {
  data () {
    return {
      // 提交后的筛选数据
      reqParams: {
        // 如果是 null 该字段不会提交给后台
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道的选项数组
      channel: [{ name: 'js', id: '1' }],
      // 日期数据
      dateValues: [],
      // 文章列表数据
      articles: [],
      // 总条数
      total: 0
    }
  },
  components: {
    // MyBread
  },
  created () {
    // 获取文章列表数据
    this.getArticles()
    // console.log(this.articles)
  },
  methods: {
    // 编辑
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    // 删除
    del (id) {
      this.$confirm('亲，此操作将永久删除该文章, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`)
          // 删除成功
          this.$message.success('删除成功')
          this.getArticles()
        })
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = 1
      // 提交当前页码给后台 才能获取对应的数据
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 搜索
    search () {
      this.getArticles()
    },
    // 选择时间处理函数
    changeDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    // 获取文章列表数据
    async getArticles () {
      // post 传参 post ('url',{参数对象})
      // get 传参 get ('url?key=val&...')   get('url', {params: {参数对象}})
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 获取总条数
      this.total = data.total_count
      // console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.box{
  text-align: center;
  margin-top: 20px;
}
</style>
