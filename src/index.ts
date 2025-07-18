import { Shape } from './core/shape';
import { ActionManager } from './core/manager/actionManager';
import { GameRenderer } from './core/viewer/gameRenderer';

type gameType = {
    canvasEl: HTMLCanvasElement;
    onGameOver?: Function;
    onGamePause?: Function;
};

export class Game {
    private _canvas: HTMLCanvasElement | null = null;
    private _onGameOver: Function | null = null;
    private _onGamePause: Function | null = null;
    private _isGameOver: boolean = false;
    private _canvasCtx: CanvasRenderingContext2D | null = null;
    private _gameRenderer: GameRenderer | null = null;
    private _actionManager: ActionManager | null = null;
    private _currShape: Shape | null = null;

    constructor(gameType: gameType) {
        const { canvasEl, onGameOver, onGamePause } = gameType;
        this._canvas = canvasEl;
        this._canvasCtx = this._canvas.getContext('2d');
        this._gameRenderer = new GameRenderer({ canvasEl: this._canvas, canvasCtx: this._canvasCtx as CanvasRenderingContext2D });
        this._actionManager = new ActionManager(this._canvas);
        if (onGameOver) {
            this._onGameOver = onGameOver;
        }
        if (onGamePause) {
            this._onGamePause = onGamePause;
        }
        this.start();
    }

    /**
     * 游戏开始
     */
    private start() {
        this._isGameOver = false;
        this._gameRenderer?.render();
        this._currShape = new Shape();
        this._actionManager?.setCurrShape(this._currShape);
    }

    /**
     * 游戏结束
     */
    private over() {
        this._isGameOver = true;
        this._gameRenderer?.clear();
        this._actionManager?.destoryEvent();
        if (this._onGameOver) {
            this._onGameOver();
        }
    }

    /**
     * 游戏暂停
     */
    private pause() {
        if (this._onGamePause) {
            this._onGamePause();
        }
    }
}

const canvas = document.getElementById('tetris') as HTMLCanvasElement;
const game = new Game({
    canvasEl: canvas,
    onGameOver() {
        console.log('game over');
    },
    onGamePause() {
        console.log('game pause');
    },
});
