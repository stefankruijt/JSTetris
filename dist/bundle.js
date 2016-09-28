/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _canvas = __webpack_require__(1);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _game = __webpack_require__(2);

	var _game2 = _interopRequireDefault(_game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function startGame() {
	  new _game2.default(document.getElementById('tetrisCanvas'));
	}

	document.body.innerHTML = _canvas2.default;

	startGame();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = "\n<div>\n  <canvas id=\"tetrisCanvas\" width=\"250\" height=\"500\" style=\"background-color:#147479\"></canvas>\n</div>\n  ";

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _constants = __webpack_require__(3);

	var constants = _interopRequireWildcard(_constants);

	var _gameField = __webpack_require__(4);

	var _gameField2 = _interopRequireDefault(_gameField);

	var _tetrisBlock = __webpack_require__(5);

	var _tetrisBlock2 = _interopRequireDefault(_tetrisBlock);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	  function Game(canvas) {
	    _classCallCheck(this, Game);

	    var self = this;

	    this.ctx = canvas.getContext("2d");
	    this.blockWidth = canvas.width / constants.FIELD_WIDTH_IN_BLOCKS;
	    this.numberOfLines = 0;
	    this.gameField = new _gameField2.default(canvas);
	    this.currentBlock = self.getNewRandomTetrisBlock();

	    document.body.onkeydown = function (e) {
	      return self.gameEvent(e);
	    };

	    requestAnimationFrame(mainLoop);
	    var lastFrameTimeMs = 0;

	    function mainLoop(timestamp) {
	      if (timestamp < lastFrameTimeMs + 200) {
	        draw();
	        requestAnimationFrame(mainLoop);
	        return;
	      }

	      update();
	      draw();
	      lastFrameTimeMs = timestamp;

	      requestAnimationFrame(mainLoop);
	    }

	    function update() {
	      if (self.movementAllowed(self.currentBlock, self.currentBlock.activeState, 0, 1)) {
	        self.currentBlock.moveDown();
	      } else {
	        self.gameField.addBlockToField(self.currentBlock);
	        self.currentBlock = self.getNewRandomTetrisBlock();
	      }

	      self.gameField.checkAndRemoveFullLines();
	    }

	    function draw() {
	      self.ctx.clearRect(0, 0, canvas.width, canvas.height);
	      self.gameField.drawGameField(self.ctx);
	      self.currentBlock.drawBlock(self.ctx);
	    }
	  }

	  _createClass(Game, [{
	    key: 'getNewRandomTetrisBlock',
	    value: function getNewRandomTetrisBlock() {
	      var randomNumber = Math.floor(Math.random() * constants.TETRIS_BLOCK_CHARACTERS.length);
	      var blockLetter = constants.TETRIS_BLOCK_CHARACTERS.charAt(randomNumber);
	      return new _tetrisBlock2.default(blockLetter, 3, 0, this.blockWidth);
	    }
	  }, {
	    key: 'gameEvent',
	    value: function gameEvent(event) {
	      switch (event.key) {
	        case "ArrowLeft":
	          if (this.movementAllowed(this.currentBlock, this.currentBlock.activeState, -1, 0)) {
	            this.currentBlock.moveLeft();
	          }
	          break;
	        case "ArrowRight":
	          if (this.movementAllowed(this.currentBlock, this.currentBlock.activeState, 1, 0)) {
	            this.currentBlock.moveRight();
	          }
	          break;
	        case "ArrowUp":
	          if (this.movementAllowed(this.currentBlock, this.currentBlock.nextState(), 1, 0)) {
	            this.currentBlock.rotate();
	          }
	          break;
	        case "ArrowDown":
	          if (this.movementAllowed(this.currentBlock, this.currentBlock.activeState, 0, 1)) {
	            this.currentBlock.y = this.currentBlock.y + 1;
	          }
	          break;
	      }
	    }
	  }, {
	    key: 'movementAllowed',
	    value: function movementAllowed(block, state, xMovement, yMovement) {
	      var x = block.x + xMovement;
	      var y = block.y + yMovement;

	      for (var i = 0; i < state.length; i++) {
	        for (var j = 0; j < state[i].length; j++) {
	          if (state[i][j] == 1) {
	            var fieldY = y + i;
	            var fieldX = x + j;

	            if (!this.gameField.inBoundaries(fieldX, fieldY) || this.gameField.occupied(fieldX, fieldY)) {
	              return false;
	            }
	          }
	        }
	      }
	      return true;
	    }
	  }]);

	  return Game;
	}();

	exports.default = Game;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var DEBUG = exports.DEBUG = false;
	var GAME_SPEED = exports.GAME_SPEED = 50;
	var MAX_FPS = exports.MAX_FPS = 60;

	var BLOCK_EDGE_WIDTH = exports.BLOCK_EDGE_WIDTH = 1;
	var FIELD_WIDTH_IN_BLOCKS = exports.FIELD_WIDTH_IN_BLOCKS = 10;
	var FIELD_HEIGHT_IN_BLOCKS = exports.FIELD_HEIGHT_IN_BLOCKS = 20;

	var TETRIS_BLOCK_CHARACTERS = exports.TETRIS_BLOCK_CHARACTERS = 'OIZLJST';

	var BLOCK_EDGE_COLOR = exports.BLOCK_EDGE_COLOR = "#000000"; // black
	var BLOCKTYPE_Z_COLOR = exports.BLOCKTYPE_Z_COLOR = "#FF0000"; // red
	var BLOCKTYPE_I_COLOR = exports.BLOCKTYPE_I_COLOR = "#00FFFF"; // cyan
	var BLOCKTYPE_L_COLOR = exports.BLOCKTYPE_L_COLOR = "#ffa500"; // orange
	var BLOCKTYPE_O_COLOR = exports.BLOCKTYPE_O_COLOR = "#FFFF00"; // yellow
	var BLOCKTYPE_J_COLOR = exports.BLOCKTYPE_J_COLOR = "#0000FF"; // blue
	var BLOCKTYPE_S_COLOR = exports.BLOCKTYPE_S_COLOR = "#008000"; // green
	var BLOCKTYPE_T_COLOR = exports.BLOCKTYPE_T_COLOR = "#800080"; // purple

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _constants = __webpack_require__(3);

	var constants = _interopRequireWildcard(_constants);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameField = function () {
	  function GameField(canvas) {
	    _classCallCheck(this, GameField);

	    this.gameField = this.initializeEmptyGameField();
	    this.block_width = canvas.width / constants.FIELD_WIDTH_IN_BLOCKS;
	  }

	  _createClass(GameField, [{
	    key: 'addBlockToField',
	    value: function addBlockToField(block) {
	      var state = block.activeState;
	      for (var y = 0; y < state.length; y++) {
	        for (var x = 0; x < state[y].length; x++) {

	          if (state[y][x] == 1) {
	            var fieldX = block.x + x;
	            var fieldY = block.y + y;
	            this.gameField[fieldY][fieldX] = block.blockType.blockLetter;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'initializeEmptyGameField',
	    value: function initializeEmptyGameField() {
	      var gameField = new Array();

	      for (var y = 0; y < constants.FIELD_HEIGHT_IN_BLOCKS; y++) {
	        gameField[y] = new Array();
	        for (var x = 0; x < constants.FIELD_WIDTH_IN_BLOCKS; x++) {
	          gameField[y][x] = " ";
	        }
	      }
	      return gameField;
	    }
	  }, {
	    key: 'occupied',
	    value: function occupied(x, y) {
	      if (!this.inBoundaries(x, y)) return false;
	      if (this.gameField[y][x] == ' ') {
	        return false;
	      } else {
	        return true;
	      }
	    }
	  }, {
	    key: 'inBoundaries',
	    value: function inBoundaries(x, y) {
	      if (x < 0 || y < 0) {
	        return false;
	      }

	      // -1 since field starts at x=0 and y=0
	      if (x > constants.FIELD_WIDTH_IN_BLOCKS - 1 || y > constants.FIELD_HEIGHT_IN_BLOCKS - 1) {
	        return false;
	      }

	      return true;
	    }
	  }, {
	    key: 'drawGameField',
	    value: function drawGameField(ctx) {
	      for (var y = 0; y < constants.FIELD_HEIGHT_IN_BLOCKS; y++) {
	        for (var x = 0; x < constants.FIELD_WIDTH_IN_BLOCKS; x++) {
	          if (this.gameField[y][x] != " ") {
	            ctx.fillStyle = constants.BLOCK_EDGE_COLOR;
	            ctx.fillRect(x * this.block_width, y * this.block_width, this.block_width, this.block_width);

	            if (this.gameField[y][x] == "I") ctx.fillStyle = constants.BLOCKTYPE_I_COLOR;else if (this.gameField[y][x] == "J") ctx.fillStyle = constants.BLOCKTYPE_J_COLOR;else if (this.gameField[y][x] == "L") ctx.fillStyle = constants.BLOCKTYPE_L_COLOR;else if (this.gameField[y][x] == "O") ctx.fillStyle = constants.BLOCKTYPE_O_COLOR;else if (this.gameField[y][x] == "S") ctx.fillStyle = constants.BLOCKTYPE_S_COLOR;else if (this.gameField[y][x] == "T") ctx.fillStyle = constants.BLOCKTYPE_T_COLOR;else if (this.gameField[y][x] == "Z") ctx.fillStyle = constants.BLOCKTYPE_Z_COLOR;
	            ctx.fillRect(x * this.block_width + constants.BLOCK_EDGE_WIDTH, y * this.block_width + constants.BLOCK_EDGE_WIDTH, this.block_width - constants.BLOCK_EDGE_WIDTH * 2, this.block_width - constants.BLOCK_EDGE_WIDTH * 2);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'checkAndRemoveFullLines',
	    value: function checkAndRemoveFullLines() {
	      for (var i = 0; i < constants.FIELD_HEIGHT_IN_BLOCKS; i++) {
	        var fullLine = true;

	        for (var x = 0; x < constants.FIELD_WIDTH_IN_BLOCKS; x++) {
	          if (this.gameField[i][x] == " ") {
	            fullLine = false;
	          }
	        }

	        if (fullLine) {
	          this.numberOfLines++;
	          this.removeLine(i);
	        }
	      }
	    }
	  }, {
	    key: 'removeLine',
	    value: function removeLine(from) {
	      for (var i = from; i > 0; i--) {
	        for (var x = 0; x < constants.FIELD_WIDTH_IN_BLOCKS; x++) {
	          var valueAbove = this.gameField[i - 1][x];
	          this.gameField[i][x] = valueAbove;
	        }
	      }
	    }
	  }]);

	  return GameField;
	}();

	exports.default = GameField;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _constants = __webpack_require__(3);

	var constants = _interopRequireWildcard(_constants);

	var _blockType = __webpack_require__(6);

	var _blockType2 = _interopRequireDefault(_blockType);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TetrisBlock = function () {
	  function TetrisBlock(blockType, x, y, blockwidth) {
	    _classCallCheck(this, TetrisBlock);

	    this.blockType = new _blockType2.default(blockType);
	    this._x = x;
	    this._y = y;
	    this._activeState = 0;
	    this._block_width = blockwidth;
	  }

	  _createClass(TetrisBlock, [{
	    key: 'drawBlock',
	    value: function drawBlock(ctx) {
	      var block = this.blockType.states[this._activeState];

	      for (var y = 0; y < block.length; y++) {
	        for (var x = 0; x < block[y].length; x++) {
	          if (block[y][x] == 1) {
	            ctx.fillStyle = constants.BLOCK_EDGE_COLOR;
	            ctx.fillRect((this._x + x) * this.blockWidth, (this._y + y) * this.blockWidth, this.blockWidth, this.blockWidth);
	            ctx.fillStyle = this.blockType.Color;
	            ctx.fillRect((this._x + x) * this.blockWidth + 1, (this._y + y) * this.blockWidth + 1, this.blockWidth - 1 * 2, this.blockWidth - 1 * 2);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'rotate',
	    value: function rotate() {
	      if (this._activeState < this.blockType.numberOfBlockStates() - 1) {
	        this._activeState = this._activeState + 1;
	      } else {
	        this._activeState = 0;
	      }
	    }
	  }, {
	    key: 'nextState',
	    value: function nextState() {
	      var nextState = void 0;
	      if (this._activeState < this.blockType.numberOfBlockStates() - 1) {
	        nextState = this._activeState + 1;
	      } else {
	        nextState = 0;
	      }

	      return this.blockType.states[nextState];
	    }
	  }, {
	    key: 'moveLeft',
	    value: function moveLeft() {
	      this._x--;
	    }
	  }, {
	    key: 'moveRight',
	    value: function moveRight() {
	      this._x++;
	    }
	  }, {
	    key: 'moveDown',
	    value: function moveDown() {
	      this._y++;
	    }
	  }, {
	    key: 'activeState',
	    get: function get() {
	      return this.blockType.states[this._activeState];
	    }
	  }, {
	    key: 'x',
	    set: function set(newValue) {
	      this._x = newValue;
	    },
	    get: function get() {
	      return this._x;
	    }
	  }, {
	    key: 'y',
	    set: function set(newValue) {
	      this._y = newValue;
	    },
	    get: function get() {
	      return this._y;
	    }
	  }, {
	    key: 'blockType',
	    get: function get() {
	      return this._blockType;
	    },
	    set: function set(newBlockType) {
	      this._blockType = newBlockType;
	    }
	  }, {
	    key: 'blockWidth',
	    get: function get() {
	      return this._block_width;
	    }
	  }]);

	  return TetrisBlock;
	}();

	exports.default = TetrisBlock;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _constants = __webpack_require__(3);

	var constants = _interopRequireWildcard(_constants);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var blockTypesI = [[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]]];

	var blockTypesZ = [[[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]]];

	var blockTypesL = [[[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0]], [[1, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];

	var blockTypesO = [[[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]]];

	var blockTypesJ = [[[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]]];

	var blockTypesS = [[[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]], [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];

	var blockTypesT = [[[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];

	var BlockType = function () {
	  function BlockType(blockLetter) {
	    _classCallCheck(this, BlockType);

	    this._blockLetter = blockLetter;

	    switch (blockLetter) {
	      case "I":
	        this._color = constants.BLOCKTYPE_I_COLOR;
	        this._states = blockTypesI;
	        break;
	      case "Z":
	        this._color = constants.BLOCKTYPE_Z_COLOR;
	        this._states = blockTypesZ;
	        break;
	      case "O":
	        this._color = constants.BLOCKTYPE_O_COLOR;
	        this._states = blockTypesO;
	        break;
	      case "L":
	        this._color = constants.BLOCKTYPE_L_COLOR;
	        this._states = blockTypesL;
	        break;
	      case "J":
	        this._color = constants.BLOCKTYPE_J_COLOR;
	        this._states = blockTypesJ;
	        break;
	      case "S":
	        this._color = constants.BLOCKTYPE_S_COLOR;
	        this._states = blockTypesS;
	        break;
	      case "T":
	        this._color = constants.BLOCKTYPE_T_COLOR;
	        this._states = blockTypesT;
	        break;
	    }
	  }

	  _createClass(BlockType, [{
	    key: "numberOfBlockStates",
	    value: function numberOfBlockStates() {
	      return this.states.length;
	    }
	  }, {
	    key: "blockLetter",
	    get: function get() {
	      return this._blockLetter;
	    },
	    set: function set(letter) {
	      return this._blockLetter = letter;
	    }
	  }, {
	    key: "Color",
	    get: function get() {
	      return this._color;
	    },
	    set: function set(color) {
	      this._color = color;
	    }
	  }, {
	    key: "states",
	    get: function get() {
	      return this._states;
	    }
	  }]);

	  return BlockType;
	}();

	exports.default = BlockType;

/***/ }
/******/ ]);