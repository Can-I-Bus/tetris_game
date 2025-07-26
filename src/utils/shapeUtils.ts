import GAME_CONFIG from '../config/game.config';
import { Point } from '../core/types';
const { squareSize, offset, gameColumnNum, gameRowNum, nextShapeSectionColumnNum, nextShapeSectionRowNum } = GAME_CONFIG;

export class ShapeUtils {
    /**
     * 判断是否可以移动到目标位置
     * @param {[number, number][]} targetPointArr 目标位置的真实坐标数组
     * @param {[number, number][]} exist 已经存在的真实坐标数组
     * @returns {boolean}
     */
    static canMove(targetPointArr: [number, number][], exist: [number, number][]): boolean {
        const boardWidth = offset + gameColumnNum * squareSize;
        const boardHeight = offset + gameRowNum * squareSize;

        // 检查目标位置是否超出边界
        const hitMargin = targetPointArr.some((pos) => {
            return pos[0] < offset || pos[0] >= boardWidth || pos[1] > boardHeight - squareSize;
        });

        // 检查目标位置是否与已存在的方块重叠
        const hitExisting = exist.some((existPoint) => {
            return targetPointArr.some((targetPoint) => {
                return targetPoint[0] === existPoint[0] && targetPoint[1] === existPoint[1];
            });
        });

        return !hitMargin && !hitExisting;
    }

    /**
     * 根据真实中心点坐标，将图形的虚拟坐标数组转换为真实坐标数组
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

    /**
     * 判断坐标是否在主棋盘
     * @param {Point} point {真实坐标}
     * @returns 判断坐标是否在主棋盘
     */
    static isInMainBoard(point: Point): boolean {
        const boardLeft = offset;
        const boardRight = offset + gameColumnNum * squareSize;
        const boardTop = offset;
        const boardBottom = offset + gameRowNum * squareSize;
        // 是否在主棋盘
        return point.x >= boardLeft && point.x < boardRight && point.y >= boardTop && point.y < boardBottom;
    }

    /**
     * 判断坐标是否在预览位置
     * @param {Point} point {真实坐标}
     * @returns 判断坐标是否在预览位置
     */
    static isInPreview(point: Point): boolean {
        const previewLeft = offset + squareSize * gameColumnNum + offset;
        const previewRight = previewLeft + nextShapeSectionColumnNum * squareSize;
        const previewTop = offset;
        const previewBottom = offset + nextShapeSectionRowNum * squareSize;
        // 是否在预览棋盘
        return point.x >= previewLeft && point.x <= previewRight && point.y >= previewTop && point.y <= previewBottom;
    }

    /**
     * 判断坐标是否在有效位置
     * @param {Point} point {真实坐标}
     * @returns 判断坐标是否在有效位置
     */
    static isInBounds(point: Point): boolean {
        return this.isInMainBoard(point) || this.isInPreview(point);
    }

    /**
     * 根据当前的真实坐标数组得到下一次将要移动的真实坐标数组
     * @param {[number,number][]} currRealPointArr 当前形状的真实坐标数组
     * @returns 当前图形下一次移动的真实坐标数组
     */
    static getRealNextPointArr(currRealPointArr: [number, number][]): [number, number][] {
        return currRealPointArr.reduce((acc, curr) => {
            (acc as [number, number][]).push([curr[0], (curr[1] += squareSize)]);
            return acc;
        }, []);
    }
}
