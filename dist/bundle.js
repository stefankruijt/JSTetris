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

	var game;

	function startGame() {
	  game = new _game2.default(document.getElementById('tetrisCanvas').getContext('2d'));
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

	var _tetrisBlock = __webpack_require__(4);

	var _tetrisBlock2 = _interopRequireDefault(_tetrisBlock);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	  function Game(ctx) {
	    _classCallCheck(this, Game);

	    var self = this;

	    var level = new Array();
	    this.level = this.initializeEmptyLevel(level);
	    this.ctx = ctx;
	    this.lastFrameTime = Date.now();
	    this.cumulatedFrameTime = 0;
	    this.numberOfLines = 0;
	    this.currentBlock;

	    this.addRandomBlock();

	    setInterval(function () {
	      var frameDuration = _options2.default.frameDuration;
	      var time = Date.now();
	      var frameTime = time - self.lastFrameTime;
	      var currentBlock = self.currentBlock;

	      self.cumulatedFrameTime += frameTime;

	      while (self.cumulatedFrameTime > frameDuration) {
	        self.lastFrameTime = Date.now();

	        if (self.checkOffset(currentBlock, 0, 1)) {
	          currentBlock.moveDown();
	        } else {
	          self.writeToArray(currentBlock);
	          self.addRandomBlock();
	        }

	        self.checkAndRemoveFullLines();
	        self.cumulatedFrameTime -= frameDuration;
	      }

	      self.ctx.clearRect(0, 0, _options2.default.game_width, _options2.default.game_height);
	      self.drawArrayBlocks(self.ctx);
	      currentBlock.drawBlock(self.ctx);
	    }, 33);

	    document.body.onkeydown = function (e) {
	      return self.gameEvent(e);
	    };
	  }

	  _createClass(Game, [{
	    key: 'initializeEmptyLevel',
	    value: function initializeEmptyLevel(level) {
	      for (var y = 0; y < 20; y++) {
	        level[y] = new Array();
	        for (var x = 0; x < 10; x++) {
	          level[y][x] = " ";
	        }
	      }
	      return level;
	    }
	  }, {
	    key: 'drawArrayBlocks',
	    value: function drawArrayBlocks(ctx) {
	      for (var y = 0; y < 20; y++) {
	        for (var x = 0; x < 10; x++) {
	          if (this.level[y][x] != " ") {
	            ctx.fillStyle = _options2.default.blockEdgecolor;
	            ctx.fillRect(x * _options2.default.blockWidth, y * _options2.default.blockWidth, _options2.default.blockWidth, _options2.default.blockWidth);
	            if (this.level[y][x] == "I") ctx.fillStyle = _options2.default.blockTypeIColor;else if (this.level[y][x] == "J") ctx.fillStyle = _options2.default.blockTypeJColor;else if (this.level[y][x] == "L") ctx.fillStyle = _options2.default.blockTypeLColor;else if (this.level[y][x] == "O") ctx.fillStyle = _options2.default.blockTypeOColor;else if (this.level[y][x] == "S") ctx.fillStyle = _options2.default.blockTypeSColor;else if (this.level[y][x] == "T") ctx.fillStyle = _options2.default.blockTypeTColor;else if (this.level[y][x] == "Z") ctx.fillStyle = _options2.default.blockTypeZColor;
	            ctx.fillRect(x * _options2.default.blockWidth + _options2.default.blockEdgeWidth, y * _options2.default.blockWidth + _options2.default.blockEdgeWidth, _options2.default.blockWidth - _options2.default.blockEdgeWidth * 2, _options2.default.blockWidth - _options2.default.blockEdgeWidth * 2);
	          }
	        }
	      }
	    }
	  }, {
	    key: 'addRandomBlock',
	    value: function addRandomBlock() {
	      var randomnumber = Math.floor(Math.random() * 7);
	      if (randomnumber == 0) this.currentBlock = new _tetrisBlock2.default("O", 3, 0);else if (randomnumber == 1) this.currentBlock = new _tetrisBlock2.default("I", 3, 0);else if (randomnumber == 2) this.currentBlock = new _tetrisBlock2.default("Z", 3, 0);else if (randomnumber == 3) this.currentBlock = new _tetrisBlock2.default("L", 3, 0);else if (randomnumber == 4) this.currentBlock = new _tetrisBlock2.default("J", 3, 0);else if (randomnumber == 5) this.currentBlock = new _tetrisBlock2.default("S", 3, 0);else if (randomnumber == 6) this.currentBlock = new _tetrisBlock2.default("T", 3, 0);
	    }
	  }, {
	    key: 'gameEvent',
	    value: function gameEvent(event) {
	      switch (event.key) {
	        case "ArrowLeft":
	          if (this.checkOffset(this.currentBlock, -1, 0)) {
	            this.currentBlock.moveLeft();
	          }
	          break;
	        case "ArrowRight":
	          if (this.checkOffset(this.currentBlock, 1, 0)) {
	            this.currentBlock.moveRight();
	          }
	          break;
	        case "ArrowUp":
	          console.log("rotate");
	          this.currentBlock.rotate();
	          break;
	        case "ArrowDown":
	          if (this.checkOffset(this.currentBlock, 0, 1)) {
	            this.currentBlock.y = this.currentBlock.y + 1;
	          }
	          break;
	      }
	    }
	  }, {
	    key: 'writeToArray',
	    value: function writeToArray(block) {
	      for (var y = 0; y < 4; y++) {
	        for (var x = 0; x < 4; x++) {
	          if (block.activeState[y][x] == 1) {
	            var fieldX = block.x + x;
	            var fieldY = block.y + y;
	            this.level[fieldY][fieldX] = block.blockType.blockType;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'checkOffset',
	    value: function checkOffset(block, offsetX, offsetY) {
	      for (var y = 0; y < 4; y++) {
	        for (var x = 0; x < 4; x++) {
	          if (block.activeState[y][x] == 1) {
	            var fieldX = block.x + x;
	            var fieldY = block.y + y;
	            if (this.ocupied(fieldX + offsetX, fieldY + offsetY)) {
	              return false;
	            }
	          }
	        }
	      }
	      return true;
	    }
	  }, {
	    key: 'ocupied',
	    value: function ocupied(x, y) {
	      if (y >= 20) return true;
	      if (x < 0) return true;
	      if (x > 10) return true;
	      if (this.level[y][x] != ' ') {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: 'checkAndRemoveFullLines',
	    value: function checkAndRemoveFullLines() {
	      for (var i = 0; i < 20; i++) {
	        var fullLine = true;

	        for (var x = 0; x < 10; x++) {
	          if (this.level[i][x] == " ") {
	            fullLine = false;
	          }
	        }

	        if (fullLine) {
	          console.log("there is a full line!");
	          this.numberOfLines++;
	          //gameStepTime = gameStepTime * 0.99;
	          //$('#score').html("Number of lines: "+numberOfLines + " <br />Difficulty : " + parseInt(gameStepTime) + "ms");
	          this.removeLine(i);
	        }
	      }
	    }
	  }, {
	    key: 'removeLine',
	    value: function removeLine(number) {
	      for (var i = number; i > 0; i--) {
	        for (var x = 0; x < 10; x++) {
	          var valueAboveField = this.level[i - 1][x];
	          this.level[i][x] = valueAboveField;
	        }
	      }
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

	var game_width = 250,
	    game_height = 500,
	    block_width = game_width / 10,
	    block_edge_width = 1,
	    block_edge_color = "#000000",
	    // black
	fps = 1,
	    blockTypeZColor = "#FF0000",
	    // red
	blockTypeIColor = "#00FFFF",
	    // cyan
	blockTypeLColor = "#ffa500",
	    // orange
	blockTypeOColor = "#FFFF00",
	    // yellow
	blockTypeJColor = "#0000FF",
	    // blue
	blockTypeSColor = "#008000",
	    // green
	blockTypeTColor = "#800080"; // purple

	var Options = function () {
	  function Options() {
	    _classCallCheck(this, Options);
	  }

	  _createClass(Options, null, [{
	    key: "game_width",
	    get: function get() {
	      return game_width;
	    }
	  }, {
	    key: "game_height",
	    get: function get() {
	      return game_height;
	    }
	  }, {
	    key: "blockEdgecolor",
	    get: function get() {
	      return block_edge_color;
	    }
	  }, {
	    key: "blockEdgeWidth",
	    get: function get() {
	      return block_edge_width;
	    }
	  }, {
	    key: "blockWidth",
	    get: function get() {
	      return block_width;
	    }
	  }, {
	    key: "frameDuration",
	    get: function get() {
	      return 1000 / fps;
	    }
	  }, {
	    key: "blockTypeZColor",
	    get: function get() {
	      return blockTypeZColor;
	    }
	  }, {
	    key: "blockTypeIColor",
	    get: function get() {
	      return blockTypeIColor;
	    }
	  }, {
	    key: "blockTypeLColor",
	    get: function get() {
	      return blockTypeZColor;
	    }
	  }, {
	    key: "blockTypeOColor",
	    get: function get() {
	      return blockTypeOColor;
	    }
	  }, {
	    key: "blockTypeJColor",
	    get: function get() {
	      return blockTypeJColor;
	    }
	  }, {
	    key: "blockTypeSColor",
	    get: function get() {
	      return blockTypeSColor;
	    }
	  }, {
	    key: "blockTypeTColor",
	    get: function get() {
	      return blockTypeTColor;
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

	var _blockType = __webpack_require__(5);

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

	      console.log(this._activeState);
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
/* 5 */
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
	  function BlockType(blockType) {
	    _classCallCheck(this, BlockType);

	    this.blockType = blockType;
	    this._outerColor = _options2.default.blockEdgecolor;

	    var blockTypesI = [[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]];

	    var blockTypesZ = [[[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]]];

	    var blockTypesL = [[[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0]], [[1, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];

	    var blockTypesO = [[[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]]];

	    var blockTypesJ = [[[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]]];

	    var blockTypesS = [[[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]], [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];

	    var blockTypesT = [[[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]], [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]];

	    switch (blockType) {
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

	    console.log("BlockType " + blockType + " created with inner color of " + this._innerColor + " and outerColor " + this._outerColor);
	  }

	  _createClass(BlockType, [{
	    key: "numberOfBlockStates",
	    value: function numberOfBlockStates() {
	      return this.states.length;
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