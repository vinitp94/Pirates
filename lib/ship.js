const Util = require('./util');
const MovingObject = require('./moving_object');

class Ship extends MovingObject {
  constructor(options = {}) {
    options.color = '#000000';
    options.pos = [0, 0];
    options.radius = 20;
    options.vel = [0, 0];
    super(options);
  }
}

module.exports = Ship;
