<template>
  <el-card v-loading="loading">
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <!-- 按钮式单选框 -->
    <div>
      <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
        <el-radio-button label="false">全部</el-radio-button>
        <el-radio-button label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button style="float:right" size="small" type="success">添加素材</el-button>
    </div>
    <!-- 图片列表 -->
    <ul class="pic-list">
      <li v-for="item in images" :key="item.id">
        <img :src="item.url" alt />
        <!-- v-show="!reqParams.collect"  当收藏时隐藏 下面图标 -->
        <div class="foot" v-show="!reqParams.collect">
          <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
          <span class="el-icon-delete"></span>
        </div>
      </li>
    </ul>
    <!-- 分页器 -->
    <!-- current-page 当前页数 -->
    <!-- page-size 每页显示条数-->
    <!-- current-change currentPage 改变时会触发-->
    <!-- v-if="total>reqParams.per_page" 如果总条目数大于每页数量 显示分页器 -->
    <el-pagination
      v-if="total>reqParams.per_page"
      background
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="pager"
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 参数对象
      reqParams: {
        // 全部/收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      // 总条数
      total: 0,
      loading: false
    }
  },
  created () {
    // 获取素材列表数据
    this.getImages()
  },
  methods: {
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    async getImages () {
      this.loading = true
      const {
        data: { data }
      } = await this.$http.get('/user/images', { params: this.reqParams })
      // 获取数据成功
      this.images = data.results
      // 设置总条数
      this.total = data.total_count
      this.loading = false
    },
    // 切换全部和收藏
    search () {
      this.reqParams.page = 1
      this.getImages()
    }
  }
}
</script>

<style lang="less" scoped>
.pic-list {
  list-style: none;
  overflow: hidden;
  li {
    position: relative;
    width: 150px;
    height: 150px;
    float: left;
    margin: 0 30px 30px 0;
    img {
      width: 100%;
      height: 100%;
    }
    .foot {
      position: absolute;
      width: 100%;
      height: 30px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      left: 0;
      bottom: 0;
      font-size: 18px;
      text-align: center;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
