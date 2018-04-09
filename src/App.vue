<template>
  <div id="app">
   
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	.el-main{
		padding: 0;
	}
	.el-message-box__btns button:nth-child(1) {
	    float: right;
	} 
	.el-message-box__btns button:nth-child(2) {
	    float: right;
	    margin-right:10px;
	} 
</style>
