'use strict';

import canvas from './modules/canvas';
import Game from './modules/game';

function startGame() {
  new Game(document.getElementById('tetrisCanvas'));
}

document.body.innerHTML = canvas;

startGame();
