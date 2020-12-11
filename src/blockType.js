import * as constants from './constants'

export default class BlockType {
  constructor (blockLetter) {
    this._blockLetter = blockLetter

    this._color = constants.BLOCKS[blockLetter].color
    this._states = constants.BLOCKS[blockLetter].states
  }

  numberOfBlockStates () {
    return this.states.length
  }

  get blockLetter () {
    return this._blockLetter
  }

  set blockLetter (letter) {
    this._blockLetter = letter
  }

  get Color () {
    return this._color
  }

  set Color (color) {
    this._color = color
  }

  get states () {
    return this._states
  }
}
