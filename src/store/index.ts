import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user') || 'null'), // 当前登录用户状态
    isMenuClose: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)

      // 为了防止刷新页面数据丢失，需要数据持久化
      localStorage.setItem('user', payload)
    },
    setMenuClose (state, payload) {
      state.isMenuClose = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
