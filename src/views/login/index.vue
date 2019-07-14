<template>
  <div class="login-container">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt="">
      <!-- 表单 -->
      <!-- 表单容器 -->
      <el-form ref="loginForm" :status-icon="true" :model="loginForm" :rules="loginRules">
        <!-- 表单每一项容器 -->
        <el-form-item  prop="mobile">
          <!-- 表单元素 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width: 240px"></el-input>
          <el-button style="float: right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户此而已和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 校验手机号
    const checkMobile = (rule, value, callback) => {
      // 检验逻辑 把vaule拿出来进行手机号的格式校验
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号格式不正确'))
      }
    }
    return {
      // 表单数据对象
      loginForm: {
        mobile: '',
        code: ''
      },
      // 表单验证规则对象
      loginRules: {
        mobile: [
          { required: true, message: ' 请输入手机号 ', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
          // 添加自定义校验
          // i.有一个字段 validator 指定自定义校验规则的函数
          // ii.校验规则函数提前声明, 在data()的return之前
          // iii.函数有约定:
          //   ① 参数(rule,value,callback) 规则对象 输入的内容 回调函数(验证完毕需要调用)
          //   ② 当callback()成功 , 当前callback(new Error('错误提示))失败
        ],
        code: [
          { required: true, message: ' 请输入验证码 ', trigger: 'blur' },
          { len: 6, message: ' 请输入6位数字 ', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行校验
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 提交登录请求 axios 是基于 promise 封装的 post() 返回值是一个promise 对象
          this.$http
            .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
            .then(res => {
              // res 是响应对象 包含 后台返回的数据 res.data
              // console.log(res.data) 登录成功去做什么?
              // 1.跳转到首页
              this.$router.push('/')
              // console.log(res)
              // TODO 2.保存用户的信息 用来判断登录的状态
              window.sessionStorage.setItem('hm-toutiao', JSON.stringify(res.data.data))
            })
            // 如果不用err 可以改成空 ( )
            .catch(() => {
              // 提示用户错误信息
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .box-card {
    width: 400px;
    height: 320px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
  }
}
</style>
