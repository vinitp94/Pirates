const Util = require('./util');
const MovingObject = require('./moving_object');

class Ship extends MovingObject {
  constructor(options = {}) {
    options.color = '#000000';
    options.pos = [500, 500];
    options.radius = 10;
    options.vel = [0, 0];
    super(options);
  }

  propel(rowdir) {
    let nextvelX = this.vel[0] + rowdir[0];
    let nextvelY = this.vel[1] + rowdir[1];
    if (Util.speed([nextvelX, nextvelY]) < 5 ) {
      this.vel[0] = nextvelX;
      this.vel[1] = nextvelY;
    }
  }
}

module.exports = Ship;
