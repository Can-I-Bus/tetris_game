import { IShape } from './interfaces/IShape';
import { Square } from './square';
import { Point } from './types';
import { ShapeType } from './enums/shape.enum';
import { getRandomItem } from '../utils';
import { SQUARE_TYPES } from '../config/shape.config';
import { COLORS } from '../config/shape.config';
import { ShapeUtils } from '../utils/shapeUtils';
import { GameDataManager } from './manager/gameDataManager';
import { SourceManager } from './manager/sourceManager';
import GAME_CONFIG from '../config/game.config';

export class Shape implements IShape {
    protected _centerPoint: Point = { x: 0, y: 0 };
    protected _shapeArr: [number, number][] = []; // 基础形状坐标
    protected _gameDataManager: GameDataManager | null = null;
    private _squares: Square[] = [];
    private _shapeType: ShapeType;
    private _ctx: CanvasRenderingContext2D | null = null;
    private _color: string = '';

    constructor(centerPoint: Point, ctx: CanvasRenderingContext2D, shapeType: ShapeType, color?: string) {
        // 使用 SourceManager 获取共享的 GameDataManager
        this._gameDataManager = SourceManager.isInitialized() ? SourceManager.getGameDataManager() : new GameDataManager();
        this._ctx = ctx;
        this._shapeType = shapeType;

        // 获取基础形状的第一个状态作为原始形状
        SQUARE_TYPES.forEach((i) => {
            return Object.entries(i).forEach((j) => {
                if (j[0] === this._shapeType) {
                    this._shapeArr = j[1];
                }
            });
        });
        this._color = color || getRandomItem(COLORS);

        this.setCenterPoint(centerPoint);
    }

    getSquares() {
        return [...this._squares];
    }

    getShapeType(): ShapeType {
        return this._shapeType;
    }

    getColor(): string {
        return this._color;
    }

    setCenterPoint(point: Point): boolean {
        if (!this._gameDataManager) return false;
        const targetPointArr = ShapeUtils.vPointToRealPoint(this._shapeArr, point);
        const exist = this._gameDataManager.getExits();

        if (ShapeUtils.isInPreview(point)) {
            this._centerPoint = point;
            this.remove();
            this.draw();
            return true;
        } else {
            if (!ShapeUtils.canMove(targetPointArr, exist)) {
                return false;
            }
            this._centerPoint = point;
            this.remove();
            this.draw();
            return true;
        }
    }

    getCenterPoint(): Point {
        return { ...this._centerPoint }; // 返回副本，避免引用问题
    }

    rotate(): void {
        if (!this._gameDataManager) return;
        const nextRotateArr = this._shapeArr.map(([x, y]) => [-y, x] as [number, number]);
        const nextPointArr = ShapeUtils.vPointToRealPoint(nextRotateArr, this._centerPoint);
        const exist = this._gameDataManager.getExits();
        if (!ShapeUtils.canMove(nextPointArr, exist)) {
            return;
        }
        this._shapeArr = nextRotateArr;
        this.remove();
        this.draw();
    }

    hardDrop(): void {
        if (!this._gameDataManager) return;
        while (true) {
            const exist = this._gameDataManager.getExits();
            const nextY = this._centerPoint.y + GAME_CONFIG.squareSize;
            const nextPoint = { x: this._centerPoint.x, y: nextY };
            const nextPointArr = ShapeUtils.vPointToRealPoint(this._shapeArr, nextPoint);
            if (ShapeUtils.canMove(nextPointArr, exist)) {
                this._centerPoint = nextPoint;
                this.remove();
                this.draw();
            } else {
                break;
            }
        }
    }

    remove(): void {
        this._squares.forEach((i) => {
            i.remove();
        });
        this._squares = [];
    }

    protected draw() {
        const realPointArr = ShapeUtils.vPointToRealPoint(this._shapeArr, this._centerPoint);

        realPointArr.forEach((i) => {
            const square = new Square(this._ctx as CanvasRenderingContext2D, this._color);
            square.setPoint({ x: i[0], y: i[1] });
            this._squares.push(square);
        });
    }
}

class ClockShape extends Shape {
    private _flag: boolean = false;
    constructor(centerPoint: Point, ctx: CanvasRenderingContext2D, shapeType: ShapeType, color?: string) {
        super(centerPoint, ctx, shapeType, color);
    }
    rotate(): void {
        if (!this._gameDataManager) return;
        let nextRotateArr;
        if (this._flag) {
            // 逆向旋转
            nextRotateArr = this._shapeArr.map(([x, y]) => [-y, x] as [number, number]);
        } else {
            // 正向旋转
            nextRotateArr = this._shapeArr.map(([x, y]) => [y, -x] as [number, number]);
        }

        // 计算旋转后的真实坐标
        const nextRealPointArr = ShapeUtils.vPointToRealPoint(nextRotateArr, this._centerPoint);
        const exist = this._gameDataManager.getExits();

        // 使用统一的canMove检查逻辑
        if (!ShapeUtils.canMove(nextRealPointArr, exist)) {
            return;
        }

        this._shapeArr = nextRotateArr;
        this._flag = !this._flag; // 切换状态
        this.remove();
        this.draw();
    }
}

class TShape extends Shape {
    constructor(centerPoint: Point, ctx: CanvasRenderingContext2D, color?: string) {
        super(centerPoint, ctx, ShapeType.T, color);
    }
}

class LShape extends Shape {
    constructor(centerPoint: Point, ctx: CanvasRenderingContext2D, color?: string) {
        super(centerPoint, ctx, ShapeType.L, color);
    }
}

class SShape extends ClockShape {
    constructor(centerPoint: Point, ctx: CanvasRenderingContext2D, color?: string) {
        super(centerPoint, ctx, ShapeType.S, color);
    }
}

class OShape extends Shape {
    constructor(centerPoint: Point, ctx: CanvasRenderingContext2D, color?: string) {
        super(centerPoint, ctx, ShapeType.O, color);
    }

    rotate(): void {
        return;
    }
}

class LineShape extends ClockShape {
    constructor(centerPoint: Point, ctx: CanvasRenderingContext2D, color?: string) {
        super(centerPoint, ctx, ShapeType.I, color);
    }
}

const shapeArr = [TShape, LShape, SShape, LineShape, OShape];

const shapeTypeMap = {
    [ShapeType.T]: TShape,
    [ShapeType.L]: LShape,
    [ShapeType.S]: SShape,
    [ShapeType.I]: LineShape,
    [ShapeType.O]: OShape,
};

export const createRandomShape = (centerPoint: Point, ctx: CanvasRenderingContext2D, color?: string): Shape => {
    const shape = getRandomItem(shapeArr);
    return new shape(centerPoint, ctx, color);
};

export const createAssignedShape = (centerPoint: Point, ctx: CanvasRenderingContext2D, shapeType: ShapeType, color?: string): Shape => {
    const shape = shapeTypeMap[shapeType];
    if (!shape) {
        throw new Error('shapeType不存在');
    }
    return new shape(centerPoint, ctx, color);
};
