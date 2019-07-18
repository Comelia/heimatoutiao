<template>
  <el-card>
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
        <img :src="item.url" alt="">
        <div class="foot">
          <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
          <span class="el-icon-delete"></span>
        </div>
      </li>
    </ul>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
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
      images: []
    }
  },
  components: {},
  created () {
    // 获取素材列表数据
    this.getImages()
  },
  methods: {
    async getImages () {
      const { data: { data } } = await this.$http.get('/user/images', { params: this.reqParams })
      // 获取数据成功
      this.images = data.results
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
        background: rgba(0,0,0,0.5);
        color: #fff;
        left: 0;
        bottom: 0;
        font-size: 18px;
        text-align: center;
        span {
          margin: 0 20px;
          &.red {
            color: red
          }
        }
      }
  }
}
</style>
