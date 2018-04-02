<template>
  <common>
     <span class="tit" slot="title">人员管理</span>
      <ul class="nav-class" slot="nav">
        <li><router-link to="/man/person" tag="a">普通人员列表</router-link></li>     
        <li><router-link to="/man/good" tag="a">白名单列表</router-link></li> 
        <li><router-link to="/man/bad" tag="a">黑名单列表</router-link></li>   
      </ul>
      <div slot="main" class="content-box">
        <router-view></router-view>
      </div>
  </common> 
</template>

<script>
export default {
  data () {
    return {
    
    }
  },
  mounted(){
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

</style>