const Util = require('./util');
const MovingObject = require('./moving_object');

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
