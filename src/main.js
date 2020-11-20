import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import axios from 'axios'

Vue.use(ElementUI);

Vue.prototype.$http=axios;
Vue.prototype.$http.defaults.baseURL = 'http://www.liulongbin.top:3005/api/'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
