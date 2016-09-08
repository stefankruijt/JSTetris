import Options from './options';
import GameField from './gameField';
import TetrisBlock from './tetrisBlock';

export default class Game {

  constructor(ctx) {
    this.ctx = ctx;
    var self = this;

    this.gameField = new GameField();
    var level = new Array();

    this.lastFrameTime = Date.now();
    this.cumulatedFrameTime = 0;
    this.numberOfLines = 0;
    this.currentBlock = self.getNewRandomTetrisBlock();

    setInterval(function() {
      let frameDuration = Options.frameDuration;
      var time = Date.now();
      var frameTime = time - self.lastFrameTime;
      let currentBlock = self.currentBlock;

      self.cumulatedFrameTime += frameTime;

      while(self.cumulatedFrameTime > frameDuration) {
        self.lastFrameTime = Date.now();

        if(self.movementAllowed(currentBlock, 0, 1)) {
          currentBlock.moveDown();
        }
        else {
          self.gameField.addBlockToField(currentBlock);
          self.currentBlock = self.getNewRandomTetrisBlock();
        }

        if (self.gameField.hasFullLines(level)) {
          this.shiftAllLinesDownFromLineNumber(i);
          this.numberOfLines++;
        }
        self.cumulatedFrameTime -= frameDuration;
      }

      self.ctx.clearRect(0, 0, Options.game_width, Options.game_height);
      self.gameField.drawGameField(self.ctx);
      currentBlock.drawBlock(self.ctx);
    }, Options.frameDuration);

    document.body.onkeydown = (e) => self.gameEvent(e);
  }

  getNewRandomTetrisBlock() {
    let random = Math.floor(Math.random()*7)
    if(random == 0) return new TetrisBlock("O", 3, 0);
    else if(random == 1) return new TetrisBlock("I", 3, 0);
    else if(random == 2) return new TetrisBlock("Z", 3, 0);
    else if(random == 3) return new TetrisBlock("L", 3, 0);
    else if(random == 4) return new TetrisBlock("J", 3, 0);
    else if(random == 5) return new TetrisBlock("S", 3, 0);
    else if(random == 6) return new TetrisBlock("T", 3, 0);
  }

  gameEvent(event) {
    switch(event.key) {
      case "ArrowLeft":
        if(this.movementAllowed(this.currentBlock,-1,0)) {
          this.currentBlock.moveLeft();
        }
        break;
      case "ArrowRight":
        if(this.movementAllowed(this.currentBlock,1,0)) {
          this.currentBlock.moveRight();
        }
        break;
      case "ArrowUp":
        this.currentBlock.rotate();
        break;
      case "ArrowDown":
        if(this.movementAllowed(this.currentBlock,0,1)) {
          this.currentBlock.y = this.currentBlock.y + 1;
        }
        break;
    }
  }

  movementAllowed(block, xMovement, yMovement) {
    let x = block.x + xMovement;
    let y = block.y + yMovement;

    for(var i=0; i<block.activeState.length; i++) {
      for(var j=0; j<block.activeState[i].length; j++) {
        if(block.activeState[i][j] == 1) {
          var fieldY = y + i;
          var fieldX = x + j;

          if(!this.gameField.inBoundaries(fieldX, fieldY) || this.gameField.occupied(fieldX, fieldY)) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
