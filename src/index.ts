import { Game } from './core/game';

const canvas = document.getElementById('tetris') as HTMLCanvasElement;
new Game({
    canvasEl: canvas,
    onGameOver() {
        console.log('game over');
    },
    onGamePause() {
        console.log('game pause');
    },
});
