/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/animations/engine.js":
/*!**********************************!*\
  !*** ./src/animations/engine.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ \"./src/util.js\");\n\n\nclass movingObject {\n  constructor(props) {\n    this.token     = props.token;\n    this.allTokens = props.allTokens;\n    // token wall locations\n    this.topWall   = props.token.walls[0];\n    this.botWall   = props.token.walls[1];\n    this.leftWAll  = props.token.walls[2];\n    this.rightWall = props.token.walls[3];\n    // initial token position and dimensions\n    this.pos          = this.token.position;   // [xPos, yPos]\n    this.x            = this.pos[0];\n    this.y            = this.pos[1];\n    this.initialPos   = this.pos.slice(0);     // stored for reference when needed\n    this.dimensions   = this.token.dimensions; // [w, h, r] \n    this.radius       = this.token.dimensions[2];\n    this.height       = this.token.dimensions[1];\n    this.width        = this.dimensions[0];\n    // start delta, acceleration, friction, and threshold values\n    this.deltaY       = props.token.deltaY;\n    this.deltaX       = props.token.deltaX;\n    this.deltaR       = this.deltaY / 900;\n    this.acceleration = 10;\n    this.friction     = .889;\n    this.velocity     = {x: this.deltaX, y: this.deltaY};\n    this.thresholdY   = 0.4    // stop animation at this speed\n    this.thresholdX   = 0.4    // stop animation at this speed\n    this.ended        = false; // true when delta ~= 0;\n    // bind functions\n    this.animate        = this.animate.bind(this);\n    this.growToken     = this.growToken.bind(this);\n    this.moveInDyDir   = this.moveInDyDir.bind(this);\n    this.increaseAccel = this.increaseAccel.bind(this);\n    this.reverseDeltaY = this.reverseDeltaY.bind(this);\n    this.reverseDeltaX = this.reverseDeltaX.bind(this);\n    \n    this.hitWall = this.hitWall.bind(this);\n    \n  };\n  \n////////////////////////////////////////\n// wall collision logic\n////////////////////////////////////////\n  hitWall() {\n    debugger\n    if (this.token.type != \"circle\") {\n      //  get coordinates of the center of the shape\n      this.midPoint = [Math.round(this.pos[0] + this.width / 2), Math.round(this.pos[1] + this.height / 2)];\n    } else {\n      this.midPoint = this.pos;\n    };\n    // get the coordinates of shapes 4 corners\n    // let startX = this.pos[0];\n    // let startY = this.pos[1];\n    // let topLeft  = this.pos;\n    // let topRight = [startX + this.width, startY];\n    // let botLeft  = [startX, startY + this.height];\n    // let botRight = [startX + this.width , startY + this.height]; \n    // wallIndexes = [0, 2]  // [top / bottom, left / right]\n    let hitWalls = [];\n    // if midP +/- radius <=> wall -> wall hit\n    if( this.midPoint[0] - this.radius <= this.leftWAll[0]){\n      hitWalls.push(2);\n      this.reverseDeltaX();\n    } else if (this.midPoint[0] + this.radius >= this.rightWall[0] ) {\n      hitWalls.push(2);\n      this.reverseDeltaX();\n    };\n    if (this.midPoint[1] - this.radius <= this.topWall[1]) {\n      hitWalls.push(0);\n      this.reverseDeltaY();\n    } else if (this.midPoint[1] + this.radius >= this.botWall[1]) {\n      hitWalls.push(0);\n      this.reverseDeltaY();\n    };\n    if (hitWalls.length < 1) {\n      this.increaseAccel();\n    };\n    debugger\n  };\n\n      // TODO: object collision detection\n    // if (this.distanceBetween(this.midPoint, otherMidP) <= 0 ){\n    //   debugger\n    //     hitWalls.push(i);\n    // }\n\n\n////////////////////////////////////////\n// token delta change logic\n////////////////////////////////////////\n  growToken() {\n    this.token.setRadius(this.radius * this.deltaR)\n  };\n\n  reverseDeltaY(){\n    // reverse vertical delta direction\n    this.deltaY =  this.friction * this.deltaY * -1;\n    debugger\n  };\n\n  reverseDeltaX(){\n    // reverse vertical delta direction\n    this.deltaX =  this.friction * this.deltaX * -1;\n  };\n\n  increaseAccel() {\n    this.deltaY += 1;\n  };\n\n  moveInDyDir() {\n    // move token to position after adding delta\n    this.token.changePosition([this.deltaX, this.deltaY])\n  };\n\n////////////////////////////////////////\n// collision and delta change handlers\n////////////////////////////////////////\n  animate() {\n    this.token.render()\n\n    // change deltaX when between start pos + 10 and  start pos + 30\n    // this simulates slow in and slow out animation behavior\n    if (Math.abs(this.pos[0] - this.initialPos[0]) > 10 ||\n        Math.abs(this.pos[0] - this.initialPos[0]) < 30) {\n      this.deltaX = this.deltaX * (this.friction / .92)\n    };\n\n    // set end condition to true if deltas have reached thresholds\n    if (Math.abs(this.deltaY ) < this.thresholdY &&\n        Math.abs(this.deltaX) <= this.thresholdX) {\n        this.over = true\n    };\n\n    // check if render should end\n    // if (this.over) { return null}\n\n    // move the token in dY direction\n    this.moveInDyDir();\n\n    // check to see if wall was hit\n    const hitWall = this.hitWall();\n  };\n\n////////////////////////////////////////\n// render logic\n////////////////////////////////////////\n  render(){\n    // console.log(this.token.dimensions);\n    this.token.render();\n    if(this.token.type === 'bounce') {\n       this.animate(); \n      };\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (movingObject);\n\n//# sourceURL=webpack:///./src/animations/engine.js?");

/***/ }),

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! exports provided: SQUARE, CIRCLE, SQUASH, SQUARE2, CanvasElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SQUARE\", function() { return SQUARE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CIRCLE\", function() { return CIRCLE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SQUASH\", function() { return SQUASH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SQUARE2\", function() { return SQUARE2; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CanvasElement\", function() { return CanvasElement; });\n/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shapes */ \"./src/shapes.js\");\n\n\nconst SQUARE = 'SQUARE';\nconst CIRCLE = 'CIRCLE';\nconst SQUASH = 'SQUASH';\nconst SQUARE2 = 'SQUARE2';\n\nclass CanvasElement {\n  // canvasObject = { target: canvasEle, loc: [yOffsetMin, yOffsetMax], shape: 'shape', container: 'id' }\n  constructor(canvasObject) {\n    this.target= canvasObject.target;\n    this.elementContainer = document.getElementById(canvasObject.container);\n    this.yOffsetMin = canvasObject.location[0];\n    this.yOffsetMax = canvasObject.location[1];\n    this.shapeType = canvasObject.shapeType;\n    this.shape = this.setShape();\n    this.newClasses = \"hovered\";\n    this.initalClasses = \"hover-card-container\"\n  };\n\n  setShape() {\n    // debugger\n    if (this.shapeType === SQUARE ) {\n      this.shape = Object(_shapes__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.target, 'bounce').square\n    }\n    // if (this.shapeType === CIRCLE){\n    //   this.shape = Shapes(this.target, 'bounce').circle\n    // }\n    if (this.shapeType === SQUASH) {\n      this.shape = Object(_shapes__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.target, 'bounce').squash;\n    }\n    if (this.shapeType === SQUARE2) {\n      this.shape = Object(_shapes__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.target, 'bounce').secondary\n    }\n  }\n\n  reset() {\n    this.elementContainer.classList = this.initalClasses;\n    this.shape = this.setShape();\n  };\n\n  addClasses() {\n    this.elementContainer.classList.add(this.newClasses);\n  };\n\n  scrolledToElement(){\n    return (window.pageYOffset >= this.yOffsetMin && window.pageYOffset <= this.yOffsetMax);\n  }\n\n  render() {\n    if (this.shape === undefined) { this.setShape(); }\n    this.target.getContext('2d').clearRect(0, 0, this.target.width, this.target.height);\n    this.shape.render();\n  };\n};\n\n//# sourceURL=webpack:///./src/canvas.js?");

