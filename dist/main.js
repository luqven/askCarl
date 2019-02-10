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

/***/ "./src/animations/animations.js":
/*!**************************************!*\
  !*** ./src/animations/animations.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../token */ \"./src/token.js\");\n/* harmony import */ var _squash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./squash */ \"./src/animations/squash.js\");\n// animations JS file\n\n\n\nclass Animations {\n  constructor(props){\n    this.token = props.token\n    this.squash = new _squash__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({token: this.token});\n  }\n\n  render(){\n    // setInterval(this.token.squash, 1000);\n    this.squash.render()\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Animations);\n\n//# sourceURL=webpack:///./src/animations/animations.js?");

/***/ }),

/***/ "./src/animations/squash.js":
/*!**********************************!*\
  !*** ./src/animations/squash.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// squash animation\nclass Squash {\n  constructor(props) {\n    this.token     = props.token;\n    this.topWall   = props.token.walls[0] / 3;\n    this.botWall   = props.token.walls[1];\n    this.leftWAll  = props.token.walls[2];\n    this.rightWall = props.token.walls[3];\n    \n    this.pos          = this.token.position;   // [xPos, yPos]\n    this.dimensions   = this.token.dimensions; // [w, h] \n    this.height       = this.token.dimensions[1];\n    this.initialH     = this.token.dimensions[1];\n    this.width        = this.dimensions[0]; // this width gets changed\n    this.initialW     = this.dimensions[0]; // store for later refrence\n    this.deltaY       = 2;   // initial vertical change\n    this.deltaX       = 0;   // initial vertical change\n    this.deltaD       = 10;  // initial dimensions change\n    this.acceleration = 20;  // initial accel\n    this.hitCount     = 1;   // start with 0 bounces\n    \n    this.bounce        = this.bounce.bind(this);\n    this.hitWall       = this.hitWall.bind(this);\n    this.increaseAccel = this.increaseAccel.bind(this);\n    this.moveInDyDir   = this.moveInDyDir.bind(this);\n    this.reverseDeltaY = this.reverseDeltaY.bind(this);\n\n    //////////////////////////////////////\n    // TO DO: threshold params\n    //////////////////////////////////////\n\n    // this.threshold    = this.botWall -50; // pos of squish region of canvas\n    // this.resize       = false;\n    // this.hitThreshold  = this.hitThreshold.bind(this);\n    // this.reverseDeltaD = this.reverseDeltaD.bind(this);\n    // this.changeDimensions = this.changeDimensions.bind(this);\n\n  }\n\n  hitWall(){\n    // return true if token hit botWall or topWall\n    if (this.pos[1] <= this.topWall){\n      return true;\n    } else if (this.pos[1] + this.height >= this.botWall) {\n      return true;\n    }\n    return false;\n  }\n\n/////////////////////////////////////////\n//    TO DO: Implement dim resizing\n/////////////////////////////////////////\n\n  // hitThreshold() {\n  //   if (this.pos[1] === this.threshold) {\n  //     this.reverseDeltaD();\n  //     this.resize = !this.resize;\n  //     return true;\n  //   } else if (this.pos[1] + this.height === this.botWall) {\n  //     this.reverseDeltaD();\n  //     return true;\n  //   }\n  //   return false;\n  // }\n\n  // changeDimensions() {\n  //   this.width += this.deltaD;\n  //   // this.height += this.deltaD;\n  //   this.token.setDimensions(this.width, this.height)\n  // }\n\n  // reverseDeltaD(){\n  //   // reverse horizontal delta direction\n  //   this.deltaD = this.deltaD * -1;\n  // }\n\n  reverseDeltaY(){\n    // reverse verticle delta direction\n    this.deltaY = this.deltaY * -1;\n  }\n\n  increaseAccel() {\n    this.deltaY += 1;\n  }\n\n  moveInDyDir() {\n    // move token to postion after adding delta\n    this.token.changePosition([this.deltaX, this.deltaY])\n  }\n  \n  bounce() {\n    this.token.render()\n    // move the token in dY direciton\n    this.moveInDyDir();\n    // check to see if wall was hit\n    if (this.hitWall() === true) {\n      // if hit reverse verticle delta polarity\n      this.reverseDeltaY();\n    } else {\n      this.increaseAccel();\n    }\n  }\n\n  render(){\n    setInterval(this.bounce, 50);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Squash);\n\n//# sourceURL=webpack:///./src/animations/squash.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./token */ \"./src/token.js\");\n/* harmony import */ var _animations_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./animations/animations */ \"./src/animations/animations.js\");\n// index JS file\n\n\n\nconsole.log('webpack is running...')\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  console.log(\"DOM fully loaded and parsed\");\n  const canvas = document.getElementById('canvas');\n  const token = new _token__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    shape: \"square\",\n    color: \"lightblue\",\n    dimensions: [50, 50], // [width, height]\n    // [xStartPos - 1/2 * width, yStartPos - 1/2 * height]\n    position: [canvas.width / 2 - 25, canvas.height / 2 - 25],\n    walls: [0, canvas.height, 0, canvas.width],  // [topW, botW, leftW, rightW]\n    ctx: canvas.getContext('2d'),\n  })\n\n  let animations = new _animations_animations__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n    token: token\n  })\n\n  animations.render()\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/token.js":
