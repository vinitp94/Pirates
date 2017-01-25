const Util = require('./util');
const Game = require('./game');

const FRAME_DELTA = 1000/60;

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.dir = options.dir;
    this.color = options.color;
    this.speed = options.speed;
    this.radius = options.radius;
    this.game = options.game;
    this.img = options.img;
    this.vel = Util.calcVel(this.dir, this.speed);
  }

  // draw(ctx) {
  //   ctx.fillStyle = this.color;
  //
  //   ctx.beginPath();
  //   ctx.arc(
  //     this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
  //   );
  //   ctx.fill();
  // }

  // isCollidedWith(otherObject) {
  //   const centerDist = Util.dist(this.pos, otherObject.pos);
  //   return centerDist < (this.radius + otherObject.radius);
  // }

  move(delta) {
    const velScale = delta / FRAME_DELTA;
    let offsetX = this.vel[0] * velScale;
    let offsetY = this.vel[1] * velScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];

    if (this.pos[0] < this.radius) {
      this.pos[0] = this.radius;
      this.speed = 0;
      this.vel = Util.calcVel(this.dir, this.speed);
    } else if (this.pos[0] > (this.game.max_width - this.radius)) {
      this.pos[0] = this.game.max_width - this.radius;
      this.speed = 0;
      this.vel = Util.calcVel(this.dir, this.speed);
    } else if (this.pos[1] < this.radius) {
      this.pos[1] = this.radius;
      this.speed = 0;
      this.vel = Util.calcVel(this.dir, this.speed);
    } else if (this.pos[1] > (this.game.max_height - this.radius)) {
      this.pos[1] = this.game.max_height - this.radius;
      this.speed = 0;
      this.vel = Util.calcVel(this.dir, this.speed);
    }
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  // remove() {
  //   this.game.remove(this);
  // }
}

module.exports = MovingObject;
