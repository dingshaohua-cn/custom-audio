import CustomAudio from '@/components/custom-audio/index.vue'; //引入组件

// 定义install方法
const install:any = (Vue: any) => {
  if (install.installed) {
    return false;
  }
  // 遍历并注册组件
  Vue.component('CustomAudio', CustomAudio);
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

// @ts-ignore
CustomAudio.install = install;

export default CustomAudio;

export interface teachre {
  a: string
}
