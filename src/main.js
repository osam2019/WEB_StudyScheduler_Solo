import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ToggleButton from 'vue-js-toggle-button'
import Element from 'element-ui'
import VueModalTor from 'vue-modaltor'

Vue.use(Element)
Vue.use(ToggleButton)
Vue.use(VueModalTor)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
