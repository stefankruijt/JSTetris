import * as constants from './constants'

export default class GameField {
  constructor (canvas, game) {
    this.game = game
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.gameField = this.initializeEmptyGameField()
    this.block_width = canvas.width / constants.FIELD_WIDTH_IN_BLOCKS
  }

  clear () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  addBlockToField (block) {
    const state = block.activeState
    for (let y = 0; y < state.length; y++) {
      for (let x = 0; x < state[y].length; x++) {
        if (state[y][x] === 1) {
          const fieldX = block.x + x
          const fieldY = block.y + y
          this.gameField[fieldY][fieldX] = block.blockType.blockLetter
        }
      }
    }
  }

  initializeEmptyGameField () {
    const gameField = []

    for (let y = 0; y < constants.FIELD_HEIGHT_IN_BLOCKS; y++) {
      gameField[y] = []
      for (let x = 0; x < constants.FIELD_WIDTH_IN_BLOCKS; x++) {
        gameField[y][x] = ' '
      }
    }
    return gameField
  }

  occupied (x, y) {
    if (!this.inBoundaries(x, y)) return false
    if (this.gameField[y][x] === ' ') {
      return false
    } else {
      return true
    }
  }

  inBoundaries (x, y) {
    // -1 since field starts at x=0 and y=0
    return !(x < 0 || x > constants.FIELD_WIDTH_IN_BLOCKS - 1 || y < 0 || y > constants.FIELD_HEIGHT_IN_BLOCKS - 1)
  }

  drawBlock (currentBlock) {
    const block = currentBlock.blockType.states[currentBlock._activeState]
    const blockWidth = currentBlock.blockWidth

    for (let y = 0; y < block.length; y++) {
      for (let x = 0; x < block[y].length; x++) {
        if (block[y][x] === 1) {
          this.ctx.fillStyle = constants.BLACK
          this.ctx.fillRect((currentBlock._x + x) * blockWidth, (currentBlock._y + y) * blockWidth, blockWidth, blockWidth)
          this.ctx.fillStyle = currentBlock.blockType.Color
          this.ctx.fillRect((currentBlock._x + x) * blockWidth + 1, (currentBlock._y + y) * blockWidth + 1, blockWidth - 1 * 2, blockWidth - 1 * 2)
        }
      }
    }
  }

  drawGameField () {
    for (let y = 0; y < constants.FIELD_HEIGHT_IN_BLOCKS; y++) {
      for (let x = 0; x < constants.FIELD_WIDTH_IN_BLOCKS; x++) {
        const letter = this.gameField[y][x];
        if (this.gameField[y][x] !== ' ') {
          this.ctx.fillStyle = constants.BLACK
          this.ctx.fillRect(x * this.block_width, y * this.block_width, this.block_width, this.block_width)

          this.ctx.fillStyle = constants.BLOCKS[letter].color

          this.ctx.fillRect(x * this.block_width + constants.BLOCK_EDGE_WIDTH, y * this.block_width + constants.BLOCK_EDGE_WIDTH,
            this.block_width - constants.BLOCK_EDGE_WIDTH * 2, this.block_width - constants.BLOCK_EDGE_WIDTH * 2)
        }
      }
    }
  }

  checkAndRemoveFullLines () {
    for (let i = 0; i < constants.FIELD_HEIGHT_IN_BLOCKS; i++) {
      let fullLine = true

      for (let x = 0; x < constants.FIELD_WIDTH_IN_BLOCKS; x++) {
        if (this.gameField[i][x] === ' ') {
          fullLine = false
        }
      }

      if (fullLine) {
        this.game.fullLineEvent()
        this.removeLine(i)
      }
    }
  }

  removeLine (from) {
    for (let i = from; i > 0; i--) {
      for (let x = 0; x < constants.FIELD_WIDTH_IN_BLOCKS; x++) {
        const valueAbove = this.gameField[i - 1][x]
        this.gameField[i][x] = valueAbove
      }
    }
  }
}
