import Options from './options';
import GameField from './gameField';
import TetrisBlock from './tetrisBlock';

export default class Game {

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.blockWidth = canvas.width / 10;
    this.numberOfLines = 0;
    var self = this;

    this.gameField = new GameField(canvas);
    this.currentBlock = self.getNewRandomTetrisBlock();


    document.body.onkeydown = (e) => self.gameEvent(e);

    requestAnimationFrame(mainLoop);
    var lastFrameTimeMs = 0;
    var maxFPS = 60;

    function mainLoop(timestamp) {
      if (timestamp < lastFrameTimeMs + 200) {
        draw();
        requestAnimationFrame(mainLoop);
        return;
      }

      update();
      draw();
      lastFrameTimeMs = timestamp;

      requestAnimationFrame(mainLoop);
    }

    function update() {
      if(self.movementAllowed(self.currentBlock, self.currentBlock.activeState, 0, 1)) {
         self.currentBlock.moveDown();
      }
      else {
        self.gameField.addBlockToField(self.currentBlock);
        self.currentBlock = self.getNewRandomTetrisBlock();
      }

      self.gameField.checkAndRemoveFullLines();
    }

    function draw() {
      self.ctx.clearRect(0, 0, canvas.width, canvas.height);
      self.gameField.drawGameField(self.ctx);
      self.currentBlock.drawBlock(self.ctx);
    }
  }

  getNewRandomTetrisBlock() {
    let random = Math.floor(Math.random()*7)
    if(random == 0) return new TetrisBlock("O", 3, 0, this.blockWidth);
    else if(random == 1) return new TetrisBlock("I", 3, 0, this.blockWidth);
    else if(random == 2) return new TetrisBlock("Z", 3, 0, this.blockWidth);
    else if(random == 3) return new TetrisBlock("L", 3, 0, this.blockWidth);
    else if(random == 4) return new TetrisBlock("J", 3, 0, this.blockWidth);
    else if(random == 5) return new TetrisBlock("S", 3, 0, this.blockWidth);
    else if(random == 6) return new TetrisBlock("T", 3, 0, this.blockWidth);
  }

  gameEvent(event) {
    switch(event.key) {
      case "ArrowLeft":
        if(this.movementAllowed(this.currentBlock,this.currentBlock.activeState,-1,0)) {
          this.currentBlock.moveLeft();
        }
        break;
      case "ArrowRight":
        if(this.movementAllowed(this.currentBlock,this.currentBlock.activeState,1,0)) {
          this.currentBlock.moveRight();
        }
        break;
      case "ArrowUp":
        if(this.movementAllowed(this.currentBlock,this.currentBlock.nextState(),1,0)) {
          this.currentBlock.rotate();
        }
        break;
      case "ArrowDown":
        if(this.movementAllowed(this.currentBlock,this.currentBlock.activeState,0,1)) {
          this.currentBlock.y = this.currentBlock.y + 1;
        }
        break;
    }
  }

  movementAllowed(block, state, xMovement, yMovement) {
    let x = block.x + xMovement;
    let y = block.y + yMovement;

    for(var i=0; i<state.length; i++) {
      for(var j=0; j<state[i].length; j++) {
        if(state[i][j] == 1) {
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
