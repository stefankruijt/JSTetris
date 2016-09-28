import * as constants from './constants';

export default class GameField {

  constructor(canvas) {
    this.gameField = this.initializeEmptyGameField();
    this.block_width = canvas.width / FIELD_WIDTH_IN_BLOCKS;
  }

  addBlockToField(block) {
    let state = block.activeState;
    for(let y=0; y<state.length; y++) {
      for(let x=0; x<state[y].length; x++) {

        if(state[y][x] == 1) {
          var fieldX = block.x + x;
          var fieldY = block.y + y;
          this.gameField[fieldY][fieldX] = block.blockType.blockLetter;
        }
      }
    }
  }

  initializeEmptyGameField() {
    let gameField = new Array();

    for(let y=0; y<FIELD_HEIGHT_IN_BLOCKS; y++) {
      gameField[y] = new Array();
      for(let x=0; x<FIELD_WIDTH_IN_BLOCKS; x++) {
        gameField[y][x] = " ";
      }
    }
    return gameField;
  }

  occupied(x, y) {
    if(!this.inBoundaries(x,y)) return false;
    if(this.gameField[y][x] == ' ') {
      return false;
    }
    else {
      return true;
    }
  }

  inBoundaries(x, y) {
    if(x < 0 || y < 0) {
      return false;
    }

    // -1 since field starts at x=0 and y=0
    if(x > FIELD_WIDTH_IN_BLOCKS-1 || y > FIELD_HEIGHT_IN_BLOCKS-1) {
      return false;
    }

    return true;
  }

  drawGameField(ctx) {
    for(let y=0; y<20; y++) {
      for(let x=0; x<10; x++) {
        if (this.gameField[y][x] != " ") {
          ctx.fillStyle = constants.BLOCK_EDGE_COLOR;
          ctx.fillRect(x*this.block_width, y*this.block_width, this.block_width, this.block_width);

          if(this.gameField[y][x] == "I")
            ctx.fillStyle = constants.BLOCKTYPE_I_COLOR;
          else if(this.gameField[y][x] == "J")
            ctx.fillStyle = constants.BLOCKTYPE_J_COLOR;
          else if(this.gameField[y][x] == "L")
            ctx.fillStyle = constants.BLOCKTYPE_L_COLOR;
          else if(this.gameField[y][x] == "O")
            ctx.fillStyle = constants.BLOCKTYPE_O_COLOR;
          else if(this.gameField[y][x] == "S")
            ctx.fillStyle = constants.BLOCKTYPE_S_COLOR;
          else if(this.gameField[y][x] == "T")
            ctx.fillStyle = constants.BLOCKTYPE_T_COLOR;
          else if(this.gameField[y][x] == "Z")
            ctx.fillStyle = constants.BLOCKTYPE_Z_COLOR;
            ctx.fillRect(x*this.block_width + constants.BLOCK_EDGE_WIDTH, y*this.block_width + constants.BLOCK_EDGE_WIDTH,
                         this.block_width-constants.BLOCK_EDGE_WIDTH*2, this.block_width-constants.BLOCK_EDGE_WIDTH*2);
        }
      }
    }
  }

  checkAndRemoveFullLines() {
    for(let i=0; i<20; i++) {
      var fullLine = true;

      for(let x=0; x<10; x++) {
        if(this.gameField[i][x] == " ") {
          fullLine = false;
        }
      }

      if(fullLine) {
        this.numberOfLines++;
        this.removeLine(i);
      }
    }
  }

  removeLine(from) {
    for(let i = from; i>0; i--) {
      for(let x=0; x<10; x++) {
        var valueAbove = this.gameField[i-1][x];
        this.gameField[i][x] =  valueAbove;
      }
    }
  }
}
