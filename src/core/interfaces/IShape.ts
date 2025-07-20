import { Point } from '../types';

export interface IShape {
    /**
     * 设置新的x和y坐标
     * @param {Point} point 新x,y坐标
     */
    setCenterPoint(point: Point): void;

    /**
     * 获取中心点的xy坐标
     */
    getCenterPoint(): Point | {};

    /**
     * 旋转方法
     */
    rotate(): void;
}
