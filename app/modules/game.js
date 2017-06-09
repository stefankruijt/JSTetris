import * as constants from './constants';

import GameField from './gameField';
import TetrisBlock from './tetrisBlock';

export default class Game {

  constructor(canvas) {
    var self = this;

    this.ctx = canvas.getContext("2d");
    this.blockWidth = canvas.width / constants.FIELD_WIDTH_IN_BLOCKS;
    this.fps = constants.FPS;
    this.numberOfLines = 0;
    this.gameField = new GameField(canvas);
    this.currentBlock = self.getNewRandomTetrisBlock();

    document.body.onkeydown = (e) => self.gameEvent(e);

    self.run();
/*

    var lastFrameTimeMsDraw = 0;
    function mainLoop(timestamp) {
      if (timestamp < lastFrameTimeMsDraw + (1000 / constants.FPS)) {
        draw();
        requestAnimationFrame(mainLoop);
        return;
      }

      update();
      draw();
      lastFrameTimeMsDraw = timestamp;
      lastFrameTimeMsUpdate = timestamp;

      requestAnimationFrame(mainLoop);
    }*/
  }

  run() {
    var loops = 0,
        currentDate = new Date(), 
        skipTicks = 1000 / Game.fps, 
        maxFrameSkip = 10,
        nextGameTick = currentDate.getTime() + skipTicks,
        lastGameTick;
    
    console.log(currentDate);
    console.log((new Date).getTime());
    while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
      Game.update();
      nextGameTick += skipTicks;
      loops++;

      console.log("Loops" + loops)
    }
    
    let canvas = this.gameField;
    this.draw(canvas);
  }

  update() {
    if (this.movementAllowed(this.currentBlock, this.currentBlock.activeState, 0, 1)) {
      this.currentBlock.moveDown();
    } else {
      this.gameField.addBlockToField(this.currentBlock);
      this.currentBlock = this.getNewRandomTetrisBlock();
    }

    self.gameField.checkAndRemoveFullLines();
  }

  draw(canvas) {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.gameField.drawGameField(this.ctx);
    this.currentBlock.drawBlock(this.ctx);
  }

  getNewRandomTetrisBlock() {
    let randomNumber = Math.floor(Math.random() * constants.TETRIS_BLOCK_CHARACTERS.length);
    let blockLetter = constants.TETRIS_BLOCK_CHARACTERS.charAt(randomNumber);
    return new TetrisBlock(blockLetter, 3, 0, this.blockWidth);
  }

  gameEvent(event) {
    switch (event.key) {
      case "ArrowLeft":
        if (this.movementAllowed(this.currentBlock, this.currentBlock.activeState, -1, 0)) {
          this.currentBlock.moveLeft();
        }
        break;
      case "ArrowRight":
        if (this.movementAllowed(this.currentBlock, this.currentBlock.activeState, 1, 0)) {
          this.currentBlock.moveRight();
        }
        break;
      case "ArrowUp":
        if (this.movementAllowed(this.currentBlock, this.currentBlock.nextState(), 1, 0)) {
          this.currentBlock.rotate();
        }
        break;
      case "ArrowDown":
        if (this.movementAllowed(this.currentBlock, this.currentBlock.activeState, 0, 1)) {
          this.currentBlock.y = this.currentBlock.y + 1;
        }
        break;
    }
  }

  movementAllowed(block, state, xMovement, yMovement) {
    const x = block.x + xMovement;
    const y = block.y + yMovement;

    for (let i = 0; i < state.length; i++) {
      for (let j = 0; j < state[i].length; j++) {
        if (state[i][j] == 1) {
          const fieldY = y + i;
          const fieldX = x + j;

          if (!this.gameField.inBoundaries(fieldX, fieldY) || this.gameField.occupied(fieldX, fieldY)) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
