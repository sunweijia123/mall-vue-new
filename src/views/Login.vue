<template>
  <div id="login">
    <h3 id="head">Mall For 武汉新洲区</h3>
    <el-form ref="form" :rules="rules" :model="form" label-width="70px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="form.name" style="200px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
    <el-button type="primary" @click="onSubmit">登陆</el-button>
    <el-button @click="goRegister">注册</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password:'',
        code:''
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
          //可以看看这个this和that是啥
      var that=this;
      console.log(that.form.name+":"+that.form.password)  
      this.$http.get('http://118.178.254.125:8081/mall/login',{
        params: {
            name:this.form.name,
            password:this.form.password
        }

      })
      .then(function (params) {
        console.log(params)
        if(params.data.state === 1){
          that.$router.push({
          path:'/success'
        })
        }
      })
      .catch(function (reason) {
        console.log(reason)
      })
    },
    goRegister(){
      console.log('注册')
      this.$router.replace('/register')
    }
  }
};
</script>

<style lang="scss" scope>
    #login{
      width: 20%;
    }
    #head{
      text-align: center;
    }
</style>
