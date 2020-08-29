<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="go">点我跳转</button>
    <button @click="login">点我登录</button>
  </div>
</template>

<script>
export default {
  // name: 'HelloWorld',
  data () {
    return {
      msg: 'Mall For 武汉新洲区'
    }
  },
  methods:{
  	go(){
      // console.log(sunweijia)
      this.$router.push({
        path:'/sunweijia'
      })
    },
    login(){
      this.$router.push({
        path:'/login'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
  color: #42b983;
}
</style>