/***/ }),

/***/ "./src/flipcards.js":
/*!**************************!*\
  !*** ./src/flipcards.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CardEvents; });\n\n\nclass CardEvents {\n  constructor(cards){\n    this.cards = cards;\n  }\n\n  mouseEnter(){\n    this.cards.forEach(card => {\n      card.addEventListener(\"mouseenter\", () => {\n        card.classList.add(\"is-flipped\")\n      })\n    });\n  };\n  \n  mouseLeave(){\n    this.cards.forEach(card => {\n      card.addEventListener(\"mouseleave\", () => {\n        card.classList = \"card\";\n      })\n    });\n  };\n}\n\n//# sourceURL=webpack:///./src/flipcards.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _shapes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shapes */ \"./src/shapes.js\");\n/* harmony import */ var _flipcards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./flipcards */ \"./src/flipcards.js\");\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n// index JS file\n\n\n\n\nconsole.log('webpack is running...')\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n  // shim layer with setTimeout fallback based on work by Paul Irish\n  window.requestAnimFrame = (function () {\n    return window.requestAnimationFrame ||\n      window.webkitRequestAnimationFrame ||\n      window.mozRequestAnimationFrame ||\n      window.oRequestAnimationFrame ||\n      window.msRequestAnimationFrame ||\n      function (callback) {\n        window.setTimeout(callback, 1000 / 60);\n      };\n  })();\n  console.log(\"DOM fully loaded and parsed\");\n\n  const canvas2 = document.getElementById('canvas2');\n  const canvas3 = document.getElementById('canvas3');\n  const canvas4 = document.getElementById('canvas4');\n\n  const flipcard0 = document.getElementById('fp00');\n  const flipCard1 = document.getElementById('fp01');\n  const flipcard2 = document.getElementById('fp02');\n  const flipcard3 = document.getElementById('fp03');\n\n  const cards = [flipcard0, flipCard1, flipcard2, flipcard3];\n  const cardEvents = new _flipcards__WEBPACK_IMPORTED_MODULE_2__[\"default\"](cards);\n\n\n  // add event listeners to cards\n  cardEvents.mouseEnter();\n  cardEvents.mouseLeave();\n\n  // set shapes to render\n  // animtaion01 shapes\n  let square = new _canvas__WEBPACK_IMPORTED_MODULE_3__[\"CanvasElement\"]({\n    target: canvas2,\n    location: [270, 800],\n    shapeType: _canvas__WEBPACK_IMPORTED_MODULE_3__[\"SQUARE\"],\n    container: 'a1',\n  })\n  // animation02 shapes\n  let squash = new _canvas__WEBPACK_IMPORTED_MODULE_3__[\"CanvasElement\"]({\n    target: canvas3,\n    location: [801, 1200],\n    shapeType: _canvas__WEBPACK_IMPORTED_MODULE_3__[\"SQUASH\"],\n    container: 'a2',\n  })\n  // animation03 shapes\n  let square2 = new _canvas__WEBPACK_IMPORTED_MODULE_3__[\"CanvasElement\"]({\n    target: canvas4,\n    location: [1201, 1900],\n    shapeType: _canvas__WEBPACK_IMPORTED_MODULE_3__[\"SQUARE2\"],\n    container: 'a3',\n  })\n  // store shapes in animations array\n  var animations = [];\n  animations.push(square);\n  animations.push(squash);\n  animations.push(square2);\n\n  \n  \n  // render the shapes\n  function draw() {\n    window.requestAnimationFrame(draw)\n\n    if (square.scrolledToElement() ){\n      square.addClasses();\n      square.render();\n      squash.reset();\n      square2.reset();\n    } else if (squash.scrolledToElement() ){\n      squash.addClasses()\n      squash.render();\n      square.reset();\n      square2.reset();\n    } else if (square2.scrolledToElement() ){\n      squash.addClasses()\n      square2.render();\n      square.reset();\n      squash.reset();\n    }\n  };\n  window.requestAnimationFrame(draw);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/shapes.js":
