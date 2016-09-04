export default class BlockType {
  constructor(blockType, innerColor, outerColor) {
    this.blockType = blockType;
    this._innerColor = innerColor;
    this._outerColor = outerColor;

    let blockTypesI = [[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
                       [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
                       [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]],
                       [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]]];

    let blockTypesZ = [[[1,1,0,0],[0,1,1,0],[0,0,0,0],[0,0,0,0]],
                        [[0,0,1,0],[0,1,1,0],[0,1,0,0],[0,0,0,0]],
                        [[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]],
                        [[0,1,0,0],[1,1,0,0],[1,0,0,0],[0,0,0,0]]];

    let blockTypesO = [[[0,0,1,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],
                        [[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]],
                        [[0,0,0,0],[1,1,1,0],[1,0,0,0],[0,0,0,0]],
                        [[1,1,0,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]]];

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
        this._states = blockTypesI;
        break;
      case "Z":
        this._states = blockTypesZ;
        break;
      case "O":
        this._states = blockTypesO;
        break;
      case "J":
        this._states = blockTypesJ;
        break;
      case "S":
        this._states = blockTypesS;
        break;
      case "T":
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
