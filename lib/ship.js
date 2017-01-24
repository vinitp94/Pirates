const Util = require('./util');
const MovingObject = require('./moving_object');

class Ship extends MovingObject {
  constructor(options = {}) {
    options.color = '#000000';
    options.pos = [500, 500];
    options.radius = 10;
    options.dir = [0, 1];
    options.speed = 0;
    super(options);
  }

  propel(impulse) {
    if (impulse === 'up' && this.speed > -9) {
      this.speed -= 1;
      this.vel = Util.calcVel(this.dir, this.speed);
    } else if (impulse === 'down' && this.speed < 9) {
      this.speed += 1;
      this.vel = Util.calcVel(this.dir, this.speed);
    } else if (impulse === 'left') {
      this.dir = Util.rotate(this.dir, -0.2);
      this.vel = Util.calcVel(this.dir, this.speed);
    } else if (impulse === 'right') {
      this.dir = Util.rotate(this.dir, 0.2);
      this.vel = Util.calcVel(this.dir, this.speed);
    }
  }

  draw(ctx) {
    var img = document.getElementById('myship');
    ctx.drawImage(img, this.pos[0], this.pos[1], 30, 30);
  }

  drag() {
    if (this.speed > 0) {
      this.speed -= 0.1;
    } else if (this.speed < 0) {
      this.speed += 0.1;
    }
    this.vel = Util.calcVel(this.dir, this.speed);
  }
}

module.exports = Ship;
