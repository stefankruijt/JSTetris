'use strict';

import canvas from './modules/canvas';
import Game from './modules/game';

function startGame() {
  new Game(document.getElementById('tetrisCanvas'));
}

let game = document.getElementsByTagName('tetris-game')
if(game.length === 0) {
  console.error("Element <tetris-game> not found.");
}
else {
  game[0].innerHTML = canvas;
}

startGame();
