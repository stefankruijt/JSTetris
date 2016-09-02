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

	var _blockType = __webpack_require__(1);

	var _blockType2 = _interopRequireDefault(_blockType);

	var _tetrisBlock = __webpack_require__(2);

	var _tetrisBlock2 = _interopRequireDefault(_tetrisBlock);

	var _canvas = __webpack_require__(3);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _game = __webpack_require__(4);

	var _game2 = _interopRequireDefault(_game);

	var _utility = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var blockTypesI = [[[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]];

	function startGame() {
	  var game = new _game2.default();
	  addEvents();
	  ctx = document.getElementById('tetrisCanvas').getContext('2d');

	  var blockOne = new _tetrisBlock2.default(new _blockType2.default('I', blockTypesI, "blue", "black"), 1, 2);
	  currentBlock = blockOne;
	  console.log(currentBlock);
	  blockOne.drawBlock(ctx);

	  console.log(game);
	}

	function addEvents() {
	  document.addEventListener('keydown', keydown, false);
	}

	function keydown(ev) {
	  console.log(ev.keyCode);
	  switch (ev.keyCode) {
	    case 37:
	      //if (checkOffset(currentBlock, -1, 0)) {
	      currentBlock.x = 6;
	      //}
	      break;
	    case 39:
	      //if(checkOffset(currentBlock,+1,0)) {
	      currentBlock.x++;
	      //}
	      break;
	    case 38:
	      //currentBlock.rotate(level);
	      break;
	    case 40:
	      //if(checkOffset(currentBlock,0,+1)){
	      currentBlock.y = currentBlock.y + 1;
	      //}
	      break;
	  }
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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BlockType = function () {
	  function BlockType(blockType, states, innerColor, outerColor) {
	    _classCallCheck(this, BlockType);

	    this.blockType = blockType;
	    this.states = states;
	    this._innerColor = innerColor;
	    this._outerColor = outerColor;

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
	  }]);

	  return BlockType;
	}();

	exports.default = BlockType;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TetrisBlock = function () {
	  function TetrisBlock(blockType, x, y) {
	    _classCallCheck(this, TetrisBlock);

	    this.blockType = blockType;
	    this._x = x;
	    this._y = y;
	    this.activeState = 0;
	    this._block_width = 20;
	  }

	  _createClass(TetrisBlock, [{
	    key: "drawBlock",
	    value: function drawBlock(ctx) {
	      var activeState = this.blockType.states[this.activeState];

	      for (var y = 0; y < activeState.length; y++) {
	        for (var x = 0; x < activeState[y].length; x++) {
	          if (activeState[y][x] == 1) {
	            console.log(this._x);
	            ctx.fillStyle = this.blockType.outerColor;
	            ctx.fillRect((this._x + x) * 20, (this._y + y) * 20, 20, 20);
	            ctx.fillStyle = this.blockType.innerColor;
	            ctx.fillRect((this._x + x) * 20 + 1, (this._y + y) * 20 + 1, 20 - 1 * 2, 20 - 1 * 2);
	          }
	        }
	      }
	    }
	  }, {
	    key: "x",
	    set: function set(newValue) {
	      this._x = newValue;
	    },
	    get: function get() {
	      return this._x;
	    }
	  }, {
	    key: "y",
	    set: function set(newValue) {
	      this._y = newValue;
	    },
	    get: function get() {
	      return this._y;
	    }
	  }]);

	  return TetrisBlock;
	}();

	exports.default = TetrisBlock;


	var I0 = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
	var I1 = [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]];
	var I2 = [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]];
	var I3 = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];

	var Z0 = [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
	var Z1 = [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
	var Z2 = [[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
	var Z3 = [[0, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]];

	var O0 = [[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

	var L0 = [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
	var L1 = [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
	var L2 = [[0, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0]];
	var L3 = [[1, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]];

	var J0 = [[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
	var J1 = [[0, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
	var J2 = [[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]];
	var J3 = [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]];

	var S0 = [[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
	var S1 = [[0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]];
	var S2 = [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]];
	var S3 = [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]];

	var T0 = [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
	var T1 = [[0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
	var T2 = [[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]];
	var T3 = [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]];

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

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = "\n<div>\n  <canvas id=\"tetrisCanvas\" width=\"200\" height=\"400\" style=\"background-color:#147479\"></canvas>\n</div>\n  ";

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	  function Game(ctx) {
	    _classCallCheck(this, Game);

	    var level = new Array();
	    this.initializeLevel(level);
	    this.ctx = ctx;

	    var currentBlock;
	    var play = false;
	    var gameStepTime = 370;
	    var cumulatedFrameTime = 0;
	    var lastFrameTime = Date.now();
	    var numberOfLines = 0;

	    setInterval(loop, 33);
	  }

	  _createClass(Game, [{
	    key: "initializeLevel",
	    value: function initializeLevel(level) {
	      for (var y = 0; y < 20; y++) {
	        level[y] = new Array();
	        for (var x = 0; x < 10; x++) {
	          level[y][x] = " ";
	        }
	      }
	    }
	  }, {
	    key: "loop",
	    value: function loop() {
	      if (true) {
	        var time = Date.now();
	        frameTime = time - lastFrameTime;
	        lastFrameTime = time;
	        cumulatedFrameTime += frameTime;

	        while (cumulatedFrameTime > gameStepTime) {
	          if (checkOffset(currentBlock, 0, 1) == true) {
	            currentBlock.y++;
	          } else {
	            writeToArray(currentBlock);
	            addRandomBlock();
	          }

	          checkAndRemoveFullLines();
	          cumulatedFrameTime -= gameStepTime;
	        }
	      } else {
	        lastFrameTime = Date.now();
	      }
	      ctx.clearRect(0, 0, _canvas_width, _canvas_height);
	      drawArrayBlocks();
	      drawBlock(currentBlock);
	    }
	  }]);

	  return Game;
	}();

	exports.default = Game;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function generateRandom() {
	    return Math.random();
	}

	function sum(a, b) {
	    return a + b;
	}

	exports.generateRandom = generateRandom;
	exports.sum = sum;

/***/ }
/******/ ]);