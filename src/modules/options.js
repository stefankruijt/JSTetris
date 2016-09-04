const game_width        = 200,
      game_height       = 400,
      block_width       = 20,
      block_edge_width  = 1,
      block_edge_color  = "#000000", // red
      fps               = 1;

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
}
