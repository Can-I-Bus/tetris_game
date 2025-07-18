import { IShape } from './interfaces/IShape';
import { Square } from './square';
import { ButtonPosType } from './enums/btn.enum';

export class Shape implements IShape {
    private _squares: Square[] | [] = [];

    constructor() {
        this.init();
    }

    private init() {}

    move(type: ButtonPosType): void {
        throw new Error('Method not implemented.');
    }
    rotate(): void {
        throw new Error('Method not implemented.');
    }
    remove(): void {
        throw new Error('Method not implemented.');
    }
}
