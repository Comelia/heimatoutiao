<template>
  <div class="image-container">
    <!-- 图片按钮 -->
    <div class="img-btn" @click="openDialog">
      <img src="../assets/images/default.png" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="700px">
      <!-- activeName 是选项卡标签的name属性的值 -->
      <!-- label="用户管理" 选项卡标签的文字 -->
      <!-- el-tab-pane 标签的内容 就是选项卡对应的内容 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="fodder">
          <!-- 按钮 -->
          <div style="overflow: hidden;">
            <el-radio-group size="small" v-model="reqParams.collect">
              <el-radio-button label="false">全部</el-radio-button>
              <el-radio-button label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 图片列表 -->
          <div class="pic_list" v-for="item in images" :key="item.id">
            <img :src="item.url" alt />
          </div>
          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            name="image"
          >
            <img v-if="uploadimageUrl" :src="uploadimageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import value from '../assets/images/default.png'
export default {
  name: 'my-image',
  data () {
    return {
      // 控制对话框显示/隐藏
      dialogVisible: false,
      // 控制选中的选项卡
      activeName: 'fodder',
      // 获取素材列表时传参
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 上传图片后预览的路径
      uploadimageUrl: value,
      // 图片列表
      images: []
    }
  },
  methods: {
    handleAvatarSuccess () {},
    openDialog () {
      this.dialogVisible = true
      // 渲染素材列表
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
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
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
