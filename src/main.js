import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'
import "./axios"


import StrUtil from './util/StrUtil'
import DateUtil from './util/DateUtil'
import JwtUtil from './util/JwtUtil'
import Config from './util/Config'
import { Lazyload } from 'vant';

Vue.use(Lazyload);

/*引入资源请求插件*/
import VueResource from 'vue-resource'
/*使用VueResource插件*/
Vue.use(VueResource)

Vue.use(Vant);


Vue.config.productionTip = false
Vue.prototype.$axios = axios //
Vue.prototype.$str = StrUtil //
Vue.prototype.$date = DateUtil //
Vue.prototype.$jwt = JwtUtil //
Vue.prototype.$c = Config //



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
