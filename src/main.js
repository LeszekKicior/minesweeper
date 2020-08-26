import Vue from 'vue'
import App from './App.vue'

require('@/assets/styles/style.scss')

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
