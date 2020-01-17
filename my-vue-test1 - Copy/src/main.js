// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'      // +++1、导入路由组件
import router from './approuter'        // +++2、导入我们自己写的路由配置文件
// import ECharts from 'vue-echarts/components/ECharts'
// import 'echarts/lib/chart/line'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Vue.component('chart', ECharts)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  components: { App },

  template: '<App/>'
})
