class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.ship = this.game.addShip();
  }

  // bindKeyHandlers() {
  //   const ship = this.ship;
  //
  //   Object.keys(GameView.MOVES).forEach((k) => {
  //     let move = GameView.MOVES[k];
  //     key(k, () => {
  //       ship.power(move);
  //     });
  //   });
  // }

  start() {
    // this.bindKeyHandlers();
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

// GameView.MOVES = {
//   ''
// }

module.exports = GameView;
