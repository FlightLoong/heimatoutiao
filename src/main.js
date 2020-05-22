import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 flexible 进行 rem 适配
// 导入某个包的时候，如果包下存在 Index.js ，是可以省略路径，直接导入包的
import 'amfe-flexible'

// 导入 vant 核心组件库
import Vant, { Lazyload } from 'vant'
// 导入 vant 全局样式
import 'vant/lib/index.css'

// 导入全局样式
// 我们自己的样式需要写到 ui 组件库的后面
// 否则容易出现自己的样式被覆盖的情况
import './styles/index.scss'

// 导入时间格式化插件
import './utils/dayjs.js'

// 注册并使用 vant 组件库
Vue.use(Vant)
Vue.use(Lazyload, {
  preload: 1.3
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
