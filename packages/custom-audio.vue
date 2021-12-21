<template>
  <audio :src="props.src" ref="audioRef" @canplay="onCanplay" @timeupdate="onTimeUpdate" @play="onPlay" @pause="onPause" @ended="onEnded" />
  <div class="custom-audio">
    <div class="left-tools">
      <icon-cmp icon="ant-design:play-circle-filled" v-if="status === 'pause'" @click="clickPlay('play')" />
      <icon-cmp icon="ant-design:pause-circle-filled" v-else @click="clickPlay('pause')" />
      <div class="time-status">{{ transTime(currentTime) }} / {{ transTime(duration) }}</div>
    </div>
    <center-bar :duration="duration" :current-time="currentTime" @set-current-time="onSetCurrentTime" />
    <div class="right-tools">
      <icon-cmp icon="fontisto:spinner-refresh" @click="onRightTools('refresh')" />
      <icon-cmp icon="entypo:download" @click="onRightTools('down')" />
      <span @click="onRightTools('speed')">{{ speed }}x</span>
    </div>
  </div>
</template>
<script setup>
  import { Icon as IconCmp } from '@iconify/vue';
  import { ref } from 'vue';
  import { onMounted, onBeforeUnmount } from '@vue/runtime-core';
  import CenterBar from './center-bar.vue';
  import { transTime, downBlob, downUrl } from './helper';

  const props = defineProps({
    src: {
      type: String,
      required: true,
    },
    downBlob: {
      type: Boolean,
      default: false,
    },
  });

  // 当前组件是否处于聚焦事件：最后一次点击的是此组件，那就将其作为聚焦
  const isCmpFocus = ref(false);

  // 播放速度
  const speed = ref(1);

  // 原生音频组件
  const audioRef = ref(null);

  // 总时长
  const duration = ref(0);

  // 当前播放时长
  const currentTime = ref(0);

  // 当前播放状态
  const status = ref('pause');

  // 监听准备就绪
  const onCanplay = ({ target }) => {
    duration.value = target.duration;
  };

  // 监听播放位置改变
  const onTimeUpdate = ({ target }) => {
    currentTime.value = target.currentTime;
  };

  // 监听播放
  const onPlay = ({ target }) => {
    status.value = 'playing';
  };

  // 监听暂停
  const onPause = ({ target }) => {
    status.value = 'pause';
  };

  // 监听停止
  const onEnded = () => {
    status.value = 'pause';
  };

  // 设置播放位置对应时间
  const onSetCurrentTime = (time) => {
    audioRef.value.currentTime = time;
  };

  // 监听点击左侧工具
  const onRightTools = (type) => {
    if (type === 'refresh') {
      status.value = 'pause';
      audioRef.value.pause();
      audioRef.value.currentTime = 0.0;
    } else if (type === 'down') {
      if (props.downBlob) {
        downBlob(props.src);
      } else {
        downUrl(props.src);
      }
    } else if (type === 'speed') {
      if (speed.value === 4) {
        speed.value = 1;
      } else {
        speed.value++;
      }
      audioRef.value.playbackRate = speed.value;
    }
  };

  // 点击了播放/停止
  const clickPlay = (type) => {
    audioRef.value[type]();
  };

  // 点击了网页
  const onClickBody = (e) => {
    const customAudio = document.querySelector('.custom-audio');
    const isClickCmp = customAudio.contains(e.target);
    isCmpFocus.value = isClickCmp;
  };

  // 按下了键盘
  const onKeydown = (e) => {
    const keyNum = e.key;
    if (isCmpFocus.value) {
      if (keyNum === 'ArrowLeft') {
        audioRef.value.currentTime = audioRef.value.currentTime - 5;
      } else if (keyNum === 'ArrowRight') {
        audioRef.value.currentTime = audioRef.value.currentTime + 5;
      }
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', onKeydown);
    window.addEventListener('click', onClickBody);
  });

  onBeforeUnmount(() => {
    try {
      window.removeEventListener(onClickBody);
      window.removeEventListener(onKeydown);
    } catch (e) {}
  });
</script>
<style lang="less">
  @import url(./style.less);
</style>
