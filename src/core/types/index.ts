export type Point = {
    x: number;
    y: number;
};

export type GameType = {
    canvasEl: HTMLCanvasElement;
    onGameOver?: Function;
    onGamePause?: Function;
};

export type DrawLineType = {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    color: string;
    lineWidth: number;
};

export type DrawTextType = {
    x: number;
    y: number;
    content: string;
    color?: string;
    fz: string;
    textAlign?: CanvasTextAlign;
    textBaseline?: CanvasTextBaseline;
};

export type DrawReduisRectType = {
    x: number;
    y: number;
    w: number;
    h: number;
    lineColor: string;
    lineWidth: number;
    radius: number;
    fillColor?: string;
};

export type DrawRectType = {
    x: number;
    y: number;
    w: number;
    h: number;
    lineWidth?: number;
    stokeColor?: string;
    fillColor?: string;
};

export type DrawImgType = {
    image: HTMLImageElement;
    dx: number;
    dy: number;
    dWidth: number;
    dHeight: number;
};

export type ActionButton = {
    name: string;
    imageSrc: string;
    x: number;
    y: number;
    width: number;
    height: number;
    imageSize: number;
    imageOffsetX: number;
    imageOffsetY: number;
};
