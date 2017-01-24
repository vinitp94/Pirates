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
    this.vel[0] += rowdir[0];
    this.vel[1] += rowdir[1];
  }
}

module.exports = Ship;
