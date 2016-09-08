import Options from './options';

const FIELD_WIDTH_IN_BLOCKS = 10;
const FIELD_HEIGHT_IN_BLOCKS = 20;

export default class GameField {

  constructor() {
    this.gameField = this.initializeEmptyGameField();
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

    for(var y=0; y<FIELD_HEIGHT_IN_BLOCKS; y++) {
      gameField[y] = new Array();
      for(var x=0; x<FIELD_WIDTH_IN_BLOCKS; x++) {
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
    for(var y=0; y<20; y++) {
      for(var x=0; x<10; x++) {
        if (this.gameField[y][x] != " ") {
          ctx.fillStyle = Options.blockEdgecolor;
          ctx.fillRect(x*Options.blockWidth, y*Options.blockWidth, Options.blockWidth, Options.blockWidth);

          if(this.gameField[y][x] == "I")
            ctx.fillStyle = Options.blockTypeIColor;
          else if(this.gameField[y][x] == "J")
            ctx.fillStyle = Options.blockTypeJColor;
          else if(this.gameField[y][x] == "L")
            ctx.fillStyle = Options.blockTypeLColor;
          else if(this.gameField[y][x] == "O")
            ctx.fillStyle = Options.blockTypeOColor;
          else if(this.gameField[y][x] == "S")
            ctx.fillStyle = Options.blockTypeSColor;
          else if(this.gameField[y][x] == "T")
            ctx.fillStyle = Options.blockTypeTColor;
          else if(this.gameField[y][x] == "Z")
            ctx.fillStyle = Options.blockTypeZColor;
            ctx.fillRect(x*Options.blockWidth + Options.blockEdgeWidth, y*Options.blockWidth + Options.blockEdgeWidth,
                         Options.blockWidth-Options.blockEdgeWidth*2, Options.blockWidth-Options.blockEdgeWidth*2);
        }
      }
    }
  }

  hasFullLines() {
    for(let y=0; y<FIELD_HEIGHT_IN_BLOCKS; y++) {
      var fullLine = true;
      for(let x=0; x<FIELD_WIDTH_IN_BLOCKS; x++) {
        if(this.gameField[y][x] == " ") {
          fullLine = false;
        }
      }
    }
    return fullLine
  }

  shiftAllLinesDownFromLineNumber(number) {
    for(let y=number; y>0; y--) {
      for(let x=0; x<FIELD_WIDTH_IN_BLOCKS; x++) {
        this.level[i][x] = this.level[i-1][x];
      }
    }
  }
}
