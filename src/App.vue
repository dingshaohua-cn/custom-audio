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
      }
    ],
  };
}
</script>
