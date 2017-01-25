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
    document.getElementById('lost').innerHTML = 'You lose!';
  }

  start() {
    this.bindKeyHandlers();
    this.prevTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const delta = time - this.prevTime;

    this.game.step(delta);
    this.game.draw(this.ctx);
    this.prevTime = time;
    this.renderScore();

    if (this.game.playerLost()) {
      this.loseFn();
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.DIRS = ['up', 'down', 'left', 'right'];

module.exports = GameView;
