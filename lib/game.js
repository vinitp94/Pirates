const Ship = require('./ship');
const Coin = require('./coin');
const Mine = require('./mine');
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

  explodeMines() {
    for (let i = 0; i < this.mines.length; i++) {
      for (let j = i + 1; j < this.mines.length; j++) {
        if (this.mines[i].isCollidedWith(this.mines[j])) {
          this.remove(this.mines[i]);
          this.remove(this.mines[j]);
        }
      }
    }
  }

  findCoin() {
    if (this.coin.isCollidedWith(this.ship)) {
      this.remove(this.coin);
      this.score += 1;
      this.addMine();
    }
  }

  playerLost() {
    let result = false;
    this.mines.forEach((mine) => {
      if (mine.isCollidedWith(this.ship)) {
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
  }
}

Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.BG_COLOR = '#f5f5f5';

module.exports = Game;
