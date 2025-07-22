import GAME_CONFIG from '../config/game.config';
import { Point } from '../core/types';
const { squareSize, offset, gameColumnNum, gameRowNum } = GAME_CONFIG;

export class ShapeUtils {
    /**
     * 判断方块是否可以移动
     * @param realPointArr 图形的坐标数组{真实坐标}
     * @returns 是否可以移动
     */
    static canMove(realPointArr: [number, number][]): boolean {
        console.log(realPointArr);
        const boardWidth = offset + gameColumnNum * squareSize;
        const boardHeight = offset + gameRowNum * squareSize;
        return !realPointArr.some((i) => {
            return i[0] < offset || i[1] < offset || i[0] >= boardWidth || i[1] >= boardHeight;
        });
    }

    /**
     * 将虚拟坐标转换为真实坐标
     * @param vPointArr 虚拟坐标
     * @param point 中心点{真实坐标}
     * @returns 真实坐标数组
     */
    static vPointToRealPoint(vPointArr: [number, number][], point: Point): [number, number][] {
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
}
