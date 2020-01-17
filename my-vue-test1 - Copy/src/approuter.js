import VueRouter from 'vue-router'              // 导入路由模块    
import Home from './components/Home.vue'        // 导入Home组件
import HelloWorld from './components/HelloWorld'        // 导入Home组件

export default new VueRouter({                  // 定义路由规则对象
  routes: [
    {path: '/home', component: Home},
    {path: '/hello', component: HelloWorld}
  ]
})
