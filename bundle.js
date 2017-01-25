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
	const Coin = __webpack_require__(6);
	const Mine = __webpack_require__(7);
	const Util = __webpack_require__(3);
	
	class Game {
	  constructor() {
	    this.mines = [];
	    this.coin = new Coin({ game: this });
	    this.ship = null;
	    this.max_width = Game.DIM_X;
	    this.max_height = Game.DIM_Y;
	    this.score = 0;
	  }
	
	  // add(obj) {
	  //   if (obj instanceof Ship) {
	  //     this.ships.push(obj);
	  //   } else if (obj instanceof Coin) {
	  //     this.coins.push(obj);
	  //   }
	  // }
	
	  // addCoin() {
	  //   const coin = new Coin({
	  //     game: this
	  //   });
	  //
	  //   this.add(coin);
	  //   return coin;
	  // }
	
	  addShip() {
	    const ship = new Ship({
	      game: this
	    });
	
	    this.ship = ship;
	    return ship;
	  }
	
	  addMine() {
	    const mine = new Mine({
	      game: this
	    });
	
	    this.mines.push(mine);
	    return mine;
	  }
	
	  randomPosition() {
	    return [
	      Game.DIM_X * Math.random(),
	      Game.DIM_Y * Math.random()
	    ];
	  }
	
	  allObjects() {
	    return [].concat([this.ship], [this.coin], this.mines);
	  }
	
	  moveObjects(delta) {
	    this.allObjects().forEach((obj) => {
	      obj.move(delta);
	    });
	    this.mines.forEach((mine) => {
	      mine.stalk(this.ship.pos);
	    });
	  }
	
	  draw(ctx) {
	    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	    // let bgimg = document.getElementById('bg');
	    // ctx.fillStyle = ctx.createPattern(bgimg, 'repeat-y');
	    ctx.fillStyle = Game.BG_COLOR;
	    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
	    this.allObjects().forEach((obj) => {
	      obj.draw(ctx);
	    });
	  }
	
	  checkCollisions() {
	    if (this.coin.isCollidedWith(this.ship)) {
	      this.remove(this.coin);
	      this.score += 1;
	      this.addMine();
	    }
	  }
	
	  remove(obj) {
	    if (obj instanceof Coin) {
	      this.coin = new Coin({ game: this });
	    }
	  }
	
	  step(delta) {
	    this.moveObjects(delta);
	    this.checkCollisions();
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
	    options.pos = [500, 500];
	    options.radius = 15;
	    options.dir = [0, 1];
	    options.speed = 0;
	    options.img = document.getElementById('myship');
	    super(options);
	  }
	
	  propel(impulse, ctx) {
	    if (impulse === 'up' && this.speed > -10) {
	      this.speed -= 1.5;
	    } else if (impulse === 'down' && this.speed < 10) {
	      this.speed += 1.5;
	    } else if (impulse === 'left') {
	      this.dir = Util.rotate(this.dir, -0.2);
	      console.log(this.dir);
	      this.rotate(ctx, -0.2, this.img);
	    } else if (impulse === 'right') {
	      this.dir = Util.rotate(this.dir, 0.2);
	      this.rotate(ctx, 0.2, this.img);
	    }
	    this.vel = Util.calcVel(this.dir, this.speed);
	  }
	
	  rotate(ctx, rad) {
	    // ctx.clearRect(0,0,1000,600);
	    // ctx.save();
	    // ctx.translate(1000/2,600/2);
	    // ctx.rotate(rad);
	    // this.draw(ctx);
	    // ctx.restore();
	  }
	
	  draw(ctx) {
	    ctx.drawImage(this.img, this.pos[0], this.pos[1], 30, 30);
	  }
	
	
	  // drag() {
	  //   if (this.speed > 0) {
	  //     this.speed -= 0.1;
	  //   } else if (this.speed < 0) {
	  //     this.speed += 0.1;
	  //   }
	  //   this.vel = Util.calcVel(this.dir, this.speed);
	  // }
	}
	
	module.exports = Ship;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  dir (ref, target) {
	    // const norm = Util.norm(vec);
	    // return Util.scale(vec, 1 / norm);
	    let dirVec = [target[0] - ref[0], target[1] - ref[1]];
	    const norm = Util.norm(dirVec);
	    return Util.scale(dirVec, 1 / norm);
	  },
	
	  dist (pos1, pos2) {
	    return Math.sqrt(
	      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
	    );
	  },
	
	  calcVel (dir, speed) {
	    return [dir[0] * speed, dir[1] * speed];
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
	  },
	
	  rotate (dir, rad) {
	    let newX = (dir[0] * Math.cos(rad)) - (dir[1] * Math.sin(rad));
	    let newY = (dir[1] * Math.cos(rad)) + (dir[0] * Math.sin(rad));
	    return [newX, newY];
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
	    this.dir = options.dir;
	    this.color = options.color;
	    this.speed = options.speed;
	    this.radius = options.radius;
	    this.game = options.game;
	    this.img = options.img;
	    this.vel = Util.calcVel(this.dir, this.speed);
	  }
	
	  // draw(ctx) {
	  //   ctx.fillStyle = this.color;
	  //
	  //   ctx.beginPath();
	  //   ctx.arc(
	  //     this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	  //   );
	  //   ctx.fill();
	  // }
	
	  // isCollidedWith(otherObject) {
	  //   const centerDist = Util.dist(this.pos, otherObject.pos);
	  //   return centerDist < (this.radius + otherObject.radius);
	  // }
	
	  move(delta) {
	    const velScale = delta / FRAME_DELTA;
	    let offsetX = this.vel[0] * velScale;
	    let offsetY = this.vel[1] * velScale;
	
	    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
	
	    if (this.pos[0] < this.radius) {
	      this.pos[0] = this.radius;
	      this.speed = 0;
	      this.vel = Util.calcVel(this.dir, this.speed);
	    } else if (this.pos[0] > (this.game.max_width - this.radius)) {
	      this.pos[0] = this.game.max_width - this.radius;
	      this.speed = 0;
	      this.vel = Util.calcVel(this.dir, this.speed);
	    } else if (this.pos[1] < this.radius) {
	      this.pos[1] = this.radius;
	      this.speed = 0;
	      this.vel = Util.calcVel(this.dir, this.speed);
	    } else if (this.pos[1] > (this.game.max_height - this.radius)) {
	      this.pos[1] = this.game.max_height - this.radius;
	      this.speed = 0;
	      this.vel = Util.calcVel(this.dir, this.speed);
	    }
	  }
	
	  isCollidedWith(otherObject) {
	    const centerDist = Util.dist(this.pos, otherObject.pos);
	    return centerDist < (this.radius + otherObject.radius);
	  }
	
	  // remove() {
	  //   this.game.remove(this);
	  // }
	}
	
	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class GameView {
	  constructor(game, ctx, score) {
	    this.ctx = ctx;
	    this.game = game;
	    this.ship = this.game.addShip();
	  }
	
	  bindKeyHandlers() {
	    const ship = this.ship;
	
	    GameView.DIRS.forEach((k) => {
	      key(k, () => {
	        ship.propel(k, this.ctx);
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
	    document.getElementById('score').innerHTML = this.game.score;
	
	    requestAnimationFrame(this.animate.bind(this));
	  }
	}
	
	GameView.DIRS = ['up', 'down', 'left', 'right'];
	
	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	
	class Coin extends MovingObject {
	  constructor(options = {}) {
	    options.color = '#ffd700';
	    options.pos = options.game.randomPosition();
	    options.radius = 10;
	    options.dir = [1, 0];
	    options.speed = 0;
	    super(options);
	  }
	
	  draw(ctx) {
	    ctx.fillStyle = this.color;
	
	    ctx.beginPath();
	    ctx.arc(
	      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
	    );
	    ctx.fill();
	  }
	}
	
	module.exports = Coin;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);
	
	class Mine extends MovingObject {
	  constructor(options = {}) {
	    options.pos = options.game.randomPosition();
	    options.radius = 15;
	    options.dir = [0, 1];
	    options.speed = 0;
	    options.img = document.getElementById('mymine');
	    super(options);
	  }
	
	  draw(ctx) {
	    ctx.drawImage(this.img, this.pos[0], this.pos[1], 30, 30);
	  }
	
	  stalk(shipPos) {
	    let dist = Util.dist(this.pos, shipPos);
	    this.dir = Util.dir(this.pos, shipPos);
	    this.speed = 75 / dist;
	    this.vel = Util.calcVel(this.dir, this.speed);
	  }
	}
	
	module.exports = Mine;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map