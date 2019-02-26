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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Engine; });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util */ \"./src/util.js\");\n\n\nclass Engine {\n  constructor(props) {\n    this.shape     = props.shape;\n    this.canvas    = props.canvas\n    // shape wall locations\n    this.topWall   = [0, this.canvas.y];\n    this.botWall   = [0, this.canvas.height - 65];\n    this.leftWAll  = [this.canvas.x, 0];\n    this.rightWall = [this.canvas.width, 0];\n    // initial shape position and dimensions\n    this.pos          = [this.shape.x, this.shape.y]\n    this.initialPos   = [this.shape.x, this.shape.y].slice(0);     // stored for reference when needed\n    // start delta, acceleration, friction, and threshold values\n    this.deltaR       = this.shape.deltaY / 900;\n    this.acceleration = 10;\n    this.friction     = .889;\n    this.velocity     = {x: this.shape.deltaX, y: this.shape.deltaY};\n    this.thresholdY   = 0.4    // stop animation at this speed\n    this.thresholdX   = 0.4    // stop animation at this speed\n    this.ended        = false; // true when delta ~= 0;\n    // bind functions\n    this.animate       = this.animate.bind(this);\n    this.growShape     = this.growShape.bind(this);\n    this.moveInDyDir   = this.moveInDyDir.bind(this);\n    this.increaseAccel = this.increaseAccel.bind(this);\n    this.reverseDeltaY = this.reverseDeltaY.bind(this);\n    this.reverseDeltaX = this.reverseDeltaX.bind(this);\n    \n    this.hitWall = this.hitWall.bind(this);\n    \n  };\n  \n////////////////////////////////////////\n// wall collision logic\n////////////////////////////////////////\n  hitWall() {\n    if (this.shape.type != \"circle\") {\n      //  get coordinates of the center of the shape\n      this.midPoint = [Math.round(this.pos[0] + this.shape.width / 2), Math.round(this.pos[1] + this.shape.height / 2)];\n    } else {\n      this.midPoint = this.pos;\n    };\n    // get the coordinates of shapes 4 corners\n    // let startX = this.pos[0];\n    // let startY = this.pos[1];\n    // let topLeft  = this.pos;\n    // let topRight = [startX + this.shape.width, startY];\n    // let botLeft  = [startX, startY + this.shape.height];\n    // let botRight = [startX + this.shape.width , startY + this.shape.height]; \n    // wallIndexes = [0, 2]  // [top / bottom, left / right]\n    let hitWalls = [];\n    // if midP +/- radius <=> wall -> wall hit\n    if( this.midPoint[0] - this.shape.radius <= this.leftWAll[0]){\n      hitWalls.push(2);\n      this.reverseDeltaX();\n    } else if (this.midPoint[0] + this.shape.radius >= this.rightWall[0] ) {\n      hitWalls.push(2);\n      this.reverseDeltaX();\n    };\n    if (this.midPoint[1] - this.shape.radius <= this.topWall[1]) {\n      hitWalls.push(0);\n      this.reverseDeltaY();\n    } else if (this.midPoint[1] + this.shape.radius >= this.botWall[1]) {\n      hitWalls.push(0);\n      this.reverseDeltaY();\n    };\n    if (hitWalls.length < 1) {\n      this.increaseAccel();\n    };\n  };\n\n      // TODO: object collision detection\n    // if (this.distanceBetween(this.midPoint, otherMidP) <= 0 ){\n    //   debugger\n    //     hitWalls.push(i);\n    // }\n\n\n////////////////////////////////////////\n// shape delta change logic\n////////////////////////////////////////\n  growShape() {\n    this.shape.setDims(0, 0, this.shape.radius * this.deltaR)\n  };\n\n  reverseDeltaY(){\n    // reverse vertical delta direction\n    this.shape.deltaY =  this.friction * this.shape.deltaY * -1;\n  };\n\n  reverseDeltaX(){\n    // reverse vertical delta direction\n    this.shape.deltaX =  this.friction * this.shape.deltaX * -1;\n  };\n\n  increaseAccel() {\n    this.shape.deltaY += 1;\n  };\n\n  moveInDyDir() {\n    // move shape to position after adding delta\n    this.shape.changePosition([this.shape.deltaX, this.shape.deltaY])\n    this.pos = this.shape.getPosition()\n  };\n\n////////////////////////////////////////\n// collision and delta change handlers\n////////////////////////////////////////\n  animate() {\n    this.shape.render()\n\n    // change deltaX when between start pos + 10 and  start pos + 30\n    // this simulates slow in and slow out animation behavior\n    if (Math.abs(this.pos[0] - this.initialPos[0]) > 10 ||\n        Math.abs(this.pos[0] - this.initialPos[0]) < 30) {\n      this.shape.deltaX = this.shape.deltaX * (this.friction / .92)\n    };\n\n    // set end condition to true if deltas have reached thresholds\n    if (Math.abs(this.shape.deltaY ) < this.thresholdY &&\n        Math.abs(this.shape.deltaX) <= this.thresholdX) {\n        this.over = true\n    };\n\n    // check if render should end\n    // if (this.over) { return null}\n\n    // move the shape in dY direction\n    this.moveInDyDir();\n\n    // check to see if wall was hit\n    const hitWall = this.hitWall();\n  };\n\n////////////////////////////////////////\n// render logic\n////////////////////////////////////////\n  render(){\n    // console.log(this.shape.dimensions);\n    // this.shape.render();\n    // if(this.shape.type === 'bounce') {\n       this.animate(); \n      // };\n  };\n};\n\n//# sourceURL=webpack:///./src/animations/engine.js?");

