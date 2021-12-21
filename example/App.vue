<template>
  <div class="app">
    <div class="box"> 
      <custom-audio :src="config.src" :downBlob="true" />
    </div>
    
  </div>
</template>

<script setup>
const config = {
  src: 'https://dshvv-1300009960.cos.ap-beijing.myqcloud.com/aegis/xby.mp3'
}
</script>
<style lang="less">
html,body{
  margin: 0;
  padding: 0;
  background-color: pink;
}
.app{
  padding-top: 100px;
  .box{
    width: 80%;
  }
}
</style>
