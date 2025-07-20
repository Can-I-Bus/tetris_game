import { IShape } from './interfaces/IShape';
import { Square } from './square';
import { Point } from './types';
import { ShapeType } from './enums/shape.enum';
import { getRandomItem } from '../utils';
import { SQUARE_TYPES } from '../config/shape.config';
import { RenderUtils } from '../utils/renderUtils';
import { COLORS } from '../config/shape.config';
import { getThemeColor } from '../utils';
import GAME_CONFIG from '../config/game.config';
const { squareSize } = GAME_CONFIG;

export class Shape implements IShape {
    private _squares: Square[] | [] = [];
    private _centerPoint: Point = { x: 0, y: 0 };
    private _shapeType: ShapeType | null = null;
    private _shapeArr: [number, number][] | [] = [];
    private _ctx: CanvasRenderingContext2D | null = null;
    private _renderUtils: RenderUtils | null = null;

    constructor(centerPoint: Point, ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
        this._renderUtils = new RenderUtils(this._ctx);
        this._shapeType = getRandomItem(Object.keys(ShapeType));
        SQUARE_TYPES.forEach((i) => {
            return Object.entries(i).forEach((j) => {
                if (j[0] === this._shapeType) {
                    this._shapeArr = j[1];
                }
            });
        });
        this.setCenterPoint(centerPoint);
    }

    setCenterPoint(point: Point): void {
        this._centerPoint = point;
        this.remove();
        this.draw();
        console.log('shapeType', this._shapeType);
        console.log('shapeArr', this._shapeArr);
    }

    getCenterPoint(): Point | {} {
        return this._centerPoint;
    }

    rotate(): void {}

    private draw() {
        const realPointArr = this.vPointToRealPoint();
        const color = getRandomItem(COLORS);
        realPointArr.forEach((i) => {
            this._renderUtils?.drawRect({ x: i[0], y: i[1], w: squareSize, h: squareSize, fillColor: color, stokeColor: getThemeColor('drawLineColor') });
        });
    }

    private vPointToRealPoint(): [number, number][] | [] {
        // 深拷贝，避免修改原始数组
        const shapeArr = this._shapeArr.map((point) => [point[0], point[1]] as [number, number]);

        return shapeArr.map((i) => {
            if (i[0] === 0 && i[1] === 0) {
                i[0] = this._centerPoint.x;
                i[1] = this._centerPoint.y;
                return i;
            } else {
                i[0] = this._centerPoint.x + i[0] * squareSize;
                i[1] = this._centerPoint.y + i[1] * squareSize;
                return i;
            }
        });
    }

    private remove(squareArr?: Square[]): void {
        if (!squareArr) {
            this._squares.forEach((i) => {
                i.remove();
            });
        } else {
            squareArr.forEach((i) => {
                i.remove();
            });
        }
    }
}
