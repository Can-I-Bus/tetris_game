import GAME_CONFIG from '../config/game.config';
import { createAssignedShape, Shape } from '../core/shape';
import { createRandomShape } from '../core/shape';
import { ActionManager } from '../core/manager/actionManager';
import { GameRenderer } from '../core/render/gameRenderer';
import { Point, GameType } from '../core/types';
import { GameDataManager } from '../core/manager/gameDataManager';
import { SourceManager } from '../core/manager/sourceManager';
import { GameStatus } from '../core/enums/gameStatus.enum';
const { interval, gameColumnNum, squareSize, offset, nextShapeSectionColumnNum } = GAME_CONFIG;

export class Game {
    private _gameStatus: GameStatus;
    private _gameRenderer: GameRenderer;
    private _actionManager: ActionManager;
    private _gameDataManager: GameDataManager;
    private _onGameOver: Function | null = null;
    private _onGamePause: Function | null = null;
    private _currShape: Shape | null = null;
    private _nextShape: Shape | null = null;
    private _timer: number | null = null;
    private _currentSpeed: number = interval; // 记录当前定时器速度

    constructor(gameType: GameType) {
        const { canvasEl, onGameOver, onGamePause } = gameType;
        // 创建公共资源管理器
        new SourceManager(canvasEl, canvasEl.getContext('2d') as CanvasRenderingContext2D);
        this._gameRenderer = new GameRenderer({
            canvasEl: SourceManager.getCanvas(),
            canvasCtx: SourceManager.getCtx(),
        });
        this._actionManager = new ActionManager(SourceManager.getCanvas());
        this._gameDataManager = SourceManager.getGameDataManager();

        // 设置暂停切换回调
        this._actionManager.setOnPauseToggle(() => {
            this.togglePause();
        });

        if (onGameOver) {
            this._onGameOver = onGameOver;
        }
        if (onGamePause) {
            this._onGamePause = onGamePause;
        }
        this._gameStatus = GameStatus.initial;
        this.start();
    }

    /**
     * 设置当前的图形和下一个图形
     */
    private setShape(): void {
        const mainBoardPointX = (gameColumnNum / 2) * squareSize;
        const nextBoadrPointX = offset + squareSize * gameColumnNum + Math.floor(nextShapeSectionColumnNum / 2) * squareSize;
        // 如果下一个图形存在的话，就将下一个图形赋值给当前的图形
        if (this._currShape) {
            this._currShape = null;
        }
        if (this._nextShape) {
            const nextShapeType = this._nextShape.getShapeType();
            const nextShapeColor = this._nextShape.getColor();
            this._currShape = createAssignedShape({ x: mainBoardPointX, y: offset }, SourceManager.getCtx(), nextShapeType, nextShapeColor);
        } else {
            this._currShape = createRandomShape({ x: mainBoardPointX, y: offset }, SourceManager.getCtx());
        }
        if (this._nextShape) {
            this._nextShape.remove();
            this._nextShape = null;
        }
        this._nextShape = createRandomShape({ x: nextBoadrPointX + 4, y: offset + 42 }, SourceManager.getCtx());
        if (!this._actionManager) {
            throw new Error('ActionManager对象不存在');
        }
        this._actionManager.setCurrShape(this._currShape);
    }

    /**
     * 游戏开始
     */
    private start() {
        if (!this._gameRenderer) return;
        this._gameStatus = GameStatus.playing;
        this._gameRenderer.setGameStatus(GameStatus.playing);

        this._gameRenderer.render();
        this._gameRenderer.resetGame(); // 初始化游戏数据
        this.setShape();
        this.gameLoop();
    }

    /**
     * 游戏循环
     */
    private gameLoop() {
        this._currentSpeed = this._gameRenderer.getSpeed();
        this._timer = setInterval(() => {
            if (!this._gameDataManager) {
                if (this._timer) {
                    clearInterval(this._timer);
                }
                throw new Error('游戏数据未初始化完成');
            }
            const point = this._currShape?.getCenterPoint() as Point;
            const nextY = point.y + squareSize;
            const isSetSuccess = this._currShape?.setCenterPoint({ x: point.x, y: nextY });

            // 如果没有设置成功的话，代表触底了
            if (!isSetSuccess) {
                if (this._gameDataManager.checkIsgameOver()) {
                    this.over();
                } else {
                    // 将当前形状的方块数据存储到游戏数据管理器中
                    this._gameDataManager.concatData(this._currShape?.getSquares() || []);
                    // 重置当前的图形和下一个图形
                    this.setShape();
                    // 检查有没有满行的
                    const fullLineSquares = this._gameDataManager.checkFullLine();

                    if (fullLineSquares.length > 0) {
                        // 如果返回的数组长度大于0的话，代表有满行的，将得到的小方块全部清除掉
                        fullLineSquares.forEach((i) => {
                            i.remove();
                        });
                        this._gameDataManager.removeSquares(fullLineSquares);
                        this._gameDataManager.updateData();

                        // 更新得分
                        this._gameRenderer.updateScore(fullLineSquares.length);
                        const newSpeed = this._gameRenderer.getSpeed();

                        // 如果速度有变化，重新启动定时器
                        if (newSpeed !== this._currentSpeed) {
                            this.restartTimer();
                        }
                    }
                }
            }
        }, this._currentSpeed) as unknown as number;
    }

    /**
     * 重新启动定时器
     */
    private restartTimer(): void {
        if (this._timer) {
            clearInterval(this._timer);
        }
        this.gameLoop();
    }

    /**
     * 游戏结束
     */
    private over() {
        this._gameStatus = GameStatus.over;
        this._gameRenderer?.clear();
        this._actionManager?.destoryEvent();
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
        if (this._onGameOver) {
            this._onGameOver();
        }
    }

    /**
     * 切换暂停状态
     */
    private togglePause(): void {
        if (this._gameStatus === GameStatus.playing) {
            this.pause();
        } else if (this._gameStatus === GameStatus.pause) {
            this.resume();
        }
    }

    /**
     * 暂停游戏
     */
    private pause(): void {
        this._gameStatus = GameStatus.pause;
        this._gameRenderer.setGameStatus(GameStatus.pause);

        // 停止定时器
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }

        if (this._onGamePause) {
            this._onGamePause();
        }
    }

    /**
     * 恢复游戏
     */
    private resume(): void {
        this._gameStatus = GameStatus.playing;
        this._gameRenderer.setGameStatus(GameStatus.playing);

        // 重新开始游戏循环
        this.gameLoop();
    }
}
