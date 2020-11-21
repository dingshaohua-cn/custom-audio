import customAudio from '@/components/custom-audio/index.vue'; //引入组件
export default {
  install(Vue: any) {
    Vue.component(customAudio.name, customAudio); //注册全局
  }
};
