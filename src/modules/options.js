const BLOCK_EDGE_WIDTH  = 1,
      BLOCK_EDGE_COLOR  = "#000000", // black
      GAME_SPEED    = 50,
      FPS               = 60,

      BLOCKTYPE_Z_COLOR = "#FF0000", // red
      BLOCKTYPE_I_COLOR = "#00FFFF", // cyan
      BLOCKTYPE_L_COLOR = "#ffa500", // orange
      BLOCKTYPE_O_COLOR = "#FFFF00", // yellow
      BLOCKTYPE_J_COLOR = "#0000FF", // blue
      BLOCKTYPE_S_COLOR = "#008000", // green
      BLOCKTYPE_T_COLOR = "#800080", // purple

      DEBUG             = false;

export default class Options {

  static get blockEdgeWidth() {
    return BLOCK_EDGE_WIDTH;
  }

  static get blockEdgecolor() {
    return BLOCK_EDGE_COLOR;
  }

  static get gameSpeed() {
    return GAME_SPEED;
  }

  static get frameDuration() {
    return 1000/FPS;
  }

  static get blockTypeZColor() {
    return BLOCKTYPE_Z_COLOR;
  }
  static get blockTypeIColor() {
    return BLOCKTYPE_I_COLOR;
  }
  static get blockTypeLColor() {
    return BLOCKTYPE_L_COLOR;
  }
  static get blockTypeOColor() {
    return BLOCKTYPE_O_COLOR;
  }
  static get blockTypeJColor() {
    return BLOCKTYPE_J_COLOR;
  }
  static get blockTypeSColor() {
    return BLOCKTYPE_S_COLOR;
  }
  static get blockTypeTColor() {
    return BLOCKTYPE_T_COLOR;
  }
}
