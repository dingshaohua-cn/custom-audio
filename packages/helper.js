/**
 * 格式化时间显示，补零对齐
 * eg：2:4  -->  02:04
 * @param value - 形如 h:m:s 的字符串
 */
const formatTime = (value) => {
  let time = '';
  const s = value.split(':');
  let i = 0;
  for (; i < s.length - 1; i++) {
    time += s[i].length == 1 ? '0' + s[i] : s[i];
    time += ':';
  }
  time += s[i].length == 1 ? '0' + s[i] : s[i];

  return time;
};

/**
 * 音频播放时间换算
 * @param  value - 音频当前播放时间，单位秒
 */
export const transTime = (value) => {
  let time = '';
  const h = parseInt(String(value / 3600));
  value %= 3600;
  const m = parseInt(String(value / 60));
  const s = parseInt(String(value % 60));
  if (h > 0) {
    time = formatTime(h + ':' + m + ':' + s);
  } else {
    time = formatTime(m + ':' + s);
  }
  return time;
};

/**
 * 下载后端返回的二进制
 * @param  src - 音频地址
 */
export const downBlob = async (src) => {
  const blob = await fetch(src).then((res) => res.blob());
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.target = '_blank';
  link.href = url;
  link.setAttribute('download', '');
  const customAudio = document.querySelector('.custom-audio');
  customAudio.appendChild(link);
  link.click();
  customAudio.removeChild(link);
};

/**
 * 下载url
 * @param  src - 音频地址
 */
export const downUrl = async (src) => {
  const link = document.createElement('a');
  link.style.display = 'none';
  link.target = '_blank';
  link.href = src;
  link.setAttribute('download', '');
  const customAudio = document.querySelector('.custom-audio');
  customAudio.appendChild(link);
  link.click();
  customAudio.removeChild(link);
};
