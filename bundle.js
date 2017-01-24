/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(5);
	
	document.addEventListener('DOMContentLoaded', function() {
	  const canvasEl = document.getElementsByTagName('canvas')[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  const ctx = canvasEl.getContext('2d');
	  const game = new Game();
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(2);
	const Util = __webpack_require__(3);
	
	class Game {
	  constructor() {
	    this.mines = [];
	    this.coins = [];
	    this.ships = [];
	    this.max_width = Game.DIM_X;
	    this.max_height = Game.DIM_Y;
	  }
	
	  add(obj) {
	    if (obj instanceof Ship) {
	      this.ships.push(obj);
	    }
	  }
	
	  addShip() {
	    const ship = new Ship({
	      game: this
	    });
	
	    this.add(ship);
	    return ship;
	  }
	
	  allObjects() {
	    return [].concat(this.ships, this.coins, this.mines);
	  }
	
	  moveObjects(delta) {
	    this.allObjects().forEach((obj) => {
	      obj.move(delta);
	    });
	  }
	
	  draw(ctx) {
	    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	    ctx.fillStyle = Game.BG_COLOR;
	    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	
	    this.allObjects().forEach((obj) => {
	      obj.draw(ctx);
	    });
	  }
	
	  remove(obj) {
	    if (obj instanceof Ship) {
	      this.ships.splice(this.ships.indexOf(obj), 1);
	    }
	  }
	
	  step(delta) {
	    this.moveObjects(delta);
	  }
	}
	
	Game.DIM_X = 1000;
	Game.DIM_Y = 600;
	Game.BG_COLOR = '#f5f5f5';
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);
	
	class Ship extends MovingObject {
	  constructor(options = {}) {
	    options.color = '#000000';
	    options.pos = [500, 500];
	    options.radius = 10;
	    options.vel = [0, 0];
	    super(options);
	  }
	
	  propel(rowdir) {
	    if (Util.speed(this.vel) < 5) {
	      this.vel[0] += rowdir[0];
	      this.vel[1] += rowdir[1];
	    }
	  }
	}
	
	module.exports = Ship;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  dir (vec) {
	    const norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	  },
	
	  dist (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	
	  norm (vec) {
	    return Util.dist([0, 0], vec);
	  },
	
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },
	
	  speed (vel) {
	    return Math.sqrt(
	      Math.pow(vel[0], 2) + Math.pow(vel[1], 2)
	    );
	  }
	};
	
	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const Game = __webpack_require__(1);
	
	const FRAME_DELTA = 1000/60;
	
	class MovingObject {
	  constructor(options) {
	    this.pos = options.pos;
	    this.vel = options.vel;
	    this.radius = options.radius;
	    this.color = options.color;
	    this.game = options.game;
	  }
	
	  draw(ctx) {
	    ctx.fillStyle = this.color;
	
	    ctx.beginPath();
	    ctx.arc(
	      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	    );
	    ctx.fill();
	  }
	
	  isCollidedWith(otherObject) {
	    const centerDist = Util.dist(this.pos, otherObject.pos);
	    return centerDist < (this.radius + otherObject.radius);
	  }
	
	  move(delta) {
	    const velScale = delta / FRAME_DELTA;
	    let offsetX = this.vel[0] * velScale;
	    let offsetY = this.vel[1] * velScale;
	
	    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
	
	    if (this.pos[0] < this.radius) {
	      debugger
	      this.pos[0] = this.radius;
	      this.vel = [0, 0];
	    } else if (this.pos[0] > (this.game.max_width - this.radius)) {
	      debugger
	      this.pos[0] = this.game.max_width - this.radius;
	      this.vel = [0, 0];
	    } else if (this.pos[1] < this.radius) {
	      debugger
	      this.pos[1] = this.radius;
	      this.vel = [0, 0];
	    } else if (this.pos[1] > (this.game.max_height - this.radius)) {
	      debugger
	      this.pos[1] = this.game.max_height - this.radius;
	      this.vel = [0, 0];
	    }
	  }
	
	  remove() {
	    this.game.remove(this);
	  }
	}
	
	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class GameView {
	  constructor(game, ctx) {
	    this.ctx = ctx;
	    this.game = game;
	    this.ship = this.game.addShip();
	  }
	
	  bindKeyHandlers() {
	    const ship = this.ship;
	
	    Object.keys(GameView.DIRS).forEach((k) => {
	      let rowdir = GameView.DIRS[k];
	      key(k, () => {
	        ship.propel(rowdir);
	      });
	    });
	  }
	
	  start() {
	    this.bindKeyHandlers();
	    this.prevTime = 0;
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  animate(time) {
	    const delta = time - this.prevTime;
	
	    this.game.step(delta);
	    this.game.draw(this.ctx);
	    this.prevTime = time;
	
	    requestAnimationFrame(this.animate.bind(this));
	  }
	}
	
	GameView.DIRS = {
	  'up': [0, -1],
	  'down': [0, 1],
	  'left': [-1, 0],
	  'right': [1, 0]
	};
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map