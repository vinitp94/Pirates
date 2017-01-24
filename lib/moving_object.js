const Util = require('./util');

const FRAME_DELTA = 1000/60;

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  isCollidedWith(otherObject) {
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

  move(delta) {
    const velScale = delta / FRAME_DELTA;
    let offsetX = this.vel[0] * velScale;
    let offsetY = this.vel[1] * velScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  }

  remove() {
    this.game.remove(this);
  }
}

module.exports = MovingObject;
