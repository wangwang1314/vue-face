// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
// 请求封装文件
import api from './api/index.js'
import state from './vuex/state'

Vue.use(Vuex);
const store = new Vuex.Store({
	state
})


// 将API方法绑定到全局
Vue.prototype.$api = api

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
