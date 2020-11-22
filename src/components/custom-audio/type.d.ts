interface keyframe{
    // 此段的时长 毫秒
    duration: number;
    // 关键点名字
    color: string;
    // 关键点位置
    label: string;
}

export interface CustomAudioParams{
    url: string;
    keyframes?:Array<keyframe>;
}