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
            :show-file-list="false"
            :on-success="handleSuccess">
            <img v-if="userForm.phone" :src="userForm.phone" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center"> <span class="el-icon-user-solid"></span> 修改头像 </p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userForm: {
        id: 1,
        mobile: '13911111111',
        name: 'text',
        intro: null,
        email: null,
        phone: null
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户信息
    async getUserInfo () {
      const { data: { data } } = await this.$http.get(`user/profile`)
      // 请求成功
      this.userForm = data
    },
    // 更改用户信息
    updateUserInfo () {}
  }
}
</script>

<style lang="less" scoped>
</style>
