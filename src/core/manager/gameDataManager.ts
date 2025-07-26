import GAME_CONFIG from '../../config/game.config';
import { IGameDataManager } from '../interfaces/IGameDataManager';
import { Square } from '../square';
const { gameColumnNum, gameRowNum, squareSize, offset } = GAME_CONFIG;

export class GameDataManager implements IGameDataManager {
    private _gameData: Square[] = [];

    /**
     * 根据目前已经存在的小方块返回每个小方块的xy坐标
     * @returns {[number,number][]}
     */
    getExits(): [number, number][] {
        return this._gameData.reduce((acc, curr) => {
            const { x, y } = curr.getPoint();
            (acc as unknown as [number, number][]).push([x, y]);
            return acc;
        }, []);
    }

    /**
     * 删除小格子数据
     * @param {Square[]} squareArr 需要删除的小格子数据
     */
    removeSquares(squareArr: Square[]): void {
        this._gameData = this._gameData.filter((square) => !squareArr.includes(square));
    }

    /**
     * 往已经存在小方块数组中添加新触底的小方块
     * @param {Square[]} squareArr 需要合并的数组
     */
    concatData(squareArr: Square[]): void {
        this._gameData = this._gameData.concat(squareArr);
    }

    /**
     * 返回满行的小格子
     * @returns {Square[]} 如果存在满行的话，就将满行的数据返回，如不存在，就返回空数组
     */
    checkFullLine(): Square[] {
        let res = [];
        const processedRows = new Set(); // 记录已处理的行

        for (let i = 0; i < this._gameData.length; i++) {
            const y = this._gameData[i].getPoint().y;

            // 如果这一行已经处理过，跳过
            if (processedRows.has(y)) {
                continue;
            }

            const same = this._gameData.filter((j) => j.getPoint().y === y);
            if (same.length === gameColumnNum) {
                res.push(...same);
                processedRows.add(y); // 标记这一行已处理
            }
        }
        return res;
    }

    /**
     * 检查游戏是否结束
     */
    checkIsgameOver(): boolean {
        const set = new Set();
        this._gameData.forEach((i) => {
            const { y } = i.getPoint();
            if (!set.has(y)) {
                set.add(y);
            }
        });
        return set.size === gameRowNum;
    }

    /**
     * 更新小方块数据
     */
    updateData(): void {
        // 如果没有方块，直接返回
        if (this._gameData.length === 0) return;

        // 按行分组所有方块，计算每行的 y 坐标
        const rowGroups: { [key: number]: Square[] } = {};
        this._gameData.forEach((square) => {
            const y = square.getPoint().y;
            if (!rowGroups[y]) {
                rowGroups[y] = [];
            }
            rowGroups[y].push(square);
        });

        // 获取所有存在的行的 y 坐标，并排序（从上到下）
        const existingRows = Object.keys(rowGroups)
            .map((y) => parseInt(y))
            .sort((a, b) => a - b);

        // 从底部开始，为每一行分配新的 y 坐标
        const bottomY = offset + (gameRowNum - 1) * squareSize;
        let currentTargetY = bottomY;

        // 从底部往上遍历现有的行
        for (let i = existingRows.length - 1; i >= 0; i--) {
            const currentY = existingRows[i];
            const squaresInRow = rowGroups[currentY];

            // 如果当前行的位置不等于目标位置，需要移动
            if (currentY !== currentTargetY) {
                squaresInRow.forEach((square) => {
                    const point = square.getPoint();
                    square.setPoint({ x: point.x, y: currentTargetY });
                });
            }

            // 准备下一行的目标位置（向上一行）
            currentTargetY -= squareSize;
        }
    }
}
