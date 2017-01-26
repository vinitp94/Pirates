const Game = require('./game');

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
    this.highscore = 0;
  }

  bindKeyHandlers() {
    const ship = this.ship;

    GameView.DIRS.forEach((k) => {
      key(k, () => {
        ship.propel(k, this.ctx);
      });
    });
  }

  bindEnter() {
    key('enter', () => {
      this.start();
    });
  }

  unbindEnter() {
    key.unbind('enter');
  }

  renderScores() {
    document.getElementById('score').innerHTML = this.game.score;

    if (this.game.score >= this.highscore) {
      this.highscore = this.game.score;
    }
    document.getElementById('high-score').innerHTML = this.highscore;
  }

  loseFn() {
    let losshtml = '<h2>Aarrrghhh! You wrecked me ship!</h2>';
    losshtml += '<h3>Press ENTER to play again!</h3>';

    document.getElementById('lose-modal').innerHTML = losshtml;
    this.game.reset();
    this.ship = this.game.ship;
    this.bindEnter();
  }

  begin() {
    let introhtml = '<h2>Aye matey! Welcome to the sea of doom.</h2>';
    introhtml += '<p>Instructions: Use </p>';
    introhtml += "<img src='./assets/arrow_keys.png'/>";
    introhtml += '<p> to collect as much treasure as possible.</p>';
    introhtml += '<p>Oh, and beware of the mines!</p>';
    introhtml += '<h3>Press ENTER to begin!</h3>';
    document.getElementById('start-modal').innerHTML = introhtml;
    this.game.draw(this.ctx);
    this.bindEnter();
  }

  start() {
    this.unbindEnter();
    document.getElementById('start-modal').innerHTML = '';
    document.getElementById('lose-modal').innerHTML = '';
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
      this.renderScores();

      requestAnimationFrame(this.animate.bind(this));
    }
  }
}

GameView.DIRS = ['up', 'down', 'left', 'right'];

module.exports = GameView;
