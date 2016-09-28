import * as constants from './constants';

export default class BlockType {
  constructor(blockLetter) {
    this._blockLetter = blockLetter;
    this._outerColor = constants.BLOCK_EDGE_COLOR;

    let blockTypesI = [[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
                       [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]]];

    let blockTypesZ = [[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],
                        [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],
                        [[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],
                        [[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]]];

    let blockTypesL = [[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
                        [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]],
                        [[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],
                        [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]]];

    var blockTypesO = [[[0,1,1,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]]];

    let blockTypesJ = [[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
                        [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],
                        [[0,0,0,0],[1,1,1,0],[0,0,1,0],[0,0,0,0]],
                        [[0,1,0,0],[0,1,0,0],[1,1,0,0],[0,0,0,0]]];

    let blockTypesS = [[[0,1,1,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],
                        [[0,1,0,0],[0,1,1,0],[0,0,1,0],[0,0,0,0]],
                        [[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],
                        [[1,0,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]];


    let blockTypesT = [[[0,1,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
                        [[0,1,0,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],
                        [[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],
                        [[0,1,0,0],[1,1,0,0],[0,1,0,0],[0,0,0,0]]];

    switch(blockLetter) {
      case "I":
        this._innerColor = constants.BLOCKTYPE_I_COLOR;
        this._states = blockTypesI;
        break;
      case "Z":
        this._innerColor = constants.BLOCKTYPE_Z_COLOR;
        this._states = blockTypesZ;
        break;
      case "O":
        this._innerColor = constants.BLOCKTYPE_O_COLOR;
        this._states = blockTypesO;
        break;
      case "L":
        this._innerColor = constants.BLOCKTYPE_L_COLOR;
        this._states = blockTypesL;
        break;
      case "J":
        this._innerColor = constants.BLOCKTYPE_J_COLOR;
        this._states = blockTypesJ;
        break;
      case "S":
        this._innerColor = constants.BLOCKTYPE_S_COLOR;
        this._states = blockTypesS;
        break;
      case "T":
        this._innerColor = constants.BLOCKTYPE_T_COLOR;
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

  get innerColor() {
    return this._innerColor;
  }

  get outerColor() {
    return this._outerColor;
  }

  set innerColor(color) {
    this._innerColor = color;
  }

  set outerColor(color) {
    this._outerColor = color;
  }

  get states() {
    return this._states;
  }
}
