<template>
  <div id="title">
    <el-container>
  <el-header>管理后台</el-header>
  <el-container style="height: 100vh;">
    <el-aside width="200px"><el-row>
        <el-col :span="3">
          <el-menu
            router
            default-active="this.$route.path"
            class="navi_menu"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="/menu/userInfoLog">
              <i class="el-icon-menu"></i>
              <span slot="title">客户信息</span>
            </el-menu-item>
            <el-menu-item index="/menu/productInfo">
              <i class="el-icon-menu"></i>
              <span slot="title">产品信息</span>
            </el-menu-item>
            <el-menu-item index="/menu/moneyLog">
              <i class="el-icon-setting"></i>
              <span slot="title">出货明细</span>
            </el-menu-item>
            <el-menu-item index="/menu/account">
              <i class="el-icon-setting"></i>
              <span slot="title">账户信息</span>
            </el-menu-item>
            <el-menu-item index="/menu/people">
              <i class="el-icon-setting"></i>
              <span slot="title">股东信息</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row></el-aside>
    <el-main> <router-view></router-view></el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
export default {
  methods: {

  },
};
</script>
<style scpoe>
#title{
  width: 100%;
  height: 100%;
}
.el-col-3{
  width: 100%;
}
.el-header, .el-footer {
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid #000;
  }
  .el-aside{
    background: #EBEEF5;
    color: #333;
    text-align: left;
    line-height: 200px;
  }
  
  .el-main {
    color: #333;
    text-align: left;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>