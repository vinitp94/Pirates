const MovingObject = require('./moving_object');

class Coin extends MovingObject {
  constructor(options = {}) {
    options.color = '#ffd700';
    options.pos = options.game.randomPosition();
    options.radius = 10;
    options.dir = [1, 0];
    options.speed = 0;
    super(options);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
}

module.exports = Coin;
