<template>
  <div class="custom-audio">
    <audio :src="params.url"
           ref="firsthandAudio"
           @canplay="audioCanplay"
           @ended="audioEnd"
           @timeupdate="audioTimeUpdate"
    />
    <div class="audio-controls"
         ref="playControls">
      <!-- 播放控制按钮 -->
      <div class="play-control"
           ref="playControl">
        <img @click.stop="playControlClick"
             :src="audioSrc"/>
      </div>
      <!-- 播放条 -->
      <div class="play-bar"
           ref="playBar">
        <div class="progress">
          <div class="progress-actives"
               ref="progressActives">
            <div class="progress-active"
                 v-for="(item, index) in params.keyframes"
                 :key="index"
                 :style="{
                backgroundColor : item.color,
                width : item.duration === - 1 ? '100%' : computeDurationWidth(item.duration) + '%',
              }"
            >
              <div class="progress-label">{{ item.label }}</div>
            </div>
          </div>
          <div class="play-point-bar"
               :style="{width : playedPostion + 'px'}"/>
          <div class="play-point"
               ref="playPoint"
               @mousedown="pointMousedown"
               v-if="params.pointImg.indexOf('#') > - 1"
               :style="{ left : playedPostion + 'px', backgroundColor : params.pointImg}"
          />
          <div class="play-point"
               ref="playPoint"
               @mousedown="pointMousedown" v-else
               :style="{ left : playedPostion + 'px'}">
            <img :src="params.pointImg">
          </div>
        </div>
      </div>
      <!-- 播放器工具 -->
      <div class="play-tools"
           ref="playTools">
        <div class="audio-time">{{ audioTime }}</div>
        <div class="audio-muted"
             v-if="params.mutedTool"
             @click="audioMuted">
          <img :src="require('@/assets/no-sound.png')"
               v-if="audioMutedStatus"/>
          <img :src="require('@/assets/sound.png')" v-else/>
        </div>
        <img :src="require('@/assets/restart.png')"
             v-if="params.restartTool"
             @click="audioRestart"/>
        <a :href="params.url + '?response-content-type=application/octet-stream'" download
           v-if="params.downTool">
          <img :src="require('@/assets/down.png')"/>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {transTime} from './helper';
  import './style.less';
  import {CustomAudioParams} from './type';

  const defaultConfig: any = {
    url: '',
    pointImg: '#649fec',
    mutedTool: true,
    restartTool: true,
    downTool: true,
    keyframes: [
      {
        duration: -1,
        color: '#c1c2c3',
        label: ''
      }
    ]
  };

  @Component
  export default class CustomAudio extends Vue {
    @Prop()
    private config: CustomAudioParams|any;

    // 音频文件总时长
    private audioDuration: number = 0;

    // 音频文件播放状态
    private audioStatus = 'pause';

    // 音频文件播放时常
    private audioCurrentTime = 0;

    // 静音
    private audioMutedStatus = false;

    // 播放条宽度
    private playBarWidth = 0;

    // 滚动条拖动相关
    private pointAttr = {
      x: 0,
      y: 0,
      l: 0,
      t: 0,
      isDown: false
    };

    /*
     * @description 当前音频文件加载完后的回调函数
     * @param e当前音频文件组件对象
     */
    private audioCanplay(e: any) {
      const firsthandAudio: HTMLAudioElement = e.target;
      // 同步音频文件总时长实力属性
      this.audioDuration = firsthandAudio.duration;
      this.$nextTick(() => {
        this.computePlayBarWidth();
      });
    }

    /*
     * @description 播放完后的回调
     * @param
     * @return
     */
    private audioEnd(e: any) {
      //监听播放播放结束后 重置播放状态为初始状态
      this.audioStatus = 'pause';
    }

    /*
     * @description 播放更新的回调
     * @param
     * @return
     */
    private audioTimeUpdate(e: any) {
      const firsthandAudio: HTMLAudioElement = e.target;
      // 同步音频文件总时长实力属性
      this.audioCurrentTime = firsthandAudio.currentTime;
    }

    /**
     * 静音
     */
    private audioMuted() {
      this.audioMutedStatus = !this.audioMutedStatus;
      const firsthandAudio = this.$refs.firsthandAudio as HTMLAudioElement;
      firsthandAudio.muted = this.audioMutedStatus;

    }

    /**
     * 用于xxx
     * @param {string} uid - 用户id
     * @return {User}一个用户
     */
    private audioRestart() {
      const firsthandAudio = this.$refs.firsthandAudio as HTMLAudioElement;
      firsthandAudio.pause();
      firsthandAudio.currentTime = 0.0;
      this.audioStatus = 'pause';
    }

    /*
     * @description 模拟播放按钮的点击
     * @param
     * @return
     */
    private playControlClick() {
      //获取原始audio对象
      const firsthandAudio = this.$refs.firsthandAudio as HTMLAudioElement;
      if (this.audioStatus == 'playing') {
        //当前组件正在播放 则暂停播放
        this.audioStatus = 'pause';
        firsthandAudio.pause();
      } else {
        //如果没有播放状态 则开始播放
        this.audioStatus = 'playing';
        firsthandAudio.play();
      }
    }

    /*
     * @description 用于动态获取当前音频组件播放图片
     * @return 音频组件按钮图片
     */
    private get audioSrc() {
      const playImg = this.params.playImg ? this.params.playImg : require('@/assets/play.png');
      const pauseImg = this.params.pauseImg ? this.params.pauseImg : require('@/assets/pause.png');
      const result =
          this.audioStatus === 'pause'
              ? playImg
              : pauseImg;
      return result;
    }

    // 播放时间
    private get audioTime() {
      const audioCurrentTime = Math.round(this.audioCurrentTime);
      return `${transTime(audioCurrentTime)} / ${transTime(this.audioDuration)}`;
    }

    // 播放进度
    private get playedPostion() {
      const result =
          (this.audioCurrentTime / this.audioDuration) * this.playBarWidth;
      return result;
    }

    /*
     * @description 屏幕尺寸变化，动态计算播放条宽度
     * @param
     * @return
     */
    private computePlayBarWidth() {
      const playControls = this.$refs.playControls as HTMLDivElement;
      const playControl = this.$refs.playControl as HTMLDivElement;
      const playBar = this.$refs.playBar as HTMLDivElement;
      const playTools = this.$refs.playTools as HTMLDivElement;
      if (playControls && playControl && playBar && playTools) {
        const playBarWidth =
            playControls.clientWidth -
            playControl.clientWidth -
            playTools.clientWidth;
        playBar.style.width = playBarWidth + 'px';
        this.playBarWidth = playBarWidth;
      }
    }

    /*
     * @description 计算每个关键段的长度
     * @param
     * @return
     */
    private computeDurationWidth(duration: number) {
      if (this.audioDuration > 0) {
        const result = (duration / (this.audioDuration * 1000)) * 100;
        return result;
      }
    }

    private pointMousedown(e: any) {
      const playPoint = this.$refs.playPoint as HTMLDivElement;
      //获取x坐标和y坐标
      this.pointAttr.x = e.clientX;
      //获取左部和顶部的偏移量
      this.pointAttr.l = playPoint.offsetLeft;
      //开关打开
      this.pointAttr.isDown = true;
    }

    private pointMousemove(e: any) {
      if (this.pointAttr.isDown == false) {
        return;
      }
      const firsthandAudio = this.$refs.firsthandAudio as HTMLAudioElement;
      //获取x和计算移动后的左偏移量
      var nx = e.clientX;
      var nl = nx - (this.pointAttr.x - this.pointAttr.l);
      const playPoint = this.$refs.playPoint as HTMLDivElement;
      const leftNum = Number(playPoint.style.left.replace('px', ''));
      // 小于等于0可以向右拖动，大于宽度的可以回退拖动
      const toRight = nl > leftNum;
      const canMove =
          (leftNum < this.playBarWidth && toRight) || (leftNum > 0 && !toRight);
      if (canMove) {
        firsthandAudio.currentTime =
            (nl / this.playBarWidth) * this.audioDuration;
      }
    }

    private get params(): CustomAudioParams {
      for (const k in this.config){
        if(this.config[k]){
          defaultConfig[k] = this.config[k]
        }
      }
      return defaultConfig;
    }

    private ponintMouseup() {
      this.pointAttr.isDown = false; //开关关闭
    }

    private mounted() {
      this.computePlayBarWidth();
      window.addEventListener('resize', this.computePlayBarWidth);
      document.addEventListener('mousemove', this.pointMousemove);
      document.addEventListener('mouseup', this.ponintMouseup);
    }
  }
</script>
