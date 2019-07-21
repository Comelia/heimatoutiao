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
        <el-tab-pane label="粉丝画像" name="photo">
          <!-- 2.为 ECharts 准备一个具备宽高的 DOM -->
          <!-- 3.获取DOM 对象  ref="bar"-->
          <div ref="bar" style="width:600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// 1.安装 导入
import ECharts from 'echarts'
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
  mounted () {
    // 绘制图表
    this.drawChart()
  },
  methods: {
    drawChart () {
      // 获取dom对象
      const dom = this.$refs.bar
      // 4.初始化
      const myECharts = ECharts.init(dom)
      // 5.准备配置项和数据 配置项依赖文档 数据依赖后台
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
      // 6.使用刚才指定的配置项和数据显示图片
      myECharts.setOption(option)
    },
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