/*!***********************!*\
  !*** ./src/shapes.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./token */ \"./src/token.js\");\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _animations_engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./animations/engine */ \"./src/animations/engine.js\");\n\n\n\n\nconst shapes = [\"square\", \"circle\"];\nconst colors = [\"#EA4335\", \"lightblue\", \"lightgreen\", \"#FBBC05\",\n                \"greenyellow,\", \"honeydew\", \"hotpink\", \"indianred\", \"indigo\",]\nconst tokenWidth = 50;\n\nconst Shapes = (canvas, animationType) =>  {\n\n  const squareDefaults = {\n    shape: shapes[0], // square\n    color: colors[0],\n    dimensions: [tokenWidth, tokenWidth, tokenWidth / 2], // [width, height, radius]\n    position: [0, canvas.height - tokenWidth],  // [xStartPos, yStartPos]\n    walls: [[0, 0], [0, canvas.height], [0, 0], [canvas.width, 0]],  // [topW, botW, leftW, rightW]\n    ctx: canvas.getContext('2d'),\n    type: animationType,\n    deltaX: 20, // horizontal delta\n    deltaY:  0,  // vertical delta\n  }\n\n  const circleDefaults = {\n    shape: shapes[1], // circle\n    color: colors[1],\n    dimensions: [tokenWidth / 2, tokenWidth / 2, tokenWidth / 2], // [width, height, radius]\n    position: [(canvas.width / 2.0), canvas.height / 3.0],  // [xStartPos - 1/2 * width, yStartPos - 1/2 * height]\n    walls: [[0, 0], [0, canvas.height], [0, 0], [canvas.width, 0]],  // [topW, botW, leftW, rightW]\n    ctx: canvas.getContext('2d'),\n    type: animationType,\n    deltaX: 20, // horizontal delta\n    deltaY: 0, // vertical delta\n  }\n\n  const squashAndStretchDefaults = {\n    shape: shapes[0], // square\n    color: colors[3],\n    dimensions: [tokenWidth, tokenWidth, tokenWidth / 2], // [width, height, radius]\n    position: [0, canvas.height - tokenWidth],  // [xStartPos, yStartPos]\n    walls: [[0, 0], [0, canvas.height - 1], [0, 0], [canvas.width, 0]],  // [topW, botW, leftW, rightW]\n    ctx: canvas.getContext('2d'),\n    type: animationType,\n    deltaX: 9, // horizontal delta\n    deltaY: -17,  // vertical delta\n  }\n\n  const secondSquareDefault = {\n    shape: shapes[0], // square\n    color: colors[2],\n    dimensions: [tokenWidth, tokenWidth, tokenWidth / 2], // [width, height, radius]\n    position: [ 10, canvas.height - 170],  // [xStartPos, yStartPos]\n    walls: [[0, 0], [0, canvas.height],[0, 0], [canvas.width, 0]],  // [topW, botW, leftW, rightW]\n    ctx: canvas.getContext('2d'),\n    type: animationType,\n    deltaX: 0, // horizontal delta\n    deltaY: 0, // vertical delta\n  }\n\n  return {\n    square: new _animations_engine__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n      token: new _token__WEBPACK_IMPORTED_MODULE_0__[\"default\"](squareDefaults)\n    }),\n\n    circle: new _animations_engine__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n      token: new _token__WEBPACK_IMPORTED_MODULE_0__[\"default\"](circleDefaults)\n    }),\n\n    squash: new _animations_engine__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n      token: new _token__WEBPACK_IMPORTED_MODULE_0__[\"default\"](squashAndStretchDefaults)\n    }),\n\n    secondary: new _animations_engine__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n      token: new _token__WEBPACK_IMPORTED_MODULE_0__[\"default\"](secondSquareDefault)\n    }),\n    circleDefaults: circleDefaults,\n    squareDefault: squareDefaults,\n    squashDefault: squashAndStretchDefaults,\n    secondSquareDefault: secondSquareDefault,\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Shapes);\n\n//# sourceURL=webpack:///./src/shapes.js?");

