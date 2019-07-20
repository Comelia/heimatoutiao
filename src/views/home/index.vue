<template>
  <div class="home-container">
    <el-container class="container">
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse? '60px':'200px'" class="my-asidebar">
        <div class="logo" :class="{'m-logo': isCollapse}" ></div>
        <el-menu
          router
          :collapse="isCollapse"
          :collapse-transition='false'
          style="border-right: none"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#002033"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 导航栏 -->
        <el-header class="my-header">
          <!-- icon -->
          <span class="el-icon-s-fold" @click="close"></span>
          <span class="text">江苏传智播客科技教育有限公司</span>
          <!-- 下拉菜单 -->
          <el-dropdown style="float: right">
            <span class="el-dropdown-link">
              <img :src="pic" style="width: 36px;vertical-align: middle;margin-right: 5px;" alt=""> {{ name }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="setting()" icon="el-icon-setting">个人设置</el-dropdown-item>
              <el-dropdown-item @click.native="logout()" icon="el-icon-unlock">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      name: '',
      pic: ''
    }
  },
  methods: {
    close () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      window.sessionStorage.removeItem('hm-toutiao')
      this.$router.push('/login')
    }
  },
  created () {
    // 显示个人信息
    const user = JSON.parse(window.sessionStorage.getItem('hm-toutiao'))
    this.name = user.name
    this.pic = user.photo
  }
}
</script>

<style scoped lang="less">
.home-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    // 侧边栏
    .my-asidebar {
      height: 100%;
      background: #002033;
      .logo {
        height: 60px;
        background: #024 url(../../assets/images/logo_admin.png) no-repeat
          center / 140px auto;
      }
      .m-logo {
        background: url(../../assets/images/logo_admin_01.png) no-repeat center;
        background-size: 46px auto;
      }
    }
    // 导航栏
    .my-header {
      line-height: 60px;
      .el-icon-s-fold {
        font-size: 28px;
        vertical-align: middle;
        margin-right: 6px;
      }
      .text {
        vertical-align: middle;
      }
    }
  }
}
</style>
