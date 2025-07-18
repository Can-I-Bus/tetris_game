import { ButtonPosType } from '../enums/btn.enum';
import { IActionManager } from '../interfaces/IActionManager';
import { Shape } from '../shape';
import { Point } from '../types';
import { getPosition } from '../../utils';
import GAME_CONFIG from '../../config/game.config';
import BUTTON_CONFIG from '../../config/btns.config';
const { gameHeight } = GAME_CONFIG;

export class ActionManager implements IActionManager {
    private _canvas: HTMLCanvasElement | null = null;
    private _currShape: Shape | null = null;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this.bindEvent();
    }

    private handleClick(e: MouseEvent) {
        const { x, y } = e;
        if (!this._currShape) return;
        const btnType = this.getClickBtntype({ x, y });
        console.log(btnType);
        switch (btnType) {
            // 如果是向上类型的话，需要变化图形
            case ButtonPosType.up:
                this._currShape.rotate();
                break;
            case ButtonPosType.right:
                this._currShape.move(ButtonPosType.right);
                break;
            case ButtonPosType.down:
                this._currShape.move(ButtonPosType.down);
                break;
            case ButtonPosType.left:
                this._currShape.move(ButtonPosType.left);
                break;
            case ButtonPosType.drop:
                this._currShape.move(ButtonPosType.drop);
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
    }

    destoryEvent(): void {
        this._canvas?.removeEventListener('click', this.handleClick.bind(this));
    }
}