/***/ }),

/***/ "./src/token.js":
/*!**********************!*\
  !*** ./src/token.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\n// token JS file\n\nclass Token {\n  constructor(props){\n    this.shape = props.shape;\n    this.type = props.type;\n    this.color = props.color;\n    this.ctx = props.ctx\n    this.dir = \"down\"\n    this.dimensions = props.dimensions; // [ w, h, r ],\n    this.position = props.position;     // [ startX, startY ],\n    this.walls = props.walls;           // [ top, bottom, left, right ]\n    this.deltaX = props.deltaX;\n    this.deltaY = props.deltaY;\n  \n\n    this.logger   = this.logger.bind(this);\n    this.getColor = this.getColor.bind(this);\n    this.getPosition = this.getPosition.bind(this);\n    this.setPosition = this.setPosition.bind(this);\n    this.getDimensions = this.getDimensions.bind(this);\n    this.setRadius = this.setRadius.bind(this);\n    this.getTokenAttributes = this.getTokenAttributes.bind(this);\n  }\n\n\n  logger() {\n    let currentTokenState = {\n      token: {\n        shape: this.shape,\n        color: this.color,\n        dims: this.dimensions,\n        pos: `${this.position[0]}, ${this.position[1]}`,\n        walls: this.walls,\n      }\n    }\n    console.log( currentTokenState )\n  }\n\n  getPosition(){\n    this.xPos = this.position[0];\n    this.yPos = this.position[1];\n\n    return [this.xPos, this.yPos];\n  }\n\n  setPosition(newX, newY) {\n    this.position[0] = newX;\n    this.position[1] = newY;\n  }\n\n  changePosition(offsets) {\n    const xOffset = offsets[0];\n    const yOffset = offsets[1];\n\n    this.position[0] += xOffset;\n    this.position[1] += yOffset;\n  }\n\n  getDimensions(){\n    this.width  = this.dimensions[0];\n    this.height = this.dimensions[1];\n    this.radius = this.dimensions[2];\n\n    return [this.width, this.height];\n  }\n\n  setRadius(newRadius) {\n    this.dimensions[2] += newRadius;\n  }\n\n  getColor() {\n    this.ctx.fillStyle = this.color;\n\n  }\n\n  getTokenAttributes() {\n    this.getColor();\n    this.getPosition();\n    this.getDimensions();\n  }\n\n  render() {\n    \n    this.getTokenAttributes();\n    // this.logger();\n    switch (this.shape) {\n      case \"square\":\n        this.ctx.fillRect(this.xPos, this.yPos, this.width, this.height);\n        this.ctx.closePath();\n        return;\n      case \"circle\":\n        this.ctx.beginPath();\n        this.ctx.arc(this.xPos + 15, this.yPos, this.radius, 0, Math.PI * 2, true);\n        this.ctx.fill();\n        this.ctx.closePath();\n        return;\n      default:\n        return null;\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Token);\n\n//# sourceURL=webpack:///./src/token.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Util = {\n  inherits: function inherits(childClass, parentClass) {\n    // TO DO\n  },\n  getRandom: function (min, max) {\n    return Math.floor(Math.random() * (max  - min) + min);\n  },\n  getRandomFraction: function (min, max) {\n    return Math.random() * (max - min) + min;\n  },\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Util);\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });