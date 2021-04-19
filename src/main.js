import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from "./router/router";
import './assets/styles/styles.scss'
import 'material-design-icons-iconfont'
import Vuetify from 'vuetify'

Vue.config.productionTip = false
Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify(),
  render: h => h(App),
  store,
  router
}).$mount('#app')