/***/ }),

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Canvas; });\nclass Canvas {\n  constructor(props) {\n    this.render    = true;\n    this.canvas    = props.canvas\n    this.ctx       = props.canvas.getContext(\"2d\")\n    this.container = props.container // the canvas's container div or section in the html\n    this.width     = this.container.offsetWidth\n    this.height    = this.container.offsetHeight\n    this.x = 0\n    this.y = 0\n    this.mousePos = {\n      x: this.container.innerWidth / 2,\n      y: this.container.innerHeight / 2\n    }\n    this.colors = { red: \"rgba(255, 0, 0)\", blue: \"blue\", green: \"green\", yellow: \"yellow\" }\n    this.canvasDidMount = false\n\n    this.resize = this.resize.bind(this)\n    this.draw = this.draw.bind(this);\n    this.onMouseMove = this.onMouseMove.bind(this)\n    this.onCanvasDidMount = this.onCanvasDidMount.bind(this)\n  }\n  // change cursor pos when mouse moves over canvas container\n  onMouseMove() {\n    this.container.addEventListener('mousemove', e => {\n      this.mousePos.x = e.clientX\n      this.mousePos.y = e.clientY\n    })\n  };\n  // resize the canvas when it's container resizes\n  resize() {\n    this.container.addEventListener('resize',() => {\n      this.width = innerWidth\n      this.height = innerHeight\n    })\n  };\n  // returns bool that determines if scrolled to current canvas\n  scrolledTo(pageOffset){\n    if (pageOffset < -300 && pageOffset > -600) {return true}\n  }\n  // on first render, add event listeners\n  onCanvasDidMount() {\n    this.onMouseMove()\n    this.resize()\n  }\n\n  draw() {\n    if (this.render === false) {return}\n    if (this.canvasDidMount === false) {\n      this.canvasDidMount = true;\n      this.onCanvasDidMount()\n    }\n    // requestAnimationFrame(render) -- disabled since this is handled in index.js\n    this.ctx.clearRect(0, 0, this.width, this.height)\n  }\n}\n\n//# sourceURL=webpack:///./src/canvas.js?");

/***/ }),

