import Vue from 'vue';
import App from './App.vue';
import VueConfetti from 'vue-confetti';

Vue.use(VueConfetti);

require('@/assets/styles/style.scss');

Vue.config.productionTip = false

Vue.filter('parseTime', function (value) {
    const time = parseInt(value)
    const timeObj = {
        minutes: Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((time % (1000 * 60)) / 1000)
    }
    const displayMinutes = timeObj.minutes < 10 ? `0${timeObj.minutes}` : timeObj.minutes
    const displaySeconds = timeObj.seconds < 10 ? `0${timeObj.seconds}` : timeObj.seconds
    return `${displayMinutes}:${displaySeconds}`
})

new Vue({
  render: h => h(App),
}).$mount('#app')
