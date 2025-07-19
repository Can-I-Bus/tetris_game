import STYLE_CONFIG from '../config/style.config';
const { light, dark } = STYLE_CONFIG;
const html = document.getElementsByTagName('html');

/**
 * 获取游戏区域网格线的绘制颜色
 * @returns {string} 网格线颜色
 */
export const getThemeColor = (key: string): string => {
    const theme = html[0].dataset.theme || 'light';
    const themeColors = theme === 'light' ? light : dark;
    return themeColors[key as keyof typeof themeColors] || '';
};

/**
 * 计算一个 HTML 元素相对于整个文档（页面）左上角的精确坐标位置（左边距和上边距）
 * @param {HTMLElement} element
 * @returns {{left:number,top:number}}
 */
export const getPosition = (element: HTMLElement) => {
    let pos = {
        left: 0,
        top: 0,
    };
    let currentElement: HTMLElement | null = element;
    while (currentElement) {
        pos.left += currentElement.offsetLeft;
        pos.top += currentElement.offsetTop;
        currentElement = currentElement.offsetParent as HTMLElement | null;
    }
    return pos;
};

/**
 * 获取数组中随机项
 * @param {any[]} sourceArr 原数组
 * @returns 数组中随机项
 */
export const getRandomItem = (sourceArr: any[]): any => {
    return sourceArr[~~(Math.random() * sourceArr.length)];
};
