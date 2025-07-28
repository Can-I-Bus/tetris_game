import { DrawImgType, DrawLineType, DrawRectType, DrawReduisRectType, DrawTextType } from '../core/types';

export class RenderUtils {
    private _ctx: CanvasRenderingContext2D | null = null;

    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx;
    }

    /**
     * 辅助方法：绘制矩形
     */
    drawRect(drawRectObj: DrawRectType): void {
        if (!this._ctx) return;
        const { x, y, w, h, lineWidth = 1, stokeColor = 'transparent', fillColor = '' } = drawRectObj;
        this._ctx.save();
        this._ctx.beginPath();
        this._ctx.strokeStyle = stokeColor;
        this._ctx.lineWidth = lineWidth;
        this._ctx.rect(x, y, w, h);
        if (fillColor !== '') {
            this._ctx.fillStyle = fillColor;
            this._ctx.fill();
        }
        this._ctx.stroke();
        this._ctx.restore();
    }

    /**
     * 辅助方法：绘制线条
     */
    drawLine(drawLineObj: DrawLineType): void {
        if (!this._ctx) return;
        const { startX, startY, endX, endY, color, lineWidth } = drawLineObj;
        this._ctx.save();
        this._ctx.beginPath();
        this._ctx.moveTo(startX, startY);
        this._ctx.lineWidth = lineWidth;
        this._ctx.strokeStyle = color;
        this._ctx.lineTo(endX, endY);
        this._ctx.stroke();
        this._ctx.restore();
    }

    /**
     * 辅助方法：绘制文字
     */
    drawText(drawTextObj: DrawTextType): void {
        if (!this._ctx) return;
        this._ctx.save();
        const { x, y, content, color = '#333', fz, textAlign = 'left', textBaseline = 'top' } = drawTextObj;
        this._ctx.fillStyle = color;
        this._ctx.font = `${fz} Arial`;
        this._ctx.textAlign = textAlign;
        this._ctx.textBaseline = textBaseline;
        this._ctx.fillText(content, x, y);
        this._ctx.restore();
    }

    /**
     * 辅助方法：绘制圆角矩形
     */
    drawRadiusRect(drawReduisRectObj: DrawReduisRectType): void {
        if (!this._ctx) return;
        this._ctx.save();
        const { x, y, w, h, radius, lineColor, lineWidth, fillColor } = drawReduisRectObj;
        this._ctx.beginPath();
        this._ctx.moveTo(x + radius, y);
        this._ctx.lineTo(x + w - radius, y);
        this._ctx.arcTo(x + w, y, x + w, y + radius, radius);
        this._ctx.lineTo(x + w, y + h - radius);
        this._ctx.arcTo(x + w, y + h, x + w - radius, y + h, radius);
        this._ctx.lineTo(x + radius, y + h);
        this._ctx.arcTo(x, y + h, x, y + h - radius, radius);
        this._ctx.lineTo(x, y + radius);
        this._ctx.arcTo(x, y, x + radius, y, radius);
        this._ctx.closePath();
        if (lineColor && lineWidth) {
            this._ctx.strokeStyle = lineColor;
            this._ctx.lineWidth = lineWidth;
            this._ctx.stroke();
        }
        if (fillColor) {
            this._ctx.fillStyle = fillColor;
            this._ctx.fill();
        }
        this._ctx.restore();
    }

    /**
     * @param image
     * @param dx
     * @param dy
     * @param dWidth
     * @param dHeight
     * 绘制图片
     */
    drawImg(drawImgObj: DrawImgType): void {
        if (!this._ctx) return;
        this._ctx.save();
        const { image, dx, dy, dHeight, dWidth } = drawImgObj;
        this._ctx.drawImage(image, dx, dy, dWidth, dHeight);
        this._ctx.restore();
    }
}
