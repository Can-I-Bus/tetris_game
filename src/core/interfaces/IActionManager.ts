import { Shape } from '../shape';

export interface IActionManager {
    /**
     * 点击事件总线
     */
    bindEvent(): void;

    /**
     * 销毁事件
     */
    destoryEvent(): void;

    /**
     * 设置当前正在界面中的shape
     * @param shape Shape
     */
    setCurrShape(shape: Shape): void;

    /**
     * 获取当前正在界面中的shape
     */
    getCurrShape(): Shape | null;
}
