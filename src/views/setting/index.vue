<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form  :model="userForm" label-width="120px">
            <el-form-item label="编号:">{{ userForm.id }}</el-form-item>
            <el-form-item label="手机号:">{{ userForm.mobile }}</el-form-item>
            <el-form-item label="媒体名称:">
              <el-input v-model="userForm.name" size="small" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍:">
              <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="userForm.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserInfo">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" >
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="myUpload"
            :show-file-list="false">
            <img v-if="userForm.photo" :src="userForm.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center"> <span class="el-icon-user-solid"></span> 修改头像 </p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userForm: {
        id: 1,
        mobile: '13911111111',
        name: '',
        intro: null,
        email: null,
        photo: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    myUpload (data) {
      // 自己上传图片 使用axios配合formData进行上传图片
      // 获取图片对象 data.file 获取
      const formData = new FormData()
      formData.append('photo', data.file)
      this.$http.patch('user/photo', formData).then((res) => {
        // 修改头像成功 res.data.data.photo 地址
        const url = res.data.data.photo
        // 提示用户 成功信息
        this.$message.success('修改头像成功')
        // 把修改后的头像图片地址给 用户信息列表
        this.userForm.photo = url
        // 1.更新home组件的头像
        eventBus.$emit('updateHeaderPhoto', url)
        // 2.更新本地存储的头像
        const userInfo = JSON.parse(window.sessionStorage.getItem('hm-toutiao'))
        userInfo.photo = url
        window.sessionStorage.setItem('hm-toutiao', JSON.stringify(userInfo))
      })
    },
    // 获取用户信息
    async getUserInfo () {
      const { data: { data } } = await this.$http.get(`user/profile`)
      // 请求成功
      this.userForm = data
    },
    // 更改用户信息
    async updateUserInfo () {
      const { data: { data } } = await this.$http.patch(`user/profile`, {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('修改用户信息成功')
      // 1.传入当前修改的用户名称给home组件 修改home组件的数据用户名
      eventBus.$emit('updateHeaderName', data.name)
      // 2.更新本地存储的用户名称
      const userInfo = JSON.parse(window.sessionStorage.getItem('hm-toutiao'))
      userInfo.name = data.name
      window.sessionStorage.setItem('hm-toutiao', JSON.stringify(userInfo))
    }
  }
}
</script>

<style lang="less" scoped>
</style>
