const Game = require('./game');

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
  }

  bindKeyHandlers() {
    const ship = this.ship;

    GameView.DIRS.forEach((k) => {
      key(k, () => {
        ship.propel(k, this.ctx);
      });
    });
  }

  renderScore() {
    document.getElementById('score').innerHTML = this.game.score;
  }

  loseFn() {
    let losshtml = '<p>You lose!</p>';
    losshtml += '<button id="play-again">Play Again</button>';

    document.getElementById('lost').innerHTML = losshtml;
    document.getElementById('play-again').addEventListener('click', () => {
      this.game.reset();
      this.ship = this.game.ship;
      document.getElementById('lost').innerHTML = '';
      this.start();
    });
  }

  start() {
    this.bindKeyHandlers();
    this.prevTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    if (this.game.playerLost()) {
      this.loseFn();
    } else {
      const delta = time - this.prevTime;

      this.game.step(delta);
      this.game.draw(this.ctx);
      this.prevTime = time;
      this.renderScore();

      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

GameView.DIRS = ['up', 'down', 'left', 'right'];

module.exports = GameView;
