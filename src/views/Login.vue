<template>
  <div id="login" class="all_wrap">
    <div id="login_child" class="wrap_child">
      <h2 id="head">Mall For 武汉新洲区</h2>
      <el-form ref="form" :rules="rules" :model="form" label-width="70px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" style="200px"  placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="密码" @keyup.enter.native="onSubmit()"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登陆</el-button>
          <el-button @click="goRegister">注册</el-button>
          <span id="reg" @click="gologinByEmail">忘记密码</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
        code: "",
      },
      //校验
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //登陆
    onSubmit() {
      var that = this;
      this.$http
        .get("http://118.178.254.125:8081/mall/login", {
          params: {
            name: this.form.name,
            password: this.form.password,
          },
        })
        .then(function (params) {
          if (params.data.state === 1) {
            setTimeout(() => {
              that.$message({
                message: "登陆成功",
                type: "success",
              });
            }, 1);
            that.$router.push({
              path: "/menu",
            });
          } else {
            setTimeout(() => {
              that.$message.error("账户名或密码错误");
            }, 1);
          }
        })
        .catch(function (reason) {
          console.log(reason);
        });
    },
    //跳转注册
    goRegister() {
      this.$router.replace("/register");
    },
    //跳转忘记密码
    gologinByEmail() {
      this.$router.replace("/loginByEmail");
    }
  }
};
</script>

<style lang="scss" scope>
#head {
  text-align: center;
}
#reg {
  color: red;
  margin-left: 20%;
  margin-top: 10%;
  cursor: pointer;
}
</style>
