declare interface keyframe{
    // 此段的时长 毫秒
    duration: number;
    // 关键点名字
    color: string;
    // 关键点位置
    label: string;
}

declare interface CustomAudioParams{
    // 音频地址
    url: string;
    // 播放图标自定义
    playImg?:string;
    // 暂停图标自定义
    pauseImg?:string;
    // 进度圆球的样式
    pointImg?:string;
    // 是否开启静音工具
    mutedTool?: boolean;
    // 是否开启重置功能
    restartTool?: boolean;
    // 是否开启下载功能
    downTool?: boolean;
    // 关键帧
    keyframes?:Array<keyframe>;
    // 是否开启label显示，默认true
    showLabel?:boolean;

}
