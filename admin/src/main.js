// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routes from './routes'
import Vuex from 'vuex'
import axios from 'axios';
import VueRouter from 'vue-router'
import {store} from './store/store.js'

//引入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import echarts from 'echarts'

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to,from,next) => {
  NProgress.start();
  if(to.path == '/login'){
    localStorage.removeItem('user')
  }

  let user = localStorage.getItem('user');
  if(!user && to.path != '/login'){
    next({path:'/login'})
  }else{
    next()
  }

})

router.afterEach(transition => {
  NProgress.done();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
