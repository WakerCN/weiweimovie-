import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/* 全局组件 begin */
import Header from './components/Header'
import TabBar from './components/TabBar'

Vue.component('Header', Header)
Vue.component('TabBar', TabBar)
/* 全局组件 end */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
