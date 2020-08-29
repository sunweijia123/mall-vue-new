<template>
    <table id="loginUI">
    <tr>
      <td>用户名</td>
      <td><input type="text" v-model="name"></td>
    </tr>
    <tr>
      <td>密码</td>
      <td><input type="password" v-model="password"></td>
    </tr>
    <tr>
      <td colspan="2"><input type="submit" @click="login" value="提交"></td>
    </tr>
  </table>
</template>
 
<script>
import qs from 'qs'
export default {
  data(){
    return {
      name:"",
      password:""
    }
  },
  methods:{
    login(){
        //可以看看这个this和that是啥
      var that=this;
      console.log(that.name+":"+that.password)  
    //   var user={
    //     name:that.name,
    //     password:that.password
    //   } 
      this.$http.get('http://localhost:8009/mall/login',{
        params: {
            name:that.name,
            password:that.password
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
    }
  }

}
</script>

<style>
#loginUI {
  margin:0 auto;
}
</style>