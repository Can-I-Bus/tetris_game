import { ISquare } from './interfaces/ISquare';
import { Point } from './types';
import { getThemeColor } from '../utils';
import { RenderUtils } from '../utils/renderUtils';
import GAME_CONFIG from '../config/game.config';
const { squareSize } = GAME_CONFIG;

export class Square implements ISquare {
    private _ctx: CanvasRenderingContext2D | null = null;
    private _point: Point = { x: 0, y: 0 };
    private _color: string = '';
    private _renderUtils: RenderUtils | null = null;

    constructor(ctx: CanvasRenderingContext2D, color: string) {
        this._ctx = ctx;
        this._color = color;
        this._renderUtils = new RenderUtils(this._ctx);
    }

    setPoint(point: Point) {
        if (Object.keys(this._point).length > 0) {
            this.remove();
        }
        this._point = point;
        this.draw();
    }

    remove(): void {
        if (!this._ctx || (this._point.x === 0 && this._point.y === 0)) return;
        this._ctx.clearRect(this._point.x, this._point.y, squareSize, squareSize);
        this._renderUtils?.drawRect({
            x: this._point.x,
            y: this._point.y,
            w: squareSize,
            h: squareSize,
            stokeColor: getThemeColor('drawLineColor'),
            fillColor: getThemeColor('mainSectionBgc'),
        });
    }

    private draw(): void {
        if (!this._ctx || Object.keys(this._point).length === 0) return;
        this._renderUtils?.drawRect({
            x: this._point.x,
            y: this._point.y,
            w: squareSize,
            h: squareSize,
            stokeColor: getThemeColor('drawLineColor'),
            fillColor: this._color,
        });
    }
}
