import GAME_CONFIG from '../../config/game.config';
import BTNS_CONFIG from '../../config/btns.config';
import { RenderUtils } from '../../utils/renderUtils';
import { IGameRenderer } from '../interfaces/IGameRenderer';
import { getThemeColor } from '../../utils';
const { squareSize, gameColumnNum, gameRowNum, dpr, offset, boardBorderWidth, labelFontSize, nextShapeSectionRowNum, nextShapeSectionColumnNum } = GAME_CONFIG;

type GameRenderType = {
    canvasEl: HTMLCanvasElement;
    canvasCtx: CanvasRenderingContext2D;
};

export class GameRenderer implements IGameRenderer {
    private _canvas: HTMLCanvasElement | null = null;
    private _ctx: CanvasRenderingContext2D | null = null;
    private _renderUtils: RenderUtils | null = null;

    constructor(renderObj: GameRenderType) {
        const { canvasEl, canvasCtx } = renderObj;
        this._canvas = canvasEl;
        this._ctx = canvasCtx;
        this._canvas.width = this._canvas.width * dpr;
        this._canvas.height = this._canvas.height * dpr;
        this._ctx.scale(dpr, dpr);
        this._renderUtils = new RenderUtils(this._ctx);
    }

    /**
     * 绘制游戏主区域
     */
    private drawMainSection(): void {
        if (!this._renderUtils) return;
        const lineColor = getThemeColor('drawLineColor');
        const boardBorderColor = getThemeColor('boardBorderColor');
        const mainSectionBgc = getThemeColor('mainSectionBgc');
        this._renderUtils.drawRect({
            x: offset - boardBorderWidth / 2,
            y: offset - boardBorderWidth / 2,
            w: squareSize * gameColumnNum + boardBorderWidth,
            h: squareSize * gameRowNum + boardBorderWidth,
            stokeColor: boardBorderColor,
            lineWidth: boardBorderWidth,
            fillColor: mainSectionBgc,
        });

        for (let i = 0; i < gameRowNum; i++) {
            const drawLineObj = {
                startX: offset,
                startY: offset + squareSize * i,
                endX: offset + squareSize * gameColumnNum,
                endY: offset + squareSize * i,
                color: lineColor,
                lineWidth: 0.6,
            };
            this._renderUtils.drawLine(drawLineObj);
        }
        for (let i = 0; i < gameColumnNum; i++) {
            const drawLineObj = {
                startX: offset + squareSize * i,
                startY: offset,
                endX: offset + squareSize * i,
                endY: offset + squareSize * gameRowNum,
                color: lineColor,
                lineWidth: 0.6,
            };
            this._renderUtils.drawLine(drawLineObj);
        }
    }

    /**
     * 绘制游戏下一个图形展示区域
     */
    private drawNextShareSection(): void {
        if (!this._ctx) return;
        const fillColor = getThemeColor('nextShapeSectionBgc');
        this._renderUtils?.drawRadiusRect({
            x: offset + squareSize * gameColumnNum + offset,
            y: offset,
            w: squareSize * nextShapeSectionColumnNum,
            h: squareSize * nextShapeSectionRowNum,
            lineColor: 'transparent',
            lineWidth: 0.1,
            radius: 10,
            fillColor,
        });
    }

    /**
     * 绘制得分区域
     */
    private drawScoreboardSection(): void {
        const color = getThemeColor('labelColor');
        const offset = 70;
        const gradeTextObj = {
            x: squareSize * gameColumnNum + offset,
            y: squareSize * nextShapeSectionRowNum + offset,
            color,
            content: '得分',
            fz: labelFontSize,
        };
        const gradeObj = {
            x: squareSize * gameColumnNum + offset + 10,
            y: squareSize * nextShapeSectionRowNum + offset + 30,
            color,
            content: '0',
            fz: labelFontSize,
        };
        this._renderUtils?.drawText(gradeTextObj);
        this._renderUtils?.drawText(gradeObj);
    }

    /**
     * 绘制操作区域
     */
    private drawActionSection(): void {
        if (!this._renderUtils) return;
        // 按钮背景和边框颜色
        const buttonBgColor = getThemeColor('buttonBgColor') || '#f0f0f0';
        const buttonBorderColor = getThemeColor('buttonBorderColor') || '#ccc';
        const buttonRadius = 12; // 圆角半径
        // 绘制每个按钮
        BTNS_CONFIG.forEach((button) => {
            // 先绘制按钮背景（圆角矩形）
            this._renderUtils?.drawRadiusRect({
                x: button.left,
                y: button.top,
                w: button.width,
                h: button.height,
                radius: buttonRadius,
                fillColor: buttonBgColor,
                lineColor: buttonBorderColor,
                lineWidth: 1,
            });

            // 创建并加载图片
            const img = new Image();
            img.onload = () => {
                // 计算图片在按钮中的居中位置
                const imgX = button.left + button.imageOffsetX;
                const imgY = button.top + button.imageOffsetY;

                // 绘制图片
                this._renderUtils?.drawImg({
                    image: img,
                    dx: imgX,
                    dy: imgY,
                    dWidth: button.imageSize,
                    dHeight: button.imageSize,
                });
            };

            // 设置图片源开始加载
            img.src = '../../../' + button.imageBaseSrc;
        });
    }

    render(): void {
        this.drawMainSection();
        this.drawNextShareSection();
        this.drawScoreboardSection();
        this.drawActionSection();
    }

    clear(): void {
        throw new Error('Method not implemented.');
    }
}
