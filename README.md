# custom-audio
使用
```shell
yarn add custom-audio
npm install custom-audio
```
```javascript
import CustomAudio from 'custom-audio';
Vue.use(CustomAudio);
```
```vue
<template>
  <div id="app">
    <CustomAudio :params="customParams" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CustomAudio from "@/components/custom-audio/index.vue";
import { CustomAudioParams } from "@/components/custom-audio/type";

@Component({
  components: {
    CustomAudio,
  },
})
export default class App extends Vue {
  private customParams: CustomAudioParams = {
    url: "https://dshvv.oss-cn-beijing.aliyuncs.com/speak.wav",
    keyframes: [
      {
        duration: 9140,
        label: "ivr",
        color: "white",
      },
      {
        duration: 15940,
        label: "振铃",
        color: "red",
      },
      {
        duration: 8840,
        color: "green",
        label: "人工服务",
      },
      {
        duration: 6280,
        color: "blue",
        label: "满意度",
      },
    ],
  };
}
</script>

```
参数
```javascript
interface keyframe{
    // 此段的时长 毫秒
    duration: number;
    // 关键点名字
    color: string;
    // 关键点位置
    label: string;
}

export interface CustomAudioParams{
    url: string;
    keyframes?:Array<keyframe>;
}
```
预览   
![image](https://github.com/dshvv/custom-audio/blob/master/screenshots/1.jpg)
