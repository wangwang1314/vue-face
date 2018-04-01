<template>
  <common>
      <span class="tit" slot="title">首页</span>
      <ul class="nav-class" slot="nav">
        <li><router-link to="/home/survey" tag="a">出入概况</router-link></li>     
        <li><router-link to="/acc/accrecord" tag="a">出入记录</router-link></li>
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
<style lang='scss' scoped>
  .content-box{
    
  }
</style>