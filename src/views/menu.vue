<template>
  <div id="title">
    <el-container>
  <el-header>Header</el-header>
  <el-container>
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
              <span slot="title">客户拜访记录</span>
            </el-menu-item>
            <el-menu-item index="/menu/productInfo">
              <i class="el-icon-menu"></i>
              <span slot="title">产品信息</span>
            </el-menu-item>
            <el-menu-item index="/menu/moneyLog">
              <i class="el-icon-setting"></i>
              <span slot="title">账户流水</span>
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
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
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
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: left;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container{
    height: 97.50% !important;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>