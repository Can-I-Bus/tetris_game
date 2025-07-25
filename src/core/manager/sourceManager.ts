import { GameDataManager } from './gameDataManager';

export class SourceManager {
    private static _canvas: HTMLCanvasElement;
    private static _ctx: CanvasRenderingContext2D;
    private static _gameDataManager: GameDataManager;
    private static _initialized = false;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        // 防止重复初始化
        if (SourceManager._initialized) {
            console.warn('SourceManager 已经初始化，跳过重复设置');
            return;
        }

        SourceManager._canvas = canvas;
        SourceManager._ctx = ctx;
        SourceManager._gameDataManager = new GameDataManager();
        SourceManager._initialized = true;
    }

    static getCanvas(): HTMLCanvasElement {
        if (!SourceManager._initialized) {
            throw new Error('SourceManager 尚未初始化');
        }
        return SourceManager._canvas;
    }

    static getCtx(): CanvasRenderingContext2D {
        if (!SourceManager._initialized) {
            throw new Error('SourceManager 尚未初始化');
        }
        return SourceManager._ctx;
    }

    static getGameDataManager(): GameDataManager {
        if (!SourceManager._initialized) {
            throw new Error('SourceManager 尚未初始化');
        }
        return SourceManager._gameDataManager;
    }

    static isInitialized(): boolean {
        return SourceManager._initialized;
    }
}
