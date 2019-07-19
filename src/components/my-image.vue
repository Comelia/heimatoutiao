<template>
  <div class="image-container">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog">
      <img :src="value || dafaultImage" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="700px">
      <!-- activeName 是选项卡标签的name属性的值 -->
      <!-- label="用户管理" 选项卡标签的文字 -->
      <!-- el-tab-pane 标签的内容 就是选项卡对应的内容 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 按钮 -->
          <div style="overflow: hidden;">
            <el-radio-group size="small" @change="search()" v-model="reqParams.collect">
              <el-radio-button label="false">全部</el-radio-button>
              <el-radio-button label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div class="pic_list" @click="selectedImage(item.url)" :class="{selected:selectedImageUrl===item.url}" v-for="item in images" :key="item.id">
            <img :src="item.url" alt />
          </div>
          <!-- 分页 -->
          <el-pagination
            v-if="total>reqParams.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :headers="headers"
            :on-success="handleSuccess"
            name="image">
            <img v-if="uploadimageUrl" :src="uploadimageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dafaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      dafaultImage,
      // 控制对话框显示/隐藏
      dialogVisible: false,
      // 控制选中的选项卡
      activeName: 'image',
      // 获取素材列表时传参
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 上传图片后预览的路径
      // value: dafaultImage,
      // 图片列表
      images: [],
      // 总页数
      total: 0,
      // 你选中的素材地址
      selectedImageUrl: null,
      // 上传素材 携带token
      headers: {
        Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hm-toutiao')).token
      },
      uploadimageUrl: null
    }
  },
  methods: {
    // 确认图片
    confirmImage () {
      if (this.activeName === 'image') {
        // 如果是素材 使用 selectedImageUrl 做封面图
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        // this.value = this.selectedImageUrl
        this.$emit('input', this.selectedImageUrl)
        // console.log(this.selectedImageUrl)
        // this.dialogVisible = false
      } else {
        // 如果是上传图片 使用 uploadImageUrl 做为封面图
        if (!this.uploadimageUrl) return this.$message.warning('请上传图片')
        // this.value = this.uploadimageUrl
        this.$emit('input', this.uploadimageUrl)
      }
      this.dialogVisible = false
    },
    // 选中图片
    selectedImage (url) {
      // 思路 :class={selected:条件}
      // 条件 记录上去点击图片的唯一标识 然后 去比对每次遍历的图片的唯一标识
      // 如果一致  选中  不一致  不选中
      // 此时图片地址做为唯一标识  将来提交的数据是地址不是ID
      this.selectedImageUrl = url
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 显示收藏列表
    search () {
      this.reqParams.page = 1
      this.getImages()
    },
    handleSuccess (res) {
      // 预览
      this.uploadimageUrl = res.data.url
    },
    // 加载组件时
    openDialog () {
      this.dialogVisible = true
      // 渲染素材列表
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      // console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.img-btn {
  width: 120px;
  height: 120px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.pic_list {
  display: inline-block;
  width: 150px;
  height: 150px;
  margin-right: 10px;
  margin-top: 10px;
  border: 1px dashed #ddd;
  position: relative;
  &.selected {
    &::before {
      // .img-item.selected::before{} 加上selected class加遮罩层
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.2) url(../assets/images/selected.png) no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
