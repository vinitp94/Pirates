const Game = require('./game');
const GameView = require('./gameview');

const newGame = () => {
  const canvasEl = document.getElementsByTagName('canvas')[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext('2d');
  const game = new Game();
  new GameView(game, ctx).start();
};

document.addEventListener('DOMContentLoaded', newGame);

document.getElementById('reset').addEventListener('click', newGame);