/***/ "./src/flipcards.js":
/*!**************************!*\
  !*** ./src/flipcards.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CardEvents; });\n\n\nclass CardEvents {\n\n  constructor(cards){\n    this.cards = cards;\n  }\n\n  mouseClick(){\n    this.cards.forEach(card => {\n      card.addEventListener(\"click\", () => {\n        card.classList.toggle(\"is-flipped\")\n      })\n    });\n  };\n\n}\n\n//# sourceURL=webpack:///./src/flipcards.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas */ \"./src/canvas.js\");\n/* harmony import */ var _moving_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n/* harmony import */ var _flipcards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./flipcards */ \"./src/flipcards.js\");\n/* harmony import */ var _animations_engine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./animations/engine */ \"./src/animations/engine.js\");\n/* harmony import */ var _onepage_scroll_helper_onepagescroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./onepage_scroll_helper/onepagescroll */ \"./src/onepage_scroll_helper/onepagescroll.js\");\n/* harmony import */ var _onepage_scroll_helper_onepagescroll__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_onepage_scroll_helper_onepagescroll__WEBPACK_IMPORTED_MODULE_5__);\n// index JS file\n\n\n\n\n\n// helper scroll library\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  console.log('webpack is running...')\n  console.log(\"DOM fully loaded and parsed\");\n  window.requestAnimFrame = _util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].requestAnimFrame;\n\n  // store the canvases\n  const canvas1 = new _canvas__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    canvas: document.getElementById(\"canvas2\"),\n    container: document.getElementById(\"a1\")\n  })\n  // store the flipCards\n  const flipcard0 = document.getElementById('fp00');\n  const flipCard1 = document.getElementById('fp01');\n  const flipcard2 = document.getElementById('fp02');\n  const flipcard3 = document.getElementById('fp03');\n  const cards = [flipcard0, flipCard1, flipcard2, flipcard3];\n  const cardEvents = new _flipcards__WEBPACK_IMPORTED_MODULE_3__[\"default\"](cards);\n\n  // add event listeners to cards\n  cardEvents.mouseClick();\n\n  // set shapes to render\n  // debugging - background shape\n  // animtaion01 shapes\n  const shape1 = new _moving_object__WEBPACK_IMPORTED_MODULE_2__[\"MovingObject\"]({\n    canvas: canvas1,\n    x: 20,\n    y: canvas1.height / 1.5,\n    radius: 40,\n    width: 40,\n    height: 40,\n    color: canvas1.colors.red,\n    opacity: 1.0,\n    type: 'square',\n    deltaX: 20,\n    deltaY: 1,\n  })\n  const shape2 = new _moving_object__WEBPACK_IMPORTED_MODULE_2__[\"MovingObject\"]({\n    canvas: canvas1,\n    x: 20,\n    y: canvas1.height / 3,\n    radius: 40,\n    width: 40,\n    height: 40,\n    color: canvas1.colors.red,\n    opacity: 0.4,\n    type: 'square',\n    deltaX: 20,\n    deltaY: 1,\n  })\n  const animation01 = new _animations_engine__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({shape: shape1, canvas: canvas1})\n  const animation02 = new _animations_engine__WEBPACK_IMPORTED_MODULE_4__[\"default\"]({shape: shape2, canvas: canvas1})\n  // animation02 shapes\n  // animation03 shapes\n  // store shapes in animations array\n  var animations = [animation01, animation02];\n\n  \n  \n  // render the shapes\n  function draw() {\n    window.requestAnimFrame(draw)\n    const pageOffset = document.getElementsByClassName(\"main onepage-wrapper\")[0].getBoundingClientRect()[\"top\"]\n    if (canvas1.scrolledTo(pageOffset) === true) {\n      canvas1.container.classList.toggle(\"hovered\", true);\n      canvas1.draw();\n      animation01.render();\n      animation02.render();\n    } else {\n      canvas1.container.classList.toggle(\"hovered\", false);\n    }\n  };\n  window.requestAnimFrame(draw);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! exports provided: MovingObject, makeObjects */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MovingObject\", function() { return MovingObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeObjects\", function() { return makeObjects; });\n// exports MovingObject class and makeObjects function\n// Both take in props, makeObjects takes in additional num arg\n\nclass MovingObject {\n  constructor(props) {\n\n    this.x = props.x\n    this.y = props.y\n\n    this.radius = props.radius\n    this.width  = props.width\n    this.height = props.height\n    this.color  = props.color\n    this.canvas = props.canvas\n    this.ctx    = props.canvas.ctx\n    this.type   = props.type\n    this.deltaX = props.deltaX\n    this.deltaY = props.deltaY\n\n    this.opacity = props.opacity\n\n    this.draw    = this.draw.bind(this)\n    this.circle  = this.circle.bind(this)\n    this.square  = this.square.bind(this)\n    this.render  = this.render.bind(this)\n    this.getDims = this.getDims.bind(this)\n    this.getSpeed    = this.getSpeed.bind(this)\n    this.changeDims  = this.changeDims.bind(this)\n    this.getPosition = this.getPosition.bind(this)\n    this.changeSpeed = this.changeSpeed.bind(this)\n    this.changePosition = this.changePosition.bind(this)\n  }\n\n  getPosition(){\n    return [this.x, this.y]\n  }\n\n changePosition(offsets){\n   let xDiff = offsets[0]\n   let yDiff = offsets[1]\n    this.x += xDiff\n    this.y += yDiff\n  }\n\n  getDims(){\n    return [this.width, this.height, this.radius]\n  }\n\n changeDims(w, h, r=0) {\n    this.width += w\n    this.height += h\n    this.r += r\n  }\n\n  getSpeed() {\n    return [this.deltaX, this.deltaY]\n  }\n\n changeSpeed(newDX, newDY) {\n    this.deltaX = newDX\n    this.deltaY = newDY\n  }\n\n  circle() {\n    this.ctx.beginPath()\n    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)\n    this.ctx.fillStyle = this.color\n    this.ctx.fill()\n    this.ctx.closePath()\n  }\n\n  square() {\n    this.ctx.globalAlpha = this.opacity\n    this.ctx.fillStyle = this.color\n    this.ctx.fillRect(this.x, this.y, this.width, this.height);\n    this.ctx.globalAlpha = 1.0\n    this.ctx.closePath();\n    return;\n  }\n\n  draw() {\n    if(this.type === \"square\"){\n      this.square();\n    } else if (this.type === \"circle\"){\n      this.circle()\n    }\n  }\n\n  render() {\n    this.draw()\n  }\n}\n// returns an array of objects\nconst makeObjects = (num, props) => {\n  let objects = []\n  for (let i = 0; i < num; i++) {\n    objects.push(new MovingObject(props))\n  }\n  return objects\n}\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/onepage_scroll_helper/onepagescroll.js":
