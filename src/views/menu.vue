<template>
  <div>
    <div id="title">
 
    <div class="user_info">
      sunweijia
    </div>
    </div>
    <div>
      <el-row>
        <el-col :span="3">
          <el-menu
            router
            default-active="this.$route.path"
            class="navi_menu"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="/userInfoLog">
              <i class="el-icon-menu"></i>
              <span slot="title">客户拜访记录</span>
            </el-menu-item>
            <el-menu-item index="/productInfo">
              <i class="el-icon-menu"></i>
              <span slot="title">产品信息</span>
            </el-menu-item>
            <el-menu-item index="/moneyLog">
              <i class="el-icon-setting"></i>
              <span slot="title">账户流水</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style scpoe>
#title {
  background-color: aqua;
  padding: 10px;
}
.user_info{
  height: 50px;
  /* padding: 10%; */
  /* float: right; */
}
</style>