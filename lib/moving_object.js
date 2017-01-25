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
    this.width = options.width;
    this.height = options.height;
    this.vel = Util.calcVel(this.dir, this.speed);
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.pos[0] - this.width / 2, this.pos[1] - this.height / 2, this.width, this.height);
  }

  move(delta) {
    const velScale = delta / FRAME_DELTA;
    let offsetX = this.vel[0] * velScale;
    let offsetY = this.vel[1] * velScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.pos[0] < this.width / 2) {
      this.pos[0] = this.width / 2;
      this.speed = 0;
    } else if (this.pos[0] > (this.game.max_width - this.width / 2)) {
      this.pos[0] = this.game.max_width - this.width / 2;
      this.speed = 0;
    } else if (this.pos[1] < this.height / 2) {
      this.pos[1] = this.height / 2;
      this.speed = 0;
    } else if (this.pos[1] > (this.game.max_height - this.height / 2)) {
      this.pos[1] = this.game.max_height - this.height / 2;
      this.speed = 0;
    }

    this.vel = Util.calcVel(this.dir, this.speed);
  }

  isCollidedWith(otherObject) {
    let selfCenter = [this.pos[0] - (this.width / 2),
      this.pos[1] - (this.height / 2)];
    let otherCenter = [otherObject.pos[0] - (otherObject.width / 2),
      otherObject.pos[1] - (otherObject.height / 2)];
    let centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.width / 2 + otherObject.width / 2);
  }
}

module.exports = MovingObject;
