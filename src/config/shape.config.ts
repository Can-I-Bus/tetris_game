import { ShapeType } from '../core/enums/shape.enum';

export const SQUARE_TYPES = [
    {
        [ShapeType.I]: [
            [
                [-1, 0],
                [0, 0],
                [1, 0],
                [2, 0],
            ],
        ],
    },
    {
        [ShapeType.L]: [
            [
                [0, -2],
                [0, -1],
                [0, 0],
                [1, 0],
            ],
        ],
    },
    {
        [ShapeType.S]: [
            [
                [1, 0],
                [0, 0],
                [0, 1],
                [-1, 1],
            ],
        ],
    },
    {
        [ShapeType.T]: [
            [
                [0, -1],
                [0, 0],
                [1, 0],
                [0, 1],
            ],
        ],
    },
    {
        [ShapeType.O]: [
            [
                [0, 0],
                [0, 1],
                [1, 0],
                [1, 1],
            ],
        ],
    },
];

export const COLORS = ['#77AA3A', '#DEC749', '#EF8636', '#D35541', '#613F88', '#367BBF'];
