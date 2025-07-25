import { GameDataManager } from '../manager/gameDataManager';

export interface ISourceManager {
    /**
     * 获取canvas
     */

    getCanvas(): HTMLCanvasElement;
    /**
     * 获取ctx
     */

    getCtx(): CanvasRenderingContext2D;
    /**
     * 获取游戏数据管理器
     */

    getGameDataManager(): GameDataManager;
}
