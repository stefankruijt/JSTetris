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
	  new _game2.default(document.getElementById('tetrisCanvas').getContext('2d'));
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

	var _options = __webpack_require__(3);

	var _options2 = _interopRequireDefault(_options);

	var _gameField = __webpack_require__(4);

	var _gameField2 = _interopRequireDefault(_gameField);

	var _tetrisBlock = __webpack_require__(5);

	var _tetrisBlock2 = _interopRequireDefault(_tetrisBlock);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	  function Game(ctx) {
	    _classCallCheck(this, Game);

	    this.ctx = ctx;
	    var self = this;

	    this.gameField = new _gameField2.default();
	    var level = new Array();

	    this.lastFrameTime = Date.now();
	    this.cumulatedFrameTime = 0;
	    this.numberOfLines = 0;
	    this.currentBlock = self.getNewRandomTetrisBlock();

	    setInterval(function () {
	      var frameDuration = _options2.default.frameDuration;
	      var time = Date.now();
	      var frameTime = time - self.lastFrameTime;
	      var currentBlock = self.currentBlock;

	      self.cumulatedFrameTime += frameTime;

	      while (self.cumulatedFrameTime > frameDuration) {
	        self.lastFrameTime = Date.now();

	        if (self.movementAllowed(currentBlock, 0, 1)) {
	          currentBlock.moveDown();
	        } else {
	          self.gameField.addBlockToField(currentBlock);
	          self.currentBlock = self.getNewRandomTetrisBlock();
	        }

	        if (self.gameField.hasFullLines(level)) {
	          this.shiftAllLinesDownFromLineNumber(i);
	          this.numberOfLines++;
	        }
	        self.cumulatedFrameTime -= frameDuration;
	      }

	      self.ctx.clearRect(0, 0, _options2.default.game_width, _options2.default.game_height);
	      self.gameField.drawGameField(self.ctx);
	      currentBlock.drawBlock(self.ctx);
	    }, _options2.default.frameDuration);

	    document.body.onkeydown = function (e) {
	      return self.gameEvent(e);
	    };
	  }

	  _createClass(Game, [{
	    key: 'getNewRandomTetrisBlock',
	    value: function getNewRandomTetrisBlock() {
	      var random = Math.floor(Math.random() * 7);
	      if (random == 0) return new _tetrisBlock2.default("O", 3, 0);else if (random == 1) return new _tetrisBlock2.default("I", 3, 0);else if (random == 2) return new _tetrisBlock2.default("Z", 3, 0);else if (random == 3) return new _tetrisBlock2.default("L", 3, 0);else if (random == 4) return new _tetrisBlock2.default("J", 3, 0);else if (random == 5) return new _tetrisBlock2.default("S", 3, 0);else if (random == 6) return new _tetrisBlock2.default("T", 3, 0);
	    }
	  }, {
	    key: 'gameEvent',
	    value: function gameEvent(event) {
	      switch (event.key) {
	        case "ArrowLeft":
	          if (this.movementAllowed(this.currentBlock, -1, 0)) {
	            this.currentBlock.moveLeft();
	          }
	          break;
	        case "ArrowRight":
	          if (this.movementAllowed(this.currentBlock, 1, 0)) {
	            this.currentBlock.moveRight();
	          }
	          break;
	        case "ArrowUp":
	          this.currentBlock.rotate();
	          break;
	        case "ArrowDown":
	          if (this.movementAllowed(this.currentBlock, 0, 1)) {
	            this.currentBlock.y = this.currentBlock.y + 1;
	          }
	          break;
	      }
	    }
	  }, {
	    key: 'movementAllowed',
	    value: function movementAllowed(block, xMovement, yMovement) {
	      var x = block.x + xMovement;
	      var y = block.y + yMovement;

	      for (var i = 0; i < block.activeState.length; i++) {
	        for (var j = 0; j < block.activeState[i].length; j++) {
	          if (block.activeState[i][j] == 1) {
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GAME_WIDTH = 250,
	    GAME_HEIGHT = 500,
	    BLOCK_WIDTH = GAME_WIDTH / 10,
	    BLOCK_EDGE_WIDTH = 1,
	    BLOCK_EDGE_COLOR = "#000000",
	    // black
	FPS = 10,
	    BLOCKTYPE_Z_COLOR = "#FF0000",
	    // red
	BLOCKTYPE_I_COLOR = "#00FFFF",
	    // cyan
	BLOCKTYPE_L_COLOR = "#ffa500",
	    // orange
	BLOCKTYPE_O_COLOR = "#FFFF00",
	    // yellow
	BLOCKTYPE_J_COLOR = "#0000FF",
	    // blue
	BLOCKTYPE_S_COLOR = "#008000",
	    // green
	BLOCKTYPE_T_COLOR = "#800080"; // purple

	var Options = function () {
	  function Options() {
	    _classCallCheck(this, Options);
	  }

	  _createClass(Options, null, [{
	    key: "game_width",
	    get: function get() {
	      return GAME_WIDTH;
	    }
	  }, {
	    key: "game_height",
	    get: function get() {
	      return GAME_HEIGHT;
	    }
	  }, {
	    key: "blockEdgeWidth",
	    get: function get() {
	      return BLOCK_EDGE_WIDTH;
	    }
	  }, {
	    key: "blockEdgecolor",
	    get: function get() {
	      return BLOCK_EDGE_COLOR;
	    }
	  }, {
	    key: "blockWidth",
	    get: function get() {
	      return BLOCK_WIDTH;
	    }
	  }, {
	    key: "frameDuration",
	    get: function get() {
	      return 1000 / FPS;
	    }
	  }, {
	    key: "blockTypeZColor",
	    get: function get() {
	      return BLOCKTYPE_Z_COLOR;
	    }
	  }, {
	    key: "blockTypeIColor",
	    get: function get() {
	      return BLOCKTYPE_I_COLOR;
	    }
	  }, {
	    key: "blockTypeLColor",
	    get: function get() {
	      return BLOCKTYPE_L_COLOR;
	    }
	  }, {
	    key: "blockTypeOColor",
	    get: function get() {
	      return BLOCKTYPE_O_COLOR;
	    }
	  }, {
	    key: "blockTypeJColor",
	    get: function get() {
	      return BLOCKTYPE_J_COLOR;
	    }
	  }, {
	    key: "blockTypeSColor",
	    get: function get() {
	      return BLOCKTYPE_S_COLOR;
	    }
	  }, {
	    key: "blockTypeTColor",
	    get: function get() {
	      return BLOCKTYPE_T_COLOR;
	    }
	  }]);

	  return Options;
	}();

	exports.default = Options;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _options = __webpack_require__(3);

	var _options2 = _interopRequireDefault(_options);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FIELD_WIDTH_IN_BLOCKS = 10;
	var FIELD_HEIGHT_IN_BLOCKS = 20;

	var GameField = function () {
	  function GameField() {
	    _classCallCheck(this, GameField);

	    this.gameField = this.initializeEmptyGameField();
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

	      for (var y = 0; y < FIELD_HEIGHT_IN_BLOCKS; y++) {
	        gameField[y] = new Array();
	        for (var x = 0; x < FIELD_WIDTH_IN_BLOCKS; x++) {
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
	      if (x > FIELD_WIDTH_IN_BLOCKS - 1 || y > FIELD_HEIGHT_IN_BLOCKS - 1) {
	        return false;
	      }

	      return true;
	    }
	  }, {
	    key: 'drawGameField',
	    value: function drawGameField(ctx) {
	      for (var y = 0; y < 20; y++) {
	        for (var x = 0; x < 10; x++) {
	          if (this.gameField[y][x] != " ") {
	            ctx.fillStyle = _options2.default.blockEdgecolor;
	            ctx.fillRect(x * _options2.default.blockWidth, y * _options2.default.blockWidth, _options2.default.blockWidth, _options2.default.blockWidth);

	            if (this.gameField[y][x] == "I") ctx.fillStyle = _options2.default.blockTypeIColor;else if (this.gameField[y][x] == "J") ctx.fillStyle = _options2.default.blockTypeJColor;else if (this.gameField[y][x] == "L") ctx.fillStyle = _options2.default.blockTypeLColor;else if (this.gameField[y][x] == "O") ctx.fillStyle = _options2.default.blockTypeOColor;else if (this.gameField[y][x] == "S") ctx.fillStyle = _options2.default.blockTypeSColor;else if (this.gameField[y][x] == "T") ctx.fillStyle = _options2.default.blockTypeTColor;else if (this.gameField[y][x] == "Z") ctx.fillStyle = _options2.default.blockTypeZColor;
	            ctx.fillRect(x * _options2.default.blockWidth + _options2.default.blockEdgeWidth, y * _options2.default.blockWidth + _options2.default.blockEdgeWidth, _options2.default.blockWidth - _options2.default.blockEdgeWidth * 2, _options2.default.blockWidth - _options2.default.blockEdgeWidth * 2);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'hasFullLines',
	    value: function hasFullLines() {
	      for (var y = 0; y < FIELD_HEIGHT_IN_BLOCKS; y++) {
	        var fullLine = true;
	        for (var x = 0; x < FIELD_WIDTH_IN_BLOCKS; x++) {
	          if (this.gameField[y][x] == " ") {
	            fullLine = false;
	          }
	        }
	      }
	      return fullLine;
	    }
	  }, {
	    key: 'shiftAllLinesDownFromLineNumber',
	    value: function shiftAllLinesDownFromLineNumber(number) {
	      for (var y = number; y > 0; y--) {
	        for (var x = 0; x < FIELD_WIDTH_IN_BLOCKS; x++) {
	          this.level[i][x] = this.level[i - 1][x];
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

	var _blockType = __webpack_require__(6);

	var _blockType2 = _interopRequireDefault(_blockType);

	var _options = __webpack_require__(3);

	var _options2 = _interopRequireDefault(_options);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TetrisBlock = function () {
	  function TetrisBlock(blockType, x, y) {
	    _classCallCheck(this, TetrisBlock);

	    this.blockType = new _blockType2.default(blockType);
	    this._x = x;
	    this._y = y;
	    this._activeState = 0;
	    this._block_width = 20;
	  }

	  _createClass(TetrisBlock, [{
	    key: 'drawBlock',
	    value: function drawBlock(ctx) {
	      var block = this.blockType.states[this._activeState];

	      for (var y = 0; y < block.length; y++) {
	        for (var x = 0; x < block[y].length; x++) {
	          if (block[y][x] == 1) {
	            ctx.fillStyle = this.blockType.outerColor;
	            ctx.fillRect((this._x + x) * _options2.default.blockWidth, (this._y + y) * _options2.default.blockWidth, _options2.default.blockWidth, _options2.default.blockWidth);
	            ctx.fillStyle = this.blockType.innerColor;
	            ctx.fillRect((this._x + x) * _options2.default.blockWidth + 1, (this._y + y) * _options2.default.blockWidth + 1, _options2.default.blockWidth - 1 * 2, _options2.default.blockWidth - 1 * 2);
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
	  }]);

	  return TetrisBlock;
	}();

	/*

	this.getInnerColor = function()
	{
	if(type == "I")
	return I_color;
	else if(type == "J")
	return J_color;
	else if(type == "L")
	return L_color;
	else if(type == "O")
	return O_color;
	else if(type == "S")
	return S_color;
	else if(type == "T")
	return T_color;
	else if(type == "Z")
	return Z_color;
	}

	this.getOuterColor = function()
	{
	return blockEdgecolor;
	}

	this.rotate = function(level)
	{
	if(type == "I")
	{
	if(state == "I0")
	{
	if(rotateAlowed(I1, level, this.x, this.y))
	{
	this.array = I1;
	state = "I1";
	}
	}
	else if (state == "I1")
	{
	if(rotateAlowed(I2, level, this.x, this.y))
	{
	this.array = I2;
	state = "I2";
	}
	}
	else if(state == "I2")
	{
	if(rotateAlowed(I3, level, this.x, this.y))
	{
	this.array = I3;
	state = "I3";
	}
	}
	else if (state == "I3")
	{
	if(rotateAlowed(I0, level, this.x, this.y))
	{
	this.array = I0;
	state = "I0";
	}
	}
	}

	else if(type == "Z")
	{
	if(state == "Z0")
	{
	if(rotateAlowed(Z1, level, this.x, this.y))
	{
	this.array = Z1;
	state = "Z1";
	}
	}
	else if (state == "Z1")
	{
	if(rotateAlowed(Z2, level, this.x, this.y))
	{
	this.array = Z2;
	state = "Z2";
	}
	}
	else if(state == "Z2")
	{
	if(rotateAlowed(Z3, level, this.x, this.y))
	{
	this.array = Z3;
	state = "Z3";
	}
	}
	else if (state == "Z3")
	{
	if(rotateAlowed(Z0, level, this.x, this.y))
	{
	this.array = Z0;
	state = "Z0";
	}
	}
	}

	if(type == "O")
	{
	}

	if(type == "L")
	{
	if(state == "L0")
	{
	if(rotateAlowed(L1, level, this.x, this.y))
	{
	this.array = L1;
	state = "L1";
	}
	}
	else if (state == "L1")
	{
	if(rotateAlowed(L2, level, this.x, this.y))
	{
	this.array = L2;
	state = "L2";
	}
	}
	else if(state == "L2")
	{
	if(rotateAlowed(L3, level, this.x, this.y))
	{
	this.array = L3;
	state = "L3";
	}
	}
	else if (state == "L3")
	{
	if(rotateAlowed(L0, level, this.x, this.y))
	{
	this.array = L0;
	state = "L0";
	}
	}
	}

	if(type == "J")
	{
	if(state == "J0")
	{
	if(rotateAlowed(J1, level, this.x, this.y))
	{
	this.array = J1;
	state = "J1";
	}
	}
	else if (state == "J1")
	{
	if(rotateAlowed(J2, level, this.x, this.y))
	{
	this.array = J2;
	state = "J2";
	}
	}
	else if(state == "J2")
	{
	if(rotateAlowed(J3, level, this.x, this.y))
	{
	this.array = J3;
	state = "J3";
	}
	}
	else if (state == "J3")
	{
	if(rotateAlowed(J0, level, this.x, this.y))
	{
	this.array = J0;
	state = "J0";
	}
	}
	}

	if(type == "S")
	{
	if(state == "S0")
	{
	if(rotateAlowed(S1, level, this.x, this.y))
	{
	this.array = S1;
	state = "S1";
	}
	}
	else if (state == "S1")
	{
	if(rotateAlowed(S2, level, this.x, this.y))
	{
	this.array = S2;
	state = "S2";
	}
	}
	else if(state == "S2")
	{
	if(rotateAlowed(S3, level, this.x, this.y))
	{
	this.array = S3;
	state = "S3";
	}
	}
	else if (state == "S3")
	{
	if(rotateAlowed(S0, level, this.x, this.y))
	{
	this.array = S0;
	state = "S0";
	}
	}
	}

	if(type == "T")
	{
	if(state == "T0")
	{
	if(rotateAlowed(T1, level, this.x, this.y))
	{
	this.array = T1;
	state = "T1";
	}
	}
	else if (state == "T1")
	{
	if(rotateAlowed(T2, level, this.x, this.y))
	{
	this.array = T2;
	state = "T2";
	}
	}
	else if(state == "T2")
	{
	if(rotateAlowed(T3, level, this.x, this.y))
	{
	this.array = T3;
	state = "T3";
	}
	}
	else if (state == "T3")
	{
	if(rotateAlowed(T0, level, this.x, this.y))
	{
	this.array = T0;
	state = "T0";
	}
	}
	}
	}

	function rotateAlowed(newPositions, level, blockx, blocky)
	{
	for(var searchY=0; searchY<4; searchY++)
	{
	for (var searchX = 0; searchX < 4; searchX++)
	{
	if(newPositions[searchY][searchX] == 1)
	{
	var x2 = blockx + searchX;
	var y2 = blocky + searchY;
	if(x2>10)
	{
	return false;
	}
	else if(y2>20)
	{
	return false;
	}

	else if(level[y2][x2] != " ")
	{
	return false;
	}
	}
	}
	}
	return true;
	}
	}*/


	exports.default = TetrisBlock;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _options = __webpack_require__(3);

	var _options2 = _interopRequireDefault(_options);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BlockType = function () {
	  function BlockType(blockLetter) {
	    _classCallCheck(this, BlockType);

	    this._blockLetter = blockLetter;
	    this._outerColor = _options2.default.blockEdgecolor;

	    var blockTypesI = [[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]];

	    var blockTypesZ = [[[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]]];

	    var blockTypesL = [[[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0]], [[1, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];

	    var blockTypesO = [[[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]]];

	    var blockTypesJ = [[[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]]];

	    var blockTypesS = [[[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]], [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];

	    var blockTypesT = [[[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];

	    switch (blockLetter) {
	      case "I":
	        this._innerColor = _options2.default.blockTypeIColor;
	        this._states = blockTypesI;
	        break;
	      case "Z":
	        this._innerColor = _options2.default.blockTypeZColor;
	        this._states = blockTypesZ;
	        break;
	      case "O":
	        this._innerColor = _options2.default.blockTypeOColor;
	        this._states = blockTypesO;
	        break;
	      case "L":
	        this._innerColor = _options2.default.blockTypeLColor;
	        this._states = blockTypesL;
	        break;
	      case "J":
	        this._innerColor = _options2.default.blockTypeJColor;
	        this._states = blockTypesJ;
	        break;
	      case "S":
	        this._innerColor = _options2.default.blockTypeSColor;
	        this._states = blockTypesS;
	        break;
	      case "T":
	        this._innerColor = _options2.default.blockTypeTColor;
	        this._states = blockTypesT;
	        break;
	    }

	    console.log("BlockType " + this._blockLetter + " created with inner color of " + this._innerColor + " and outerColor " + this._outerColor);
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
	    key: "innerColor",
	    get: function get() {
	      return this._innerColor;
	    },
	    set: function set(color) {
	      this._innerColor = color;
	    }
	  }, {
	    key: "outerColor",
	    get: function get() {
	      return this._outerColor;
	    },
	    set: function set(color) {
	      this._outerColor = color;
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