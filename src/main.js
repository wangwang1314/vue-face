// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
// 请求封装文件
import api from './api/index.js'
import state from './vuex/state'
import common from './components/common/common.vue'
import open from './components/common/commonopen.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css'

Vue.use(Vuex);
const store = new Vuex.Store({
	state
})

Vue.use(ElementUI);
Vue.component("common",common)
Vue.component("open",open)
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
