<template>
  <div @click="closeFn">
    <open>
      <span class="tit" slot="title">开户管理</span>
      <ul class="nav-class" slot="nav">
        <li><router-link to="/openListindex" tag="a">开户列表</router-link></li>     
      </ul>
      <div slot="main" class="content-box">
          <router-view></router-view>
      </div>
  </open>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  mounted(){
   // this.$router.go({path:"/openListindex/openlist"})
  },
  methods:{
     closeFn(){
        this.$store.state.slider = false;
      }
  }
}
</script>
<style lang='scss' scoped>
 
</style>