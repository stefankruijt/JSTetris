import Options from './options';
import TetrisBlock from './tetrisBlock';

export default class Game {

  constructor(ctx) {
    var self = this;

    var level = new Array();
    this.level = this.initializeEmptyLevel(level);
    this.ctx = ctx;
    this.lastFrameTime = Date.now();
    this.cumulatedFrameTime = 0;
    this.numberOfLines = 0;
    this.gameStepTime = Options.frameDuration;
    this.currentBlock;

    this.addRandomBlock();

    setInterval(function() {
      var time = Date.now();
      var frameTime = time - self.lastFrameTime;
      let currentBlock = self.currentBlock;

      self.cumulatedFrameTime += frameTime;

      while(self.cumulatedFrameTime > self.gameStepTime) {
        self.lastFrameTime = Date.now();

        if(self.checkOffset(currentBlock,0,1)) {
          currentBlock.y = currentBlock.y + 1;
        }
        else {
          console.log("write block to array");
          //self.writeToArray(self.currentBlock);
          self.addRandomBlock();
        }

        //checkAndRemoveFullLines();
        self.cumulatedFrameTime -= self.gameStepTime;
      }

      self.ctx.clearRect(0, 0, Options.game_width, Options.game_height);
      self.drawArrayBlocks(self.ctx);
      currentBlock.drawBlock(self.ctx);
    }, 33);

    document.body.onkeydown = (e) => self.gameEvent(e);
  }

  initializeEmptyLevel(level) {
    for(var y=0; y<20; y++) {
      level[y] = new Array();
      for(var x=0; x<10; x++) {
        level[y][x] = " ";
      }
    }
    return level;
  }

  drawArrayBlocks() {
    for(var y=0; y<20; y++) {
      for(var x=0; x<10; x++) {
        if (this.level[y][x] != " ") {
          ctx.fillStyle = Options.blockEdgecolor;
          ctx.fillRect(x*_block_width,y*_block_width,_block_width,_block_width);
          if(level[y][x] == "I")
            ctx.fillStyle = I_color;
          else if(level[y][x] == "J")
            ctx.fillStyle = J_color
          else if(level[y][x] == "L")
            ctx.fillStyle = L_color
          else if(level[y][x] == "O")
            ctx.fillStyle = O_color
          else if(level[y][x] == "S")
            ctx.fillStyle = S_color
          else if(level[y][x] == "T")
            ctx.fillStyle = T_color
          else if(level[y][x] == "Z")
            ctx.fillStyle = Z_color;
          ctx.fillRect(x*_block_width+_blockedges,y*_block_width+_blockedges,_block_width-_blockedges*2,_block_width-_blockedges*2);
        }
      }
    }
  }

  addRandomBlock() {
    let randomnumber = Math.floor(Math.random()*7)
    if(randomnumber == 0) this.currentBlock = new TetrisBlock("O", 3, 0);
    else if(randomnumber == 1) this.currentBlock = new TetrisBlock("I", 3, 0);
    else if(randomnumber == 2) this.currentBlock = new TetrisBlock("Z", 3, 0);
    else if(randomnumber == 3) this.currentBlock = new TetrisBlock("L", 3, 0);
    else if(randomnumber == 4) this.currentBlock = new TetrisBlock("J", 3, 0);
    else if(randomnumber == 5) this.currentBlock = new TetrisBlock("S", 3, 0);
    else if(randomnumber == 6) this.currentBlock = new TetrisBlock("T", 3, 0);
  }

  gameEvent(event) {
    switch(event.key) {
      case "ArrowLeft":
      if(this.checkOffset(this.currentBlock,-1,0)) {
        this.currentBlock.x = this.currentBlock.x - 1;
      }
        break;
      case "ArrowRight":
        if(this.checkOffset(this.currentBlock,1,0)) {
          this.currentBlock.x = this.currentBlock.x + 1;
        }
        break;
      case "ArrowUp":
        console.log("rotate");
        break;
      case "ArrowDown":
        if(this.checkOffset(this.currentBlock,0,1)) {
          this.currentBlock.y = this.currentBlock.y + 1;
        }
        break;
    }
  }

  writeToArray(block) {
    for(var y=0; y<4; y++) {
      for (var x=0; x<4; x++) {
        if(block.getActiveState[y][x] == 1) {
          var fieldX = block.x + x;
          var fieldY = block.y + y;
          level[fieldY][fieldX] = block.type;
        }
      }
    }
  }

  checkOffset(block, offsetX, offsetY) {
    for(var y=0; y<4; y++) {
      for(var x=0; x<4; x++) {
        if(block.activeState[y][x] == 1) {
          var fieldX = block.x + x;
          var fieldY = block.y + y;
          if(this.ocupied(fieldX+offsetX, fieldY+offsetY)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  ocupied(x, y) {
    if(y>=20)
      return true;
    if(x<0)
      return true;
    if(x>10)
      return true;
    if(this.level[y][x] != ' ') {
      return true;
    }
    else {
      return false;
    }
  }
}
