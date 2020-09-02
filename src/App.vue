<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.el-form-item__label{
  color: white !important;
}
.all_wrap{
width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./assets/img/35891598762678_.pic_hd.jpg") center no-repeat;
  background-size: auto 100%;
}

.wrap_child{
  width: 30%;
  border: 1px solid white;
  padding: 20px;
  border-radius: 10px;
  background: rgba(0,0,0,.5);
}

</style>
