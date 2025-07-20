import { ISquare } from './interfaces/ISquare';
import { Point } from './types';
import { COLORS } from '../config/shape.config';
import { getRandomItem } from '../utils';
import GAME_CONFIG from '../config/game.config';
const { squareSize } = GAME_CONFIG;

export class Square implements ISquare {
    private _ctx: CanvasRenderingContext2D | null = null;
    private _point: Point | {} = {};

    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
    }

    setPoint(point: Point) {
        if (Object.keys(this._point).length > 0) {
            this.remove();
        }
        this._point = point;
        this.draw();
    }

    remove(): void {
        if (!this._ctx || Object.keys(this._point).length === 0) return;
        const { x, y } = this._point as Point;
        this._ctx.clearRect(x, y, squareSize, squareSize);
    }

    private draw(): void {
        if (!this._ctx || Object.keys(this._point).length === 0) return;
        const { x, y } = this._point as Point;
        const bgColor = getRandomItem(COLORS);
        this._ctx.save();
        this._ctx?.beginPath();
        this._ctx.moveTo(x, y);
        this._ctx.rect(x, y, squareSize, squareSize);
        this._ctx.fillStyle = bgColor;
        this._ctx.fill();
        this._ctx.restore();
    }
}
