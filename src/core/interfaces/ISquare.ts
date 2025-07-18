import { Square } from '../square';
import { Point } from '../types';

export interface ISquare {
    

    draw(point: Point): void;

    move(point: Point): void;

    remove(point: Point): void;
}
