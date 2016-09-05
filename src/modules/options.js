const game_width        = 250,
      game_height       = 500,
      block_width       = game_width/10,
      block_edge_width  = 1,
      block_edge_color  = "#000000", // black
      fps               = 1,

      blockTypeZColor = "#FF0000", // red
      blockTypeIColor = "#00FFFF", // cyan
      blockTypeLColor = "#ffa500", // orange
      blockTypeOColor = "#FFFF00", // yellow
      blockTypeJColor = "#0000FF", // blue
      blockTypeSColor = "#008000", // green
      blockTypeTColor = "#800080"; // purple

export default class Options {

  static get game_width() {
    return game_width;
  }

  static get game_height() {
    return game_height;
  }

  static get blockEdgecolor() {
    return block_edge_color;
  }

  static get blockEdgeWidth() {
    return block_edge_width;
  }

  static get blockWidth() {
    return block_width;
  }

  static get frameDuration() {
    return 1000/fps;
  }

  static get blockTypeZColor() {
    return blockTypeZColor;
  }
  static get blockTypeIColor() {
    return blockTypeIColor;
  }
  static get blockTypeLColor() {
    return blockTypeZColor;
  }
  static get blockTypeOColor() {
    return blockTypeOColor;
  }
  static get blockTypeJColor() {
    return blockTypeJColor;
  }
  static get blockTypeSColor() {
    return blockTypeSColor;
  }
  static get blockTypeTColor() {
    return blockTypeTColor;
  }
}
