import * as constants from './constants';
import BlockType from './blockType';

export default class TetrisBlock {
  constructor(blockType, x, y, blockwidth) {
    this.blockType = new BlockType(blockType);
    this._x = x;
    this._y = y;
    this._activeState=0;
    this._block_width = blockwidth;
  }

  drawBlock(ctx) {
    let block = this.blockType.states[this._activeState];

    for(let y=0; y<block.length; y++) {
      for(let x=0; x<block[y].length; x++) {
        if(block[y][x] == 1) {
          ctx.fillStyle = constants.BLOCK_EDGE_COLOR;
          ctx.fillRect((this._x+x)*this.blockWidth,(this._y+y)*this.blockWidth,this.blockWidth,this.blockWidth);
          ctx.fillStyle =  this.blockType.Color;
          ctx.fillRect((this._x+x)*this.blockWidth+1,(this._y+y)*this.blockWidth+1,this.blockWidth-1*2,this.blockWidth-1*2);
        }
      }
    }
  }

  rotate() {
    if(this._activeState < this.blockType.numberOfBlockStates()-1) {
      this._activeState = this._activeState + 1;
    }
    else {
      this._activeState = 0;
    }
  }

  nextState() {
    let nextState;
    if(this._activeState < this.blockType.numberOfBlockStates()-1) {
      nextState = this._activeState + 1;
    }
    else {
      nextState = 0;
    }

    return this.blockType.states[nextState];
  }

  moveLeft() {
    this._x--;
  }

  moveRight() {
    this._x++;
  }

  moveDown() {
    this._y++;
  }

  get activeState() {
    return this.blockType.states[this._activeState];
  }

  set x(newValue) {
    this._x = newValue;
  }

  get x() {
    return this._x;
  }

  set y(newValue) {
    this._y = newValue;
  }

  get y() {
    return this._y;
  }

  get blockType() {
    return this._blockType;
  }

  set blockType(newBlockType) {
    this._blockType = newBlockType;
  }

  get blockWidth() {
    return this._block_width;
  }
}
