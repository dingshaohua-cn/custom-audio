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
![text](data:image/png;base64,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)
