class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
  }

  bindKeyHandlers() {
    const ship = this.ship;

    Object.keys(GameView.DIRS).forEach((k) => {
      let rowdir = GameView.DIRS[k];
      key(k, () => {
        ship.propel(rowdir);
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

    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.DIRS = {
  'up': [0, -1],
  'down': [0, 1],
  'left': [-1, 0],
  'right': [1, 0]
};

module.exports = GameView;
