import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Cookies from 'js-cookie'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/assets/icons'
import '@/assets/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
