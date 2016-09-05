import canvas from './modules/canvas';
import Game from './modules/game';

var game;

function startGame() {
  game = new Game(document.getElementById('tetrisCanvas').getContext('2d'));
}

document.body.innerHTML = canvas;
startGame();
