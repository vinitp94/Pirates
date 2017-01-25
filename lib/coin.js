const MovingObject = require('./moving_object');

class Coin extends MovingObject {
  constructor(options = {}) {
    options.color = '#ffd700';
    options.pos = options.game.randomPosition();
    options.radius = 10;
    options.dir = [1, 0];
    options.speed = 0;
    options.width = 20;
    options.height = 20;
    options.img = document.getElementById('mycoin');
    super(options);
  }
}

module.exports = Coin;
