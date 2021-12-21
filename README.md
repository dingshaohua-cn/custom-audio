# custom-audio

Only vue3 is supported   
Support for mobile platform

## Install

```shell
yarn add custom-audio
```

## Usage

```javascript
import CustomAudio from 'custom-audio';

createApp(App).use(CustomAudio).mount('#app');
```

```html
<template>
  <custom-audio :src="config.src" :downBlob="true" />
</template>

<script setup>
  const config = {
    src: 'xxx.mp3',
  };
</script>
```

## Options

| Option   | Description                                           |
| -------- | ----------------------------------------------------- |
| src      | Playback address                                      |
| downBlob | use a download attribute/use fetch(html5 api) methods |

## Preview

https://dshvv.github.io/custom-audio/  
![preview](https://github.com/dshvv/custom-audio/blob/main/preview.gif)