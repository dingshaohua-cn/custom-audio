

/**
 * 格式化时间显示，补零对齐
 * eg：2:4  -->  02:04
 * @param value - 形如 h:m:s 的字符串 
 */
const formatTime = (value: string)=> {
    let time = "";
    const s = value.split(':');
    let i = 0;
    for (; i < s.length - 1; i++) {
        time += s[i].length == 1 ? ("0" + s[i]) : s[i];
        time += ":";
    }
    time += s[i].length == 1 ? ("0" + s[i]) : s[i];

    return time;
}

/**
 * 音频播放时间换算
 * @param  value - 音频当前播放时间，单位秒
 */
export const transTime = (value: number)=> {
    let time = "";
    const h = parseInt(String(value / 3600));
    value %= 3600;
    const m = parseInt(String(value / 60));
    const s = parseInt(String(value % 60));
    if (h > 0) {
        time = formatTime(h + ":" + m + ":" + s);
    } else {
        time = formatTime(m + ":" + s);
    }
    return time;
}

/*
 * @description 获取默认样式
 * @param 
 * @return 
 */
export const getComputedStyle = (obj: any, style: string)=> {
    if(obj.currentStyle){
        return obj.currentStyle[style].replace('px', '') //ie下获取样式
    }else {
        return  (document as any).defaultView.getComputedStyle(obj,null)[style].replace('px', '')//谷歌，火狐下获取默认样式
    }
}