import * as constants from './constants';
import Player from 'audio-player-es6';

export default class GameField {

  constructor(canvas, game) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.gameField = this.initializeEmptyGameField();
    this.block_width = canvas.width / constants.FIELD_WIDTH_IN_BLOCKS;

    var audio = new Player();
    audio.src('sounds/'+constants.SOUND_MUSIC_FILE1);
    audio.play();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

    for(let y=0; y<constants.FIELD_HEIGHT_IN_BLOCKS; y++) {
      gameField[y] = new Array();
      for(let x=0; x<constants.FIELD_WIDTH_IN_BLOCKS; x++) {
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
    if(x > constants.FIELD_WIDTH_IN_BLOCKS-1 || y > constants.FIELD_HEIGHT_IN_BLOCKS-1) {
      return false;
    }

    return true;
  }

  drawBlock(currentBlock) {
    let block = currentBlock.blockType.states[currentBlock._activeState];
    let blockWidth = currentBlock.blockWidth;

    for(let y=0; y<block.length; y++) {
      for(let x=0; x<block[y].length; x++) {
        if(block[y][x] == 1) {
          this.ctx.fillStyle = constants.BLOCK_EDGE_COLOR;
          this.ctx.fillRect((currentBlock._x+x)*blockWidth,(currentBlock._y+y)*blockWidth,blockWidth,blockWidth);
          this.ctx.fillStyle =  currentBlock.blockType.Color;
          this.ctx.fillRect((currentBlock._x+x)*blockWidth+1,(currentBlock._y+y)*blockWidth+1,blockWidth-1*2,blockWidth-1*2);
        }
      }
    }
  }

  drawGameField() {
    for(let y=0; y<constants.FIELD_HEIGHT_IN_BLOCKS; y++) {
      for(let x=0; x<constants.FIELD_WIDTH_IN_BLOCKS; x++) {
        if (this.gameField[y][x] != " ") {
          this.ctx.fillStyle = constants.BLOCK_EDGE_COLOR;
          this.ctx.fillRect(x*this.block_width, y*this.block_width, this.block_width, this.block_width);

          if(this.gameField[y][x] == "I")
            this.ctx.fillStyle = constants.BLOCKTYPE_I_COLOR;
          else if(this.gameField[y][x] == "J")
            this.ctx.fillStyle = constants.BLOCKTYPE_J_COLOR;
          else if(this.gameField[y][x] == "L")
            this.ctx.fillStyle = constants.BLOCKTYPE_L_COLOR;
          else if(this.gameField[y][x] == "O")
            this.ctx.fillStyle = constants.BLOCKTYPE_O_COLOR;
          else if(this.gameField[y][x] == "S")
            this.ctx.fillStyle = constants.BLOCKTYPE_S_COLOR;
          else if(this.gameField[y][x] == "T")
            this.ctx.fillStyle = constants.BLOCKTYPE_T_COLOR;
          else if(this.gameField[y][x] == "Z")
            this.ctx.fillStyle = constants.BLOCKTYPE_Z_COLOR;
          this.ctx.fillRect(x*this.block_width + constants.BLOCK_EDGE_WIDTH, y*this.block_width + constants.BLOCK_EDGE_WIDTH,
                         this.block_width-constants.BLOCK_EDGE_WIDTH*2, this.block_width-constants.BLOCK_EDGE_WIDTH*2);
        }
      }
    }
  }

  checkAndRemoveFullLines() {
    for(let i=0; i<constants.FIELD_HEIGHT_IN_BLOCKS; i++) {
      var fullLine = true;

      for(let x=0; x<constants.FIELD_WIDTH_IN_BLOCKS; x++) {
        if(this.gameField[i][x] == " ") {
          fullLine = false;
        }
      }

      if(fullLine) {
        this.game.fullLineEvent();
        this.removeLine(i);
      }
    }
  }

  removeLine(from) {
    for(let i = from; i>0; i--) {
      for(let x=0; x<constants.FIELD_WIDTH_IN_BLOCKS; x++) {
        var valueAbove = this.gameField[i-1][x];
        this.gameField[i][x] =  valueAbove;
      }
    }
  }
}
