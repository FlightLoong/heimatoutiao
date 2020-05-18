import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入全局样式
import './styles/index.scss'

// 导入 flexible 进行 rem 适配
// 导入某个包的时候，如果包下存在 Index.js ，是可以省略路径，直接导入包的
import 'amfe-flexible'

// 导入 vant 核心组件库
import Vant from 'vant'
// 导入 vant 全局样式
import 'vant/lib/index.css'
// 注册并使用 vant 组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
