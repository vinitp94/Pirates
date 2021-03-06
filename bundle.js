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
	const GameView = __webpack_require__(7);
	
	const newGame = () => {
	  const canvasEl = document.getElementsByTagName('canvas')[0];
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  const ctx = canvasEl.getContext('2d');
	  let img = document.getElementById('bg');
	  img.onload = () => {
	    ctx.drawImage(img, 0, 0, Game.DIM_X, Game.DIM_Y);
	  };
	
	  const game = new Game();
	  new GameView(game, ctx).begin();
	};
	
	document.addEventListener('DOMContentLoaded', newGame);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Ship = __webpack_require__(2);
	const Coin = __webpack_require__(5);
	const Mine = __webpack_require__(6);
	const Util = __webpack_require__(3);
	
	const muteBtn = document.getElementById('sound').children[0];
	
	muteBtn.addEventListener('click', () => {
	  if (muteBtn.id === 'sound-on') {
	    muteBtn.id = 'sound-off';
	    muteBtn.src = './assets/images/sound_off.png';
	
	  } else {
	    muteBtn.id = 'sound-on';
	    muteBtn.src = './assets/images/sound_on.png';
	  }
	});
	
	const coinSnd = new Audio('./assets/audio/coin_sound.wav');
	const expSnd = new Audio('./assets/audio/explosion_sound.wav');
	
	class Game {
	  constructor() {
	    this.mines = [];
	    this.coin = new Coin({ game: this });
	    this.ship = null;
	    this.maxWidth = Game.DIM_X;
	    this.maxHeight = Game.DIM_Y;
	    this.score = 0;
	
	    this.coinSound = coinSnd;
	    this.explosionSound = expSnd;
	  }
	
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
	    let img = document.getElementById('bg');
	    ctx.drawImage(img, 0, 0, Game.DIM_X, Game.DIM_Y);
	
	    this.allObjects().forEach((obj) => {
	      obj.draw(ctx);
	    });
	  }
	
	  soundOn() {
	    return (document.getElementById('sound').children[0].id === 'sound-on');
	  }
	
	  explodeMines() {
	    for (let i = 0; i < this.mines.length; i++) {
	      for (let j = i + 1; j < this.mines.length; j++) {
	        if (this.mines[i].isCollidedWith(this.mines[j])) {
	          if (this.soundOn()) {
	            this.explosionSound.play();
	          }
	          this.remove(this.mines[i]);
	          this.remove(this.mines[j]);
	        }
	      }
	    }
	  }
	
	  findCoin() {
	    if (this.coin.isCollidedWith(this.ship)) {
	      this.remove(this.coin);
	      this.score += 100;
	      if (this.soundOn()) {
	        this.coinSound.play();
	      }
	      this.addMine();
	    }
	  }
	
	  playerLost() {
	    let result = false;
	    this.mines.forEach((mine) => {
	      if (mine.isCollidedWith(this.ship)) {
	        if (this.soundOn()) {
	          this.explosionSound.play();
	        }
	        this.remove(mine);
	        result = true;
	      }
	    });
	    return result;
	  }
	
	  reset() {
	    this.addShip();
	    this.mines = [];
	    this.coin = new Coin({ game: this });
	    this.score = 0;
	  }
	
	  remove(obj) {
	    if (obj instanceof Coin) {
	      this.coin = new Coin({ game: this });
	    } if (obj instanceof Mine) {
	      this.mines.splice(this.mines.indexOf(obj), 1);
	    }
	  }
	
	  step(delta) {
	    this.moveObjects(delta);
	    this.findCoin();
	    this.explodeMines();
	    this.ship.drag();
	  }
	}
	
	Game.DIM_X = 1000;
	Game.DIM_Y = 600;
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);
	
	class Ship extends MovingObject {
	  constructor(options = {}) {
	    options.pos = [500, 500];
	    options.dir = [0, 1];
	    options.speed = 0;
	    options.width = 30;
	    options.height = 30;
	    options.img = document.getElementById('myship');
	    super(options);
	  }
	
	  propel(impulse, ctx) {
	    if (impulse === 'up' && this.speed > -10) {
	      this.speed -= 2;
	    } else if (impulse === 'down' && this.speed < 10) {
	      this.speed += 2;
	    } else if (impulse === 'left') {
	      this.dir = Util.rotate(this.dir, -0.2);
	    } else if (impulse === 'right') {
	      this.dir = Util.rotate(this.dir, 0.2);
	    }
	    this.vel = Util.calcVel(this.dir, this.speed);
	  }
	
	  draw(ctx) {
	    ctx.save();
	    ctx.translate(this.pos[0], this.pos[1]);
	    if (this.dir[0] < 0) {
	      ctx.rotate(Util.angle(this.dir) + 1.5708);
	    } else {
	      ctx.rotate(Util.angle(this.dir) - 1.5708);
	    }
	    ctx.translate(-this.pos[0], -this.pos[1]);
	    ctx.drawImage(this.img, this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height);
	    ctx.restore();
	  }
	
	  drag() {
	    this.speed *= 0.995;
	    this.vel = Util.calcVel(this.dir, this.speed);
	  }
	}
	
	module.exports = Ship;


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  dir (ref, target) {
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
	
	  angle(dir) {
	    return Math.atan(dir[1] / dir[0]);
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
	    this.game = options.game;
	    this.img = options.img;
	    this.width = options.width;
	    this.height = options.height;
	    this.vel = Util.calcVel(this.dir, this.speed);
	  }
	
	  draw(ctx) {
	    ctx.drawImage(this.img, this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height);
	  }
	
	  move(delta) {
	    const velScale = delta / FRAME_DELTA;
	    let offsetX = this.vel[0] * velScale;
	    let offsetY = this.vel[1] * velScale;
	
	    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
	    if (this.pos[0] < this.width / 2) {
	      this.pos[0] = this.width / 2;
	      this.speed = 0;
	    } else if (this.pos[0] > (this.game.maxWidth - this.width / 2)) {
	      this.pos[0] = this.game.maxWidth - this.width / 2;
	      this.speed = 0;
	    } else if (this.pos[1] < this.height / 2) {
	      this.pos[1] = this.height / 2;
	      this.speed = 0;
	    } else if (this.pos[1] > (this.game.maxHeight - this.height / 2)) {
	      this.pos[1] = this.game.maxHeight - this.height / 2;
	      this.speed = 0;
	    }
	
	    this.vel = Util.calcVel(this.dir, this.speed);
	  }
	
	  isCollidedWith(otherObject) {
	    let selfCenter = [this.pos[0] - (this.width / 2),
	      this.pos[1] - (this.height / 2)];
	    let otherCenter = [otherObject.pos[0] - (otherObject.width / 2),
	      otherObject.pos[1] - (otherObject.height / 2)];
	    let centerDist = Util.dist(this.pos, otherObject.pos);
	    return centerDist < (this.width / 2 + otherObject.width / 2);
	  }
	}
	
	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	
	class Coin extends MovingObject {
	  constructor(options = {}) {
	    options.color = '#ffd700';
	    options.pos = options.game.randomPosition();
	    options.dir = [1, 0];
	    options.speed = 0;
	    options.width = 20;
	    options.height = 20;
	    options.img = document.getElementById('mycoin');
	    super(options);
	  }
	}
	
	module.exports = Coin;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(3);
	const MovingObject = __webpack_require__(4);
	
	class Mine extends MovingObject {
	  constructor(options = {}) {
	    options.pos = options.game.randomPosition();
	    options.dir = [0, 1];
	    options.speed = 0;
	    options.width = 30;
	    options.height = 30;
	    options.img = document.getElementById('mymine');
	    super(options);
	  }
	
	  stalk(shipPos) {
	    let dist = Util.dist(this.pos, shipPos);
	    this.dir = Util.dir(this.pos, shipPos);
	    this.speed = 75 / dist;
	    this.vel = Util.calcVel(this.dir, this.speed);
	  }
	}
	
	module.exports = Mine;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	class GameView {
	  constructor(game, ctx) {
	    this.ctx = ctx;
	    this.game = game;
	    this.ship = this.game.addShip();
	    this.highscore = 0;
	  }
	
	  bindKeyHandlers() {
	    const ship = this.ship;
	
	    GameView.DIRS.forEach((k) => {
	      key(k, () => {
	        ship.propel(k, this.ctx);
	      });
	    });
	  }
	
	  bindEnter() {
	    key('enter', () => {
	      this.start();
	    });
	  }
	
	  unbindEnter() {
	    key.unbind('enter');
	  }
	
	  renderScores() {
	    document.getElementById('score').innerHTML = this.game.score;
	
	    if (this.game.score >= this.highscore) {
	      this.highscore = this.game.score;
	    }
	    document.getElementById('high-score').innerHTML = this.highscore;
	  }
	
	  loseFn() {
	    let losshtml = '<h2>Aarrrghhh! You wrecked me ship!</h2>';
	    losshtml += '<h3>Press ENTER to play again!</h3>';
	
	    document.getElementById('lose-modal').innerHTML = losshtml;
	    this.game.reset();
	    this.ship = this.game.ship;
	    this.bindEnter();
	  }
	
	  begin() {
	    let introhtml = '<h2>Aye matey! Welcome to the sea of DOOM...</h2>';
	    introhtml += '<p>Use the arrow keys to collect as much treasure as possible.</p>';
	    introhtml += '<p>Oh, and beware of the mines...</p>';
	    introhtml += '<h3>Press ENTER to begin!</h3>';
	    document.getElementById('start-modal').innerHTML = introhtml;
	    this.game.draw(this.ctx);
	    this.bindEnter();
	  }
	
	  start() {
	    this.unbindEnter();
	    document.getElementById('start-modal').innerHTML = '';
	    document.getElementById('lose-modal').innerHTML = '';
	    this.bindKeyHandlers();
	    this.prevTime = 0;
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	  animate(time) {
	    if (this.game.playerLost()) {
	      this.loseFn();
	    } else {
	      const delta = time - this.prevTime;
	
	      this.game.step(delta);
	      this.game.draw(this.ctx);
	      this.prevTime = time;
	      this.renderScores();
	
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }
	}
	
	GameView.DIRS = ['up', 'down', 'left', 'right'];
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map