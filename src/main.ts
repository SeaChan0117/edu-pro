import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import dayjs from 'dayjs'

// 加载全局样式
import './styles/index.scss'

Vue.use(ElementUI)
Vue.filter('date', (value: any, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
