import { ButtonPosType } from '../enums/btn.enum';
import { IActionManager } from '../interfaces/IActionManager';
import { Shape } from '../shape';
import { Point } from '../types';
import { getPosition } from '../../utils';
import GAME_CONFIG from '../../config/game.config';
import BUTTON_CONFIG from '../../config/btns.config';
const { gameHeight, squareSize, gameRowNum } = GAME_CONFIG;

export class ActionManager implements IActionManager {
    private _canvas: HTMLCanvasElement | null = null;
    private _currShape: Shape | null = null;
    private _onPauseToggle: (() => void) | null = null; // 暂停切换回调

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this.bindEvent();
    }

    /**
     * 设置暂停切换回调
     */
    setOnPauseToggle(callback: () => void): void {
        this._onPauseToggle = callback;
    }

    private handleClick(e: MouseEvent) {
        const { x, y } = e;
        const btnType = this.getClickBtntype({ x, y });

        // 处理暂停按钮
        if (btnType === ButtonPosType.pause) {
            if (this._onPauseToggle) {
                this._onPauseToggle();
            }
            return;
        }

        // 其他按钮需要当前形状存在
        if (!this._currShape) return;
        let shapeCenterPoint = this._currShape.getCenterPoint() as Point;
        switch (btnType) {
            // 如果是向上类型的话，需要变化图形
            case ButtonPosType.up:
                this._currShape.rotate();
                break;
            case ButtonPosType.right:
                shapeCenterPoint.x += squareSize;
                this._currShape.setCenterPoint(shapeCenterPoint);
                break;
            case ButtonPosType.down:
                shapeCenterPoint.y += squareSize;
                this._currShape.setCenterPoint(shapeCenterPoint);
                break;
            case ButtonPosType.left:
                shapeCenterPoint.x -= squareSize;
                this._currShape.setCenterPoint(shapeCenterPoint);
                break;
            case ButtonPosType.drop:
                this._currShape.hardDrop();
                break;
        }
    }

    private handleKeyDown(e: KeyboardEvent) {
        if (!this._currShape) return;
        const { code } = e;
        let shapeCenterPoint = this._currShape.getCenterPoint() as Point;
        switch (code) {
            // 如果是向上类型的话，需要变化图形
            case 'ArrowUp':
                this._currShape.rotate();
                break;
            case 'ArrowRight':
                shapeCenterPoint.x += squareSize;
                this._currShape.setCenterPoint(shapeCenterPoint);
                break;
            case 'ArrowDown':
                shapeCenterPoint.y += squareSize;
                this._currShape.setCenterPoint(shapeCenterPoint);
                break;
            case 'ArrowLeft':
                shapeCenterPoint.x -= squareSize;
                this._currShape.setCenterPoint(shapeCenterPoint);
                break;
            case 'Space':
                this._currShape.hardDrop();
                break;
        }
    }

    /**
     * 获取点击的按钮类型
     * @param clickPos 鼠标点击的坐标
     * @returns ButtonPosType 按钮类型
     */
    private getClickBtntype(clickPos: Point): ButtonPosType | null {
        if (!this._canvas) return null;
        let btnType: ButtonPosType | null = null;
        const { x, y } = clickPos;
        const { left, top } = getPosition(this._canvas);
        //得到点击位置距离canvas最左侧的距离
        const clickXToCanvasLeft = x - left;
        //得到点击位置距离canvas最顶部的距离
        const clickYToCanvasTop = y - top;
        //得到点击位置距离canvas最底部的距离
        const clickYToCanvasBottom = gameHeight - clickYToCanvasTop;
        let type: ButtonPosType | '' = '';
        BUTTON_CONFIG.forEach((i) => {
            const { left: btnLeft, right: btnRight, top: btnTop, bottom: btnBottom } = i;
            if (clickXToCanvasLeft >= btnLeft && clickXToCanvasLeft <= btnRight && clickYToCanvasTop >= btnTop && clickYToCanvasBottom >= btnBottom) {
                btnType = i.name;
            }
        });
        return btnType;
    }

    setCurrShape(shape: Shape) {
        this._currShape = shape;
    }

    getCurrShape(): Shape | null {
        return this._currShape;
    }

    bindEvent(): void {
        this._canvas?.addEventListener('click', this.handleClick.bind(this));
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    destoryEvent(): void {
        this._canvas?.removeEventListener('click', this.handleClick.bind(this));
        window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }
}
