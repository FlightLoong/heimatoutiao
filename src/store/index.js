import Vue from 'vue'
import Vuex from 'vuex'
// 导入本地存储操作方法
import { setItem, getItem } from '@/utils/storage.js'

Vue.use(Vuex)

// 声明 Token 的 key 变量
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 存储当前登录用户的 token 等信息
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    // 对 user 进行赋值
    setUser (state, data) {
      state.user = data

      // 为了防止刷新后数据丢失，需要将接口返回的 token 数据保存大本地存储中
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
