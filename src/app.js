'use strict';

import canvas from './modules/canvas';
import Game from './modules/game';

function startGame() {
  new Game(document.getElementById('tetrisCanvas').getContext('2d'));
}

document.body.innerHTML = canvas;
startGame();
