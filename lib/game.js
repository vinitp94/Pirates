const Ship = require('./ship');
const Coin = require('./coin');
const Util = require('./util');

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
    // this.ships.forEach((ship) => {
    //   ship.drag();
    // });
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
