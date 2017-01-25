const Util = require('./util');
const MovingObject = require('./moving_object');

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
      this.speed -= 1.5;
    } else if (impulse === 'down' && this.speed < 10) {
      this.speed += 1.5;
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

  // drag() {
  //   this.speed *= 0.99;
  //   this.vel = Util.calcVel(this.dir, this.speed);
  // }
}

module.exports = Ship;
