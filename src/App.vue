<template>
  <div id="app">
    <CustomAudio msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CustomAudio from '@/components/custom-audio/index.vue';

@Component({
  components: {
    CustomAudio
  }
})
export default class App extends Vue {}
</script>
