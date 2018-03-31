<template>
 
    <div class="hello" >

   普通人员列表
   
    </div>
  
  
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