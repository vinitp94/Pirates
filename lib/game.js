const Ship = require('./ship');
const Util = require('./util');

class Game {
  constructor() {
    this.mines = [];
    this.coins = [];
    this.ships = [];
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

Game.BG_COLOR = '#f5f5f5';
Game.DIM_X = 1000;
Game.DIM_Y = 600;

module.exports = Game;
