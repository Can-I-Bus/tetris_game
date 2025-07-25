import { Square } from '../square';

export interface IGameDataManager {
    /**
     * 合并小格子数据
     * @param {Square[]} squareArr 需要合并的小格子数据
     */
    concatData(squareArr: Square[]): void;

    /**
     * 检查有无满行的小格子，如果有的话，就将改行小格子全部返回，如果没有的话，就返回空数组
     */
    checkFullLine(): Square[];

    /**
     * 删除小格子数据
     * @param {Square[]} squareArr 需要删除的小格子数组
     */
    removeSquares(squareArr: Square[]): void;

    /**
     * 更新小格子的数据，用于满行消除之后
     */
    updateData(): void;
}
