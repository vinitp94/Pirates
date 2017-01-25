class GameView {
  constructor(game, ctx, score) {
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
    document.getElementById('score').innerHTML = this.game.score;

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.DIRS = ['up', 'down', 'left', 'right'];

module.exports = GameView;