/*!**********************!*\
  !*** ./src/token.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// import squash from \"./animations/squash\";\n\n// token JS file\n\nclass Token {\n  constructor(props){\n    this.shape = props.shape;\n    this.color = props.color;\n    this.ctx = props.ctx\n    this.dir = \"down\"\n    this.dimensions = props.dimensions; // [ w, h ],\n    this.position = props.position;     // [ startX, startY ],\n    this.walls = props.walls            // [ top, bottom, left, right ]\n  \n\n    this.logger = this.logger.bind(this);\n    this.getColor = this.getColor.bind(this);\n    this.getPosition = this.getPosition.bind(this);\n    this.setPosition = this.setPosition.bind(this);\n    this.getDimensions = this.getDimensions.bind(this);\n    this.setDimensions = this.setDimensions.bind(this);\n    this.getTokenAttributes = this.getTokenAttributes.bind(this);\n  }\n\n  logger() {\n    let currentTokenState = {\n      token: {\n        shape: this.shape,\n        color: this.color,\n        dims: this.dimensions,\n        pos: `${this.position[0]}, ${this.position[1]}`,\n        walls: this.walls,\n      }\n    }\n    console.log( currentTokenState )\n  }\n\n  getPosition(){\n    this.xPos = this.position[0];\n    this.yPos = this.position[1];\n\n    return [this.xPos, this.yPos];\n  }\n\n  setPosition(newX, newY) {\n    this.position[0] = newX;\n    this.position[1] = newY;\n  }\n\n  changePosition(offsets) {\n    const xOffset = offsets[0];\n    const yOffset = offsets[1];\n\n    this.position[0] += xOffset;\n    this.position[1] += yOffset;\n  }\n\n  getDimensions(){\n    this.width = this.dimensions[0];\n    this.height = this.dimensions[1];\n\n    return [this.width, this.height];\n\n  }\n\n  setDimensions(newW, newH) {\n    this.dimensions[0] = newW;\n    this.dimensions[1] = newH;\n  }\n\n  getColor() {\n    this.ctx.fillStyle = this.color;\n\n  }\n\n  getTokenAttributes() {\n    this.getColor();\n    this.getPosition();\n    this.getDimensions();\n  }\n\n  render() {\n    this.ctx.clearRect(0, 0, canvas.width, canvas.height);\n    this.getTokenAttributes();\n    // this.logger();\n    switch (this.shape) {\n      case \"square\":\n        this.ctx.fillRect(this.xPos, this.yPos, this.width, this.height)\n      default:\n        return null;\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Token);\n\n//# sourceURL=webpack:///./src/token.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Util = {\n  inherits: function inherits(childClass, parentClass) {\n    // TO DO\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Util);\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });