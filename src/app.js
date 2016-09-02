import BlockType from './modules/blockType';
import TetrisBlock from './modules/tetrisBlock';
import canvas from './modules/canvas';
import Game from './modules/game';
import { generateRandom, sum } from './modules/utility';

let blockTypesI = [[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
                   [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
                   [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
                   [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]];

var ctx;
var level;
var currentBlock;
var play = false;
var gameStepTime = 370;
var cumulatedFrameTime = 0;
var lastFrameTime = Date.now();
var numberOfLines = 0;

function startGame() {
  let game = new Game();
  addEvents();
  ctx = document.getElementById('tetrisCanvas').getContext('2d');

  let blockOne = new TetrisBlock(new BlockType('I', blockTypesI, "blue", "black"), 1, 2);
  currentBlock = blockOne;
  console.log(currentBlock);
  blockOne.drawBlock(ctx);

  console.log(game);
}

function addEvents() {
  document.addEventListener('keydown', keydown, false);
}

function keydown(ev) {
  console.log(ev.keyCode)
  switch(ev.keyCode) {
    case 37:
      //if (checkOffset(currentBlock, -1, 0)) {
          currentBlock.x = 6;
      //}
      break;
    case 39:
      //if(checkOffset(currentBlock,+1,0)) {
        currentBlock.x++;
      //}
      break;
    case 38:
      //currentBlock.rotate(level);
      break;
    case 40:
      //if(checkOffset(currentBlock,0,+1)){
        currentBlock.y = currentBlock.y + 1;
      //}
      break;
    }
}

document.body.innerHTML = canvas;
startGame();
