const Util = require('./util');
const MovingObject = require('./moving_object');

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
}

module.exports = Mine;