/*!****************************************************!*\
  !*** ./src/onepage_scroll_helper/onepagescroll.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/* ===========================================================\n * onepagescroll.js v1.2.2\n * ===========================================================\n * Copyright 2014 Pete Rojwongsuriya.\n * http://www.thepetedesign.com\n *\n * Create an Apple-like website that let user scroll\n * one page at a time\n *\n * Credit: Eike Send for the awesome swipe event\n * https://github.com/peachananr/purejs-onepage-scroll\n * \n * License: GPL v3\n *\n * ========================================================== */\n\t\nfunction onePageScroll(element, options) {\n  \n  var defaults = {\n\t    \tsectionContainer: \"section\",\n\t    \teasing: \"ease\",\n\t    \tanimationTime: 1000,\n\t    \tpagination: true,\n\t    \tupdateURL: false,\n\t    \tkeyboard: true,\n\t    \tbeforeMove: null,\n\t    \tafterMove: null,\n\t    \tloop: false,\n\t    \tresponsiveFallback: false\n\t    },\n\t    _root = this,\n\t    settings = Object.extend({}, defaults, options),\n\t    el = document.querySelector(element),\n\t    sections = document.querySelectorAll(settings.sectionContainer),\n\t    total = sections.length,\n\t    status = \"off\",\n\t    topPos = 0,\n\t    lastAnimation = 0,\n\t    quietPeriod = 500,\n\t    paginationList = \"\",\n\t    body = document.querySelector(\"body\");\n  \n  this.init = function() { \n    /*-------------------------------------------*/\n    /*  Prepare Everything                       */\n    /*-------------------------------------------*/\n    \n  \t_addClass(el, \"onepage-wrapper\")\n  \tel.style.position = \"relative\";\n    \n  \tfor( var i = 0; i < sections.length; i++){\n  \t  _addClass(sections[i], \"ops-section\")\n  \t  sections[i].dataset.index = i + 1;\n  \t  topPos = topPos + 100;\n    \n  \t  if(settings.pagination == true) {\n  \t\t\tpaginationList += \"<li><a data-index='\" + (i + 1) + \"' href='#\" + (i + 1) + \"'></a></li>\";\n  \t\t}\n    }\n    \n  \t_swipeEvents(el);\n  \tdocument.addEventListener(\"swipeDown\",  function(event){\n  \t  if (!_hasClass(body, \"disabled-onepage-scroll\")) event.preventDefault();\n  \t\tmoveUp(el);\n  \t});\n  \tdocument.addEventListener(\"swipeUp\", function(event){\n  \t\tif (!_hasClass(body, \"disabled-onepage-scroll\")) event.preventDefault();\n  \t\tmoveDown(el);\n  \t});\n    \n  \t// Create Pagination and Display Them\n    \n  \tif(settings.pagination == true) {\n  \t  var pagination = document.createElement(\"ul\");\n  \t  pagination.setAttribute(\"class\", \"onepage-pagination\");\n    \n  \t  body.appendChild(pagination)\n  \t\tpagination.innerHTML = paginationList;\n  \t\tvar posTop = (document.querySelector(\".onepage-pagination\").offsetHeight / 2) * -1;\n\t\t\tdocument.querySelector(\".onepage-pagination\").style.marginTop = posTop;\n\t\t\t\n  \t}\n    \n  \tif(window.location.hash != \"\" && window.location.hash != \"#1\") {\n  \t\tvar init_index =  window.location.hash.replace(\"#\", \"\"),\n  \t\t    next = document.querySelector(settings.sectionContainer + \"[data-index='\" + (init_index) + \"']\"),\n  \t\t    next_index = next.dataset.index;\n    \n  \t\t_addClass( document.querySelector(settings.sectionContainer + \"[data-index='\" + init_index + \"']\") ,\"active\")\n  \t\t_addClass(body, \"viewing-page-\"+ init_index)\n  \t\tif(settings.pagination == true) _addClass(document.querySelector(\".onepage-pagination li a\" + \"[data-index='\" + init_index + \"']\"), \"active\");\n    \n  \t\tif(next) {\n  \t\t\t_addClass(next, \"active\")\n  \t\t\tif(settings.pagination == true) _addClass(document.querySelector(\".onepage-pagination li a\" + \"[data-index='\" + init_index + \"']\"), \"active\");\n    \n  \t\t\tbody.className = body.className.replace(/\\bviewing-page-\\d.*?\\b/g, '');\n  \t\t\t_addClass(body, \"viewing-page-\" + next_index)\n  \t\t\tif (history.replaceState && settings.updateURL == true) {\n  \t\t\t\tvar href = window.location.href.substr(0,window.location.href.indexOf('#')) + \"#\" + (init_index);\n  \t\t\t\thistory.pushState( {}, document.title, href );\n  \t\t\t}\n  \t\t}\n  \t\tvar pos = ((init_index - 1) * 100) * -1;\n  \t\t_transformPage(el, settings, pos, init_index);\n    \n  \t}else{\n  \t  _addClass(document.querySelector(settings.sectionContainer + \"[data-index='1']\"), \"active\");\n  \t  _addClass(body, \"viewing-page-1\");\n  \t\tif(settings.pagination == true) _addClass(document.querySelector(\".onepage-pagination li a[data-index='1']\"), \"active\");\n  \t}\n    \n  \t_paginationHandler = function() {\n      var page_index = this.dataset.index;\n  \t\tmoveTo(el, page_index);\n  \t}\n    \n    \n  \tif(settings.pagination == true)  {\n  \t  var pagination_links = document.querySelectorAll(\".onepage-pagination li a\");\n    \n  \t  for( var i = 0; i < pagination_links.length; i++){\n    \t  pagination_links[i].addEventListener('click', _paginationHandler);\n      }\n  \t}\n    \n  \t_mouseWheelHandler = function(event) {\n  \t\tevent.preventDefault();\n  \t\tvar delta = event.wheelDelta || -event.detail;\n  \t\tif (!_hasClass(body, \"disabled-onepage-scroll\")) _init_scroll(event, delta);\n  \t}\n    \n  \tdocument.addEventListener('mousewheel', _mouseWheelHandler);\n  \tdocument.addEventListener('DOMMouseScroll', _mouseWheelHandler);\n    \n    \n  \tif(settings.responsiveFallback != false) {\n  \t  window.onresize = function(){\n  \t\t\t_responsive();\n  \t\t}\n    \n  \t\t_responsive();\n  \t}\n    \n    _keydownHandler = function(e) {\n  \t\tvar tag = e.target.tagName.toLowerCase();\n    \n  \t\tif (!_hasClass(body, \"disabled-onepage-scroll\")) {\n  \t\t\tswitch(e.which) {\n  \t\t\t\tcase 38:\n  \t\t\t\t\tif (tag != 'input' && tag != 'textarea') moveUp(el)\n  \t\t\t\t\tbreak;\n  \t\t\t\tcase 40:\n  \t\t\t\t\tif (tag != 'input' && tag != 'textarea') moveDown(el)\n  \t\t\t\t\tbreak;\n  \t\t\t\tdefault: return;\n  \t\t\t}\n  \t\t}\n  \t\treturn false;\n  \t}\n    \n  \tif(settings.keyboard == true) {\n  \t\tdocument.onkeydown = _keydownHandler;\n  \t}\n  \treturn false;\n  }\n  \n  /*-------------------------------------------------------*/\n  /*  Private Functions                                    */\n  /*-------------------------------------------------------*/\n  /*------------------------------------------------*/\n  /*  Credit: Eike Send for the awesome swipe event */\n  /*------------------------------------------------*/\n  _swipeEvents = function(el){\n  \tvar startX,\n  \t\tstartY;\n  \n    document.addEventListener(\"touchstart\", touchstart);  \n  \n  \tfunction touchstart(event) {\n  \t\tvar touches = event.touches;\n  \t\tif (touches && touches.length) {\n  \t\t\tstartX = touches[0].pageX;\n  \t\t\tstartY = touches[0].pageY;\n  \t\t\tdocument.addEventListener(\"touchmove\", touchmove);\n  \t\t}\n  \t}\n  \n  \tfunction touchmove(event) {\n  \t\tvar touches = event.touches;\n  \t\tif (touches && touches.length) {\n  \t\t  event.preventDefault();\n  \t\t\tvar deltaX = startX - touches[0].pageX;\n  \t\t\tvar deltaY = startY - touches[0].pageY;\n  \n  \t\t\tif (deltaX >= 50) {\n  \t\t\t  var event = new Event('swipeLeft');\n  \t\t\t  document.dispatchEvent(event);\n  \t\t\t}\n  \t\t\tif (deltaX <= -50) {\n  \t\t\t  var event = new Event('swipeRight');\n  \t\t\t  document.dispatchEvent(event);\n  \t\t\t}\n  \t\t\tif (deltaY >= 50) {\n  \t\t\t  var event = new Event('swipeUp');\n  \t\t\t  document.dispatchEvent(event);\n  \t\t\t}\n  \t\t\tif (deltaY <= -50) {\n  \t\t\t  var event = new Event('swipeDown');\n  \t\t\t  document.dispatchEvent(event);\n  \t\t\t}\n  \n  \t\t\tif (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {\n  \t\t\t\tdocument.removeEventListener('touchmove', touchmove);\n  \t\t\t}\n  \t\t}\n  \t}\n  \n  };\n  /*-----------------------------------------------------------*/\n\t/*  Utility to add/remove class easily with javascript       */\n\t/*-----------------------------------------------------------*/\n\n  _trim = function(str) {\n      return str.replace(/^\\s\\s*/, '').replace(/\\s\\s*$/, '');\n  }\n\n  _hasClass = function(ele,cls) {\n    if (ele.className) {\n      return ele.className.match(new RegExp('(\\\\s|^)'+cls+'(\\\\s|$)'));\n    } else {\n      return ele.className = cls;\n    }\n  }\n\n  _addClass = function(ele,cls) {\n    if (!_hasClass(ele,cls)) ele.className += \" \"+cls;\n    ele.className = _trim(ele.className)\n  }\n\n  _removeClass = function(ele,cls) {\n    if (_hasClass(ele,cls)) {\n        var reg = new RegExp('(\\\\s|^)'+cls+'(\\\\s|$)');\n        ele.className=ele.className.replace(reg,' ');\n    }\n    ele.className = _trim(ele.className)\n  }\n\n  /*-----------------------------------------------------------*/\n\t/*  Transtionend Normalizer by Modernizr                     */\n\t/*-----------------------------------------------------------*/\n\n  _whichTransitionEvent = function(){\n    var t;\n    var el = document.createElement('fakeelement');\n    var transitions = {\n      'transition':'transitionend',\n      'OTransition':'oTransitionEnd',\n      'MozTransition':'transitionend',\n      'WebkitTransition':'webkitTransitionEnd'\n    }\n\n    for(t in transitions){\n        if( el.style[t] !== undefined ){\n            return transitions[t];\n        }\n    }\n  }\n\n  /*-----------------------------------------------------------*/\n\t/*  Function to perform scroll to top animation              */\n\t/*-----------------------------------------------------------*/\n\n  _scrollTo = function(element, to, duration) {\n    if (duration < 0) return;\n    var difference = to - element.scrollTop;\n    var perTick = difference / duration * 10;\n\n    setTimeout(function() {\n        element.scrollTop = element.scrollTop + perTick;\n        if (element.scrollTop == to) return;\n        _scrollTo(element, to, duration - 10);\n    }, 10);\n  }\n  \n  \n     \n  /*---------------------------------*/\n  /*  Function to transform the page */\n  /*---------------------------------*/\n  \n  _transformPage = function(el2, settings, pos, index, next_el) {\n    if (typeof settings.beforeMove == 'function') settings.beforeMove(index, next_el);\n    \n    var transformCSS = \"-webkit-transform: translate3d(0, \" + (pos / 2) + \"%, 0); -webkit-transition: -webkit-transform \" + settings.animationTime + \"ms \" + settings.easing + \"; -moz-transform: translate3d(0, \" + pos / 2 + \"%, 0); -moz-transition: -moz-transform \" + settings.animationTime + \"ms \" + settings.easing + \"; -ms-transform: translate3d(0, \" + pos / 2 + \"%, 0); -ms-transition: -ms-transform \" + settings.animationTime + \"ms \" + settings.easing + \"; transform: translate3d(0, \" + pos / 2 + \"%, 0); transition: transform \" + settings.animationTime + \"ms \" + settings.easing + \";\";\n    \n    el2.style.cssText = transformCSS;\n    \n    var transitionEnd = _whichTransitionEvent();\n     el2.addEventListener(transitionEnd, endAnimation, false);\n    \n    function endAnimation() {\n      if (typeof settings.afterMove == 'function') settings.afterMove(index, next_el);\n      el2.removeEventListener(transitionEnd, endAnimation)\n    }\n  }\n  \n  /*-------------------------------------------*/\n  /*  Responsive Fallback trigger              */\n  /*-------------------------------------------*/\n  \n  _responsive = function() {\n\n\t\tif (document.body.clientWidth < settings.responsiveFallback) {\n\t\t\t\n\t\t\t_addClass(body, \"disabled-onepage-scroll\");\n\t\t\tdocument.removeEventListener('mousewheel', _mouseWheelHandler);\n\t\t\tdocument.removeEventListener('DOMMouseScroll', _mouseWheelHandler);\n\t\t\t_swipeEvents(el);\n\t\t\tdocument.removeEventListener(\"swipeDown\");\n\t\t\tdocument.removeEventListener(\"swipeUp\");\n\t\t\t\n\t\t} else {\n\t\t  \n\t\t  if (_hasClass(body, \"disabled-onepage-scroll\")) {\n\t\t    _removeClass(body, \"disabled-onepage-scroll\");\n\t\t    _scrollTo(document.documentElement, 0, 2000);\n\t    }\n      \n      \n\n\t\t\t_swipeEvents(el);\n\t\t\tdocument.addEventListener(\"swipeDown\",  function(event){\n\t\t\t  if (!_hasClass(body, \"disabled-onepage-scroll\")) event.preventDefault();\n\t\t\t\tmoveUp(el);\n\t\t\t});\n\t\t\tdocument.addEventListener(\"swipeUp\", function(event){\n\t\t\t\tif (!_hasClass(body, \"disabled-onepage-scroll\")) event.preventDefault();\n\t\t\t\tmoveDown(el);\n\t\t\t});\n      \n      document.addEventListener('mousewheel', _mouseWheelHandler);\n  \t\tdocument.addEventListener('DOMMouseScroll', _mouseWheelHandler);\n\t\t\t\n\t\t}\n\t}\n\t\n\t/*-------------------------------------------*/\n  /*  Initialize scroll detection              */\n  /*-------------------------------------------*/\n  \n  _init_scroll = function(event, delta) {\n\t\tvar deltaOfInterest = delta,\n\t\t\ttimeNow = new Date().getTime();\n\t\t\t\n\t\t// Cancel scroll if currently animating or within quiet period\n\t\tif(timeNow - lastAnimation < quietPeriod + settings.animationTime) {\n\t\t\tevent.preventDefault();\n\t\t\treturn;\n\t\t}\n\n\t\tif (deltaOfInterest < 0) {\n\t\t\tmoveDown(el)\n\t\t} else {\n\t\t\tmoveUp(el)\n\t\t}\n\t\t\n\t\tlastAnimation = timeNow;\n\t}\n   \n  \n  /*-------------------------------------------------------*/\n  /*  Public Functions                                     */\n  /*-------------------------------------------------------*/\n  \n  /*---------------------------------*/\n  /*  Function to move down section  */\n  /*---------------------------------*/\n  \n   this.moveDown = function(el3) {\n    \n    if (typeof el3 == \"string\") el3 = document.querySelector(el3);\n    \n    var index = document.querySelector(settings.sectionContainer +\".active\").dataset.index,\n\t\t    current = document.querySelector(settings.sectionContainer + \"[data-index='\" + index + \"']\"),\n\t\t    next = document.querySelector(settings.sectionContainer + \"[data-index='\" + (parseInt(index) + 1) + \"']\");\n\t\t    \n\t\t    \n\t\tif(!next) {\n\t\t\tif (settings.loop == true) {\n\t\t\t\tpos = 0;\n\t\t\t\tnext = document.querySelector(settings.sectionContainer + \"[data-index='1']\");\n\t\t\t} else {\n\t\t\t\treturn\n\t\t\t}\n\n\t\t}else {\n\t\t\tpos = (index * 100) * -1;\n\t\t}\n\t\tvar next_index = next.dataset.index;\n\t\t_removeClass(current, \"active\");\n\t\t_addClass(next, \"active\");\n\t\t\n\t\tif(settings.pagination == true) {\n\t\t  _removeClass(document.querySelector(\".onepage-pagination li a\" + \"[data-index='\" + index + \"']\"), \"active\");\n\t\t  _addClass(document.querySelector(\".onepage-pagination li a\" + \"[data-index='\" + next_index + \"']\"), \"active\");\n\t\t}\n\n\t\tbody.className = body.className.replace(/\\bviewing-page-\\d.*?\\b/g, '');\n\t\t_addClass(body, \"viewing-page-\"+ next_index);\n\n\t\tif (history.replaceState && settings.updateURL == true) {\n\t\t\tvar href = window.location.href.substr(0,window.location.href.indexOf('#')) + \"#\" + (parseInt(index) + 1);\n\t\t\thistory.pushState( {}, document.title, href );\n\t\t}\n\t\t_transformPage(el3, settings, pos, next_index, next);\n\t}\n\t\n\t/*---------------------------------*/\n  /*  Function to move up section    */\n  /*---------------------------------*/\n\t\n\tthis.moveUp = function(el4) {\n\t  \n\t  if (typeof el4 == \"string\") el4 = document.querySelector(el4);\n\t  \n\t  var index = document.querySelector(settings.sectionContainer +\".active\").dataset.index,\n\t\t    current = document.querySelector(settings.sectionContainer + \"[data-index='\" + index + \"']\"),\n\t\t    next = document.querySelector(settings.sectionContainer + \"[data-index='\" + (parseInt(index) - 1) + \"']\");\n\n\t\tif(!next) {\n\t\t\tif (settings.loop == true) {\n\t\t\t\tpos = ((total - 1) * 100) * -1;\n\t\t\t\tnext = document.querySelector(settings.sectionContainer + \"[data-index='\" + total + \"']\");\n\t\t\t} else {\n\t\t\t\treturn\n\t\t\t}\n\t\t}else {\n\t\t\tpos = ((next.dataset.index - 1) * 100) * -1;\n\t\t}\n\t\tvar next_index = next.dataset.index;\n\t\t_removeClass(current, \"active\")\n\t\t_addClass(next, \"active\")\n\t\t\n\t\tif(settings.pagination == true) {\n\t\t  _removeClass(document.querySelector(\".onepage-pagination li a\" + \"[data-index='\" + index + \"']\"), \"active\");\n\t\t  _addClass(document.querySelector(\".onepage-pagination li a\" + \"[data-index='\" + next_index + \"']\"), \"active\");\n\t\t}\n\t\tbody.className = body.className.replace(/\\bviewing-page-\\d.*?\\b/g, '');\n\t\t_addClass(body, \"viewing-page-\"+ next_index);\n\n\t\tif (history.replaceState && settings.updateURL == true) {\n\t\t\tvar href = window.location.href.substr(0,window.location.href.indexOf('#')) + \"#\" + (parseInt(index) - 1);\n\t\t\thistory.pushState( {}, document.title, href );\n\t\t}\n\t\t_transformPage(el4, settings, pos, next_index, next);\n\t}\n  \n  /*-------------------------------------------*/\n  /*  Function to move to specified section    */\n  /*-------------------------------------------*/\n  \n  this.moveTo = function(el5, page_index) {\n    \n    if (typeof el5 == \"string\") el5 = document.querySelector(el5);\n    \n\t\tvar current = document.querySelector(settings.sectionContainer + \".active\"),\n\t\t    next = document.querySelector(settings.sectionContainer + \"[data-index='\" + (page_index) + \"']\");\n\t\t    \n\t\tif(next) {\n\t\t  var next_index = next.dataset.index;\n\t\t\t_removeClass(current, \"active\");\n\t\t\t_addClass(next, \"active\");\n\t\t\t_removeClass(document.querySelector(\".onepage-pagination li a\" + \".active\"), \"active\");\n\t\t\t_addClass(document.querySelector(\".onepage-pagination li a\" + \"[data-index='\" + (page_index) + \"']\"), \"active\");\n\n\t\t\tbody.className = body.className.replace(/\\bviewing-page-\\d.*?\\b/g, '');\n\t\t\t_addClass(body, \"viewing-page-\"+ next_index);\n\n\t\t\tpos = ((page_index - 1) * 100) * -1;\n\n\t\t\tif (history.replaceState && settings.updateURL == true) {\n\t\t\t\tvar href = window.location.href.substr(0,window.location.href.indexOf('#')) + \"#\" + (parseInt(page_index) - 1);\n\t\t\t\thistory.pushState( {}, document.title, href );\n\t\t\t}\n\t\t\t_transformPage(el5, settings, pos, page_index, next);\n\t\t}\n\t}\n\t\n  this.init();\n}\n\n/*------------------------------------------------*/\n /*  Ulitilities Method                            */\n /*------------------------------------------------*/\n \n /*-----------------------------------------------------------*/\n /*  Function by John Resig to replicate extend functionality */\n /*-----------------------------------------------------------*/\n \n Object.extend = function(orig){\n   if ( orig == null )\n     return orig;\n \n   for ( var i = 1; i < arguments.length; i++ ) {\n     var obj = arguments[i];\n     if ( obj != null ) {\n       for ( var prop in obj ) {\n         var getter = obj.__lookupGetter__( prop ),\n             setter = obj.__lookupSetter__( prop );\n \n         if ( getter || setter ) {\n           if ( getter )\n             orig.__defineGetter__( prop, getter );\n           if ( setter )\n             orig.__defineSetter__( prop, setter );\n         } else {\n           orig[ prop ] = obj[ prop ];\n         }\n       }\n     }\n   }\n \n   return orig;\n };\n\t\n\n\n\n//# sourceURL=webpack:///./src/onepage_scroll_helper/onepagescroll.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Util = {\n  inherits: function inherits(childClass, parentClass) {\n    // TODO: allow classes to inherit\n  },\n  getRandom: function (min, max) {\n    return Math.floor(Math.random() * (max  - min) + min);\n  },\n  getRandomFraction: function (min, max) {\n    return Math.random() * (max - min) + min;\n  },\n  // shim layer with setTimeout fallback based on work by Paul Irish\n  requestAnimFrame: (function () {\n      return window.requestAnimationFrame ||\n        window.webkitRequestAnimationFrame ||\n        window.mozRequestAnimationFrame ||\n        window.oRequestAnimationFrame ||\n        window.msRequestAnimationFrame ||\n        function (callback) {\n          window.setTimeout(callback, 1000 / 60);\n        };\n    })(),\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Util);\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });