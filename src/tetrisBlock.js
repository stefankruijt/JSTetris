import BlockType from './blockType'

export default class TetrisBlock {
  constructor (blockType, x, y, blockwidth) {
    this.blockType = new BlockType(blockType)
    this._x = x
    this._y = y
    this._activeState = 0
    this._block_width = blockwidth
  }

  drawBlock (ctx) {

  }

  rotate () {
    this._activeState = this.nextStateNumber()
  }

  nextState () {
    return this.blockType.states[this.nextStateNumber()]
  }

  nextStateNumber () {
    let nextState
    if (this._activeState < this.blockType.numberOfBlockStates() - 1) {
      nextState = this._activeState + 1
    } else {
      nextState = 0
    }

    return nextState
  }

  moveLeft () {
    this._x--
  }

  moveRight () {
    this._x++
  }

  moveDown () {
    this._y++
  }

  get activeState () {
    return this.blockType.states[this._activeState]
  }

  set x (newValue) {
    this._x = newValue
  }

  get x () {
    return this._x
  }

  set y (newValue) {
    this._y = newValue
  }

  get y () {
    return this._y
  }

  get blockType () {
    return this._blockType
  }

  set blockType (newBlockType) {
    this._blockType = newBlockType
  }

  get blockWidth () {
    return this._block_width
  }
}
