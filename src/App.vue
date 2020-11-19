<template>
  <div id="app">
    <router-link to="/Home" ><el-button type="primary" class="nav-btn">图书管理</el-button></router-link>
    <router-link to="/About"><el-button type="success" class="nav-btn">默认按钮</el-button></router-link>
    <router-view></router-view>
<!--   <Home :cmovies="movies" :cmsg="message"></Home>-->
  </div>
</template>

<script>
import Home from "./view/home";
export default {
  name: 'App',
  data(){
    return {
    
    }
  },
  components: {
    Home
  }
}
</script>

<style scoped>
#app {
text-align: center;
}
  .nav-btn{
    margin-right: 10px;
  }
</style>
