import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'

/* UI库 begin */
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'default-passive-events'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/* UI库 end */

/* 全局组件引入 begin */
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import BScroller from '@/components/BScroller'
import Loading from './components/Loading'
/* 全局组件引入 end */

Vue.use(MintUI)
Vue.use(ElementUI)

/* 全局组件注册 begin */
Vue.component('Header', Header)
Vue.component('TabBar', TabBar)
Vue.component('BScroller', BScroller)
Vue.component('Loading', Loading)
/* 全局组件注册 end */

/* 全局过滤器 begin */
Vue.filter('ImgUrlFilter_128w_180h', (url) => {
  if (!url) {
    return url
  }
  return url.replace('/w.h', '').concat('@1l_1e_1c_128w_180h')
})
/* 全局过滤器 end */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
