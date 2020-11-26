import Vue from 'vue';
import App from './App.vue';
// @ts-ignore
import CustomAudio from '../lib/custom-audio.umd.js';


Vue.use(CustomAudio);
Vue.config.productionTip = false;

const app = new Vue({
  render: h => h(App)
}).$mount('#app');

console.log(app);
