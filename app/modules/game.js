import * as constants from './constants';

import GameField from './gameField';
import TetrisBlock from './tetrisBlock';

export default class Game {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.blockWidth = canvas.width / constants.FIELD_WIDTH_IN_BLOCKS;


    this.numberOfLines = 0;
    this.gameField = new GameField(canvas);
    this.currentBlock = this.getNewRandomTetrisBlock();

    document.body.onkeydown = (e) => this.gameEvent(e);

    this.skipTicks = 1000 / constants.FPS;
    this.difficultyTicks = constants.GAME_SPEED;
    console.log("Construction game: " + this.difficultyTicks)

    this.lastGameTickDraw = 0;
    this.lastGameTickUpdate = 0;

    setInterval(this.run.bind(this), 1000 / Game.FPS);
  }

  run() {
    let currentTime = new Date().getTime();
    if (currentTime >= this.lastGameTickDraw + this.skipTicks) {
      this.draw();
      this.lastGameTickDraw = currentTime;
    }

    if (currentTime >= this.lastGameTickUpdate + this.difficultyTicks) {
      this.update();
      this.lastGameTickUpdate = currentTime;
    }
  }

  update() {
    if (this.movementAllowed(this.currentBlock, this.currentBlock.activeState, 0, 1)) {
      this.currentBlock.moveDown();
    } else {
      this.gameField.addBlockToField(this.currentBlock);
      this.currentBlock = this.getNewRandomTetrisBlock();
    }

    this.gameField.checkAndRemoveFullLines();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
