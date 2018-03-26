<template>
  <div class="hello">

    登录登录sdasd
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  color:red;
  div{
    color:blue;
    font-size:28px;
  }
}
</style>