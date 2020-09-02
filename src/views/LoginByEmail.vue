<template>
  <!--  -->
  <div id="loginByEmail" class="all_wrap">
    <div id="loginByEmail_child" class="wrap_child">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          prop="email"
          label="邮箱"
          :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="primary">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        email: "",
      },
    };
  },
  methods: {
    primary() {
      var that = this;
      let url = "http://118.178.254.125:8081/mall/mail/loginByEmail";
      let params = {
        email: this.ruleForm.email,
      };
      console.log(params);
      this.$http.post(url, params).then((res) => {
          console.log(res)
        if (res.data.state == 1) {
          setTimeout(() => {
            that.$message({
              message: "成功",
              type: "success",
            });
          }, 1);
        console.log('成功')
        this.$router.replace("/");
        } else {
        console.log('失败')
          setTimeout(() => {
            that.$message.error("失败");
          }, 1);
        }
      });
    },
  },
};
</script>
<style scoped>

</style>