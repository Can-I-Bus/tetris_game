import { IShape } from './interfaces/IShape';
import { Square } from './square';
import { Point } from './types';
import { ShapeType } from './enums/shape.enum';
import { getRandomItem } from '../utils';
import { SQUARE_TYPES } from '../config/shape.config';
import { COLORS } from '../config/shape.config';
import GAME_CONFIG from '../config/game.config';
const { squareSize, offset, gameColumnNum, gameRowNum } = GAME_CONFIG;

export class Shape implements IShape {
    private _squares: Square[] = [];
    private _centerPoint: Point = { x: 0, y: 0 };
    private _shapeType: ShapeType | null = null;
    private _shapeArr: [number, number][] = []; // 基础形状坐标
    private _ctx: CanvasRenderingContext2D | null = null;
    private _color: string = '';

    constructor(centerPoint: Point, ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
        this._shapeType = getRandomItem(Object.keys(ShapeType));

        // 获取基础形状的第一个状态作为原始形状
        SQUARE_TYPES.forEach((i) => {
            return Object.entries(i).forEach((j) => {
                if (j[0] === this._shapeType) {
                    this._shapeArr = j[1][0];
                }
            });
        });
        this._color = getRandomItem(COLORS);
        this.setCenterPoint(centerPoint);
    }

    setCenterPoint(point: Point): void {
        if (!this.isInBoard(this._shapeArr, point)) {
            return;
        }
        this._centerPoint = point;
        this.remove();
        this.draw();
    }

    getCenterPoint(): Point | {} {
        return { ...this._centerPoint }; // 返回副本，避免引用问题
    }

    rotate(): void {
        // O形状（正方形）不需要旋转
        if (this._shapeType === ShapeType.O) {
            return;
        }
        const nextRotateArr = this._shapeArr.map(([x, y]) => [-y, x] as [number, number]);
        if (!this.isInBoard(nextRotateArr)) {
            return;
        }

        this._shapeArr = nextRotateArr;
        this.remove();
        this.draw();
    }

    private draw() {
        const realPointArr = this.vPointToRealPoint();

        realPointArr.forEach((i) => {
            const square = new Square(this._ctx as CanvasRenderingContext2D, this._color);
            square.setPoint({ x: i[0], y: i[1] });
            this._squares.push(square);
        });
    }

    private isInBoard(arr: [number, number][], point: Point = this._centerPoint): boolean {
        const realPointArr = this.vPointToRealPoint(arr, point);
        const boardWidth = offset + gameColumnNum * squareSize;
        const boardHeight = offset + gameRowNum * squareSize;
        const has = realPointArr.some((i) => {
            return i[0] < offset || i[1] < offset || i[0] >= boardWidth || i[1] >= boardHeight;
        });
        if (has) {
            return false;
        }
        return true;
    }

    private vPointToRealPoint(vPointArr: [number, number][] = this._shapeArr, point: Point = this._centerPoint): [number, number][] | [] {
        // 深拷贝，避免修改原始数组
        const shapeArr = vPointArr.map((point) => [point[0], point[1]] as [number, number]);

        return shapeArr.map((i) => {
            if (i[0] === 0 && i[1] === 0) {
                i[0] = point.x;
                i[1] = point.y;
                return i;
            } else {
                i[0] = point.x + i[0] * squareSize;
                i[1] = point.y + i[1] * squareSize;
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
