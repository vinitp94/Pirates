const Util = require('./util');
const MovingObject = require('./moving_object');

class Ship extends MovingObject {
  constructor(options = {}) {
    options.color = '#000000';
    options.pos = [500, 500];
    options.radius = 15;
    options.dir = [0, 1];
    options.speed = 0;
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
      console.log(this.dir);
      this.rotate(ctx, -0.2, this.img);
    } else if (impulse === 'right') {
      this.dir = Util.rotate(this.dir, 0.2);
      this.rotate(ctx, 0.2, this.img);
    }
    this.vel = Util.calcVel(this.dir, this.speed);
  }

  rotate(ctx, rad) {
    // ctx.clearRect(0,0,1000,600);
    // ctx.save();
    // ctx.translate(1000/2,600/2);
    // ctx.rotate(rad);
    // this.draw(ctx);
    // ctx.restore();
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.pos[0], this.pos[1], 30, 30);
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
