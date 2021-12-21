<template>
  <div class="center-bar" ref="centerBarRef" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div class="center-bar-active" :style="`width: ${centerBarActiveWidth}px`"></div>
    <div class="play-point" ref="playPointRef" :style="`left: ${centerBarActiveWidth}px`" @mousedown="onMousedown" @touchstart="onTouchstart"></div>
  </div>
</template>
<script setup>
  import { computed, onMounted, ref, defineEmits } from 'vue';

  const props = defineProps({
    duration: {
      type: Number,
    },
    currentTime: {
      type: Number,
    },
  });

  const emit = defineEmits(['setCurrentTime']);

  // 进度条
  const centerBarRef = ref(null);

  // 拖动球
  const playPointRef = ref(null);

  //
  const barLeft = ref(0);

  // 计算播放进度长度
  const centerBarActiveWidth = computed(() => {
    if (centerBarRef.value) {
      const centerBarWidth = centerBarRef.value.clientWidth;
      const res = (props.currentTime / props.duration) * (centerBarWidth - playPointRef.value.offsetWidth);
      return isNaN(res) ? 0 : res;
    }
    return 0;
  });

  // 拖拽事件 处理器
  const onDrag = (type, e) => {
    const isH5 = type === 'h5';

    let targetClientX = null;
    const { target, clientX } = e;
    if (isH5) {
      targetClientX = e.targetTouches[0].pageX;
    } else {
      targetClientX = e.clientX;
    }

    const leftVal = targetClientX - target.offsetLeft;
    document[isH5 ? 'ontouchmove' : 'onmousemove'] = function (event) {
      const targetNewClientX = isH5 ? event.targetTouches[0].pageX : event.clientX; // 某次拖动的长度
      barLeft.value = targetNewClientX - leftVal;
      if (barLeft.value < 0) {
        barLeft.value = 0;
      } else if (barLeft.value > centerBarRef.value.offsetWidth - playPointRef.value.offsetWidth) {
        barLeft.value = centerBarRef.value.offsetWidth - playPointRef.value.offsetWidth;
      }

      e.target.style.left = barLeft.value + 'px';

      // 拖拽后，播放真实的时间也要同步到此位置
      const currentTime = (barLeft.value / (centerBarRef.value.offsetWidth - playPointRef.value.offsetWidth)) * props.duration;
      emit('setCurrentTime', currentTime);
      window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    };
  };

  // 拖拽事件-pc
  const onMousedown = (e) => {
    onDrag('pc', e);
  };

  // 拖拽事件-h5
  const onTouchstart = (e) => {
    onDrag('h5', e);
  };

  onMounted(() => {
    document.onmouseup = function () {
      document.onmousemove = null; // 弹起鼠标不做任何操作
    };

    document.ontouchend = function () {
      document.ontouchmove = null; // 弹起鼠标不做任何操作
    };
  });
</script>

<style lang="less" scoped>
  @import url(./style.less);
</style>
