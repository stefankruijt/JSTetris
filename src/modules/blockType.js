import Options from './options';

export default class BlockType {
  constructor(blockType) {
    this.blockType = blockType;
    this._outerColor = Options.blockEdgecolor;

    let blockTypesI = [[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
                       [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
                       [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
                       [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]];

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

    switch(blockType) {
      case "I":
        this._innerColor = Options.blockTypeIColor;
        this._states = blockTypesI;
        break;
      case "Z":
        this._innerColor = Options.blockTypeZColor;
        this._states = blockTypesZ;
        break;
      case "O":
        this._innerColor = Options.blockTypeOColor;
        this._states = blockTypesO;
        break;
      case "L":
        this._innerColor = Options.blockTypeLColor;
        this._states = blockTypesL;
        break;
      case "J":
        this._innerColor = Options.blockTypeJColor;
        this._states = blockTypesJ;
        break;
      case "S":
        this._innerColor = Options.blockTypeSColor;
        this._states = blockTypesS;
        break;
      case "T":
        this._innerColor = Options.blockTypeTColor;
        this._states = blockTypesT;
        break;
    }

    console.log(`BlockType ${blockType} created with inner color of ${this._innerColor} and outerColor ${this._outerColor}`);
  }

  numberOfBlockStates() {
    return this.states.length;
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
