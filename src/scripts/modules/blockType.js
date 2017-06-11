import * as constants from './constants';

const blockTypesI =  [[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
                      [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]]];

const blockTypesZ =  [[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],
                      [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],
                      [[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],
                      [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]]];

const blockTypesL =  [[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
                      [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]],
                      [[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],
                      [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]]];

const blockTypesO =  [[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]];

const blockTypesJ =  [[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
                      [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
                      [[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],
                      [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]];

const blockTypesS = [[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
                     [[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]],
                     [[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],
                     [[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]];

const blockTypesT = [[[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
                     [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],
                     [[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],
                     [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]];

export default class BlockType {
  constructor(blockLetter) {
    this._blockLetter = blockLetter;

    switch(blockLetter) {
      case "I":
        this._color = constants.BLOCKTYPE_I_COLOR;
        this._states = blockTypesI;
        break;
      case "Z":
        this._color = constants.BLOCKTYPE_Z_COLOR;
        this._states = blockTypesZ;
        break;
      case "O":
        this._color = constants.BLOCKTYPE_O_COLOR;
        this._states = blockTypesO;
        break;
      case "L":
        this._color = constants.BLOCKTYPE_L_COLOR;
        this._states = blockTypesL;
        break;
      case "J":
        this._color = constants.BLOCKTYPE_J_COLOR;
        this._states = blockTypesJ;
        break;
      case "S":
        this._color = constants.BLOCKTYPE_S_COLOR;
        this._states = blockTypesS;
        break;
      case "T":
        this._color = constants.BLOCKTYPE_T_COLOR;
        this._states = blockTypesT;
        break;
    }
  }

  numberOfBlockStates() {
    return this.states.length;
  }

  get blockLetter() {
    return this._blockLetter;
  }

  set blockLetter(letter) {
    return this._blockLetter = letter;
  }

  get Color() {
    return this._color;
  }

  set Color(color) {
    this._color = color;
  }

  get states() {
    return this._states;
  }
}