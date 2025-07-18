import { ButtonPosType } from '../enums/btn.enum';
import { Point } from '../types';

export interface IShape {
    /**
     * 移动
     */
    move(type: ButtonPosType): void;

    /**
     * 旋转
     */
    rotate(): void;

    /**
     * 移除
     */
    remove(): void;
}
