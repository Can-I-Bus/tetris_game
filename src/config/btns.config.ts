import GAME_CONFIG from './game.config';
import { ButtonPosType } from '../core/enums/btn.enum';
const { squareSize, gameRowNum, gameHeight, offset, gameColumnNum, gameWidth } = GAME_CONFIG;

// 按钮配置
const buttonSize = 60;
const dropButtonWidth = 60;
const dropButtonHeight = 120;
const startY = 20 + squareSize * gameRowNum + 40;
const dropButtonX = 30;
const dropButtonY = startY;
const baseX = 200;
const baseY = startY - 20;

export default [
    // 降落按钮
    {
        name: ButtonPosType.drop,
        imageBaseSrc: 'public/img/drop.png',
        // 左边离canvas最左侧的距离
        left: dropButtonX,
        // 顶部离canvas最顶部的距离
        top: dropButtonY,
        // 右边离canvas最左侧的距离
        right: dropButtonX + dropButtonWidth,
        // 底边离canvas最底部的距离
        bottom: gameHeight - dropButtonHeight - dropButtonY,
        width: dropButtonWidth,
        height: dropButtonHeight,
        imageSize: dropButtonWidth * 0.5,
        imageOffsetX: dropButtonWidth * 0.25,
        imageOffsetY: dropButtonHeight * 0.25,
    },
    // 暂停/开始按钮 - 位于得分区域下方
    {
        name: ButtonPosType.pause,
        imageBaseSrc: 'public/img/Pause.png', // 默认显示暂停图标
        // 计算位置：主棋盘右侧居中
        left: offset + squareSize * gameColumnNum + 30,
        // 位于得分区域下方
        top: offset + squareSize * 4.5 + 40 + 180 + 20,
        right: offset + squareSize * gameColumnNum + 30 + buttonSize,
        bottom: gameHeight - buttonSize - (offset + squareSize * 4.5 + 40 + 180 + 20),
        width: buttonSize,
        height: buttonSize,
        imageSize: buttonSize * 0.6,
        imageOffsetX: buttonSize * 0.2,
        imageOffsetY: buttonSize * 0.2,
    },
    // 上按钮
    {
        name: ButtonPosType.up,
        imageBaseSrc: 'public/img/up.png',
        // 左边离canvas最左侧的距离
        left: baseX,
        // 顶部离canvas最顶部的距离
        top: baseY,
        // 右边离canvas最左侧的距离
        right: baseX + buttonSize,
        // 底边离canvas最底部的距离
        bottom: gameHeight - buttonSize - baseY,
        width: buttonSize,
        height: buttonSize,
        imageSize: buttonSize * 0.5,
        imageOffsetX: buttonSize * 0.25,
        imageOffsetY: buttonSize * 0.25,
    },
    // 左按钮
    {
        name: ButtonPosType.left,
        imageBaseSrc: 'public/img/left.png',
        // 左边离canvas最左侧的距离
        left: baseX - 70,
        // 顶部离canvas最顶部的距离
        top: baseY + 70,
        // 右边离canvas最左侧的距离
        right: baseX + (buttonSize - 70),
        // 底边离canvas最底部的距离
        bottom: gameHeight - buttonSize - (baseY + 70),
        width: buttonSize,
        height: buttonSize,
        imageSize: buttonSize * 0.5,
        imageOffsetX: buttonSize * 0.25,
        imageOffsetY: buttonSize * 0.25,
    },
    // 右按钮
    {
        name: ButtonPosType.right,
        imageBaseSrc: 'public/img/right.png',
        // 左边离canvas最左侧的距离
        left: baseX + 70,
        // 顶部离canvas最顶部的距离
        top: baseY + 70,
        // 右边离canvas最左侧的距离
        right: baseX + buttonSize + 70,
        // 底边离canvas最底部的距离
        bottom: gameHeight - buttonSize - (baseY + 70),
        width: buttonSize,
        height: buttonSize,
        imageSize: buttonSize * 0.5,
        imageOffsetX: buttonSize * 0.25,
        imageOffsetY: buttonSize * 0.25,
    },
    // 下按钮
    {
        name: ButtonPosType.down,
        imageBaseSrc: 'public/img/down.png',
        // 左边离canvas最左侧的距离
        left: baseX,
        // 顶部离canvas最顶部的距离
        top: baseY + 140,
        // 右边离canvas最左侧的距离
        right: baseX + buttonSize,
        // 底边离canvas最底部的距离
        bottom: gameHeight - buttonSize - (baseY + 140),
        width: buttonSize,
        height: buttonSize,
        imageSize: buttonSize * 0.5,
        imageOffsetX: buttonSize * 0.25,
        imageOffsetY: buttonSize * 0.25,
    },
];
