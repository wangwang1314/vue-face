<template>
  <common>
      <span class="tit" slot="title">出入管理</span>
      <ul class="nav-class" slot="nav">
        <li><router-link to="/home/survey" tag="a">出入概况</router-link></li>     
        <li><router-link to="/home/record" tag="a">出入记录</router-link></li>
      </ul>
      <div slot="main">
        <router-link to="/home/survey">是是是</router-link>
        <router-link to="/home/record">dsfd</router-link>
        <router-view></router-view>
      </div>
  </common>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    this.$api.post("/Login",{account:13949096002,password:"e10adc3949ba59abbe56e057f20f883e"},su=>{console.log(su.info)},err=>{},{})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

</style>