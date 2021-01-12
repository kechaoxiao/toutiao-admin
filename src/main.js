// 项目入口
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入全局样式
import './styles/reset.css'

// 引入elment-ui框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 注册elemnt-ui框架
Vue.use(ElementUI)

Vue.config.productionTip = false

// 创建了一个vue实例
// 把router配置到实例中
// 通过render方法把App渲染到 #app 节点
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
