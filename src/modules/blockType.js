export default class BlockType {
  constructor(blockType, states, innerColor, outerColor) {
    this.blockType = blockType;
    this.states = states;
    this._innerColor = innerColor;
    this._outerColor = outerColor;

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
}
