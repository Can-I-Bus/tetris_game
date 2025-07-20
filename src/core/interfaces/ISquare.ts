import { Point } from '../types';

export interface ISquare {
    /**
     * 设置新的x和y坐标
     * @param {Point} point 新x,y坐标
     */
    setPoint(point: Point): void;

    /**
     * 移除小方块
     */
    remove(): void;
}
