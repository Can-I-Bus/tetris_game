export type Point = {
    x: number;
    y: number;
};

export type GameType = {
    canvasEl: HTMLCanvasElement;
    onGameOver?: Function;
    onGamePause?: Function;
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
