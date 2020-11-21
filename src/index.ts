import customAudio from '@/components/custom-audio/index.vue'; //引入组件

const main = {
  install(Vue: any, options: any) {
    console.log(customAudio.name+'已装载');
    Vue.component(customAudio.name, customAudio); //注册全局
  }
};

// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(main);
}

export default main;
