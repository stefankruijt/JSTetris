import canvas from './modules/canvas';
import Game from './modules/game';

var game;

function startGame() {
  game = new Game(document.getElementById('tetrisCanvas').getContext('2d'));
}

/*function keydown(ev) {
  switch(ev.keyCode) {
    case 37:
        game.gameEvent("left");
      //if (checkOffset(currentBlock, -1, 0)) {
      //}
      break;
    case 39:
      //if(checkOffset(currentBlock,+1,0)) {
      game.gameEvent("right");
        currentBlock.x++;

      //}
      break;
    case 38:
      game.gameEvent("rotate");
      break;
    case 40:
      //if(checkOffset(currentBlock,0,+1)){
      game.gameEvent("down");
        currentBlock.y = currentBlock.y + 1;
      //}
      break;
    }
}*/

document.body.innerHTML = canvas;
startGame();
