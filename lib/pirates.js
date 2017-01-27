const Game = require('./game');
const GameView = require('./gameview');

const newGame = () => {
  const canvasEl = document.getElementsByTagName('canvas')[0];
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext('2d');
  let img = document.getElementById('bg');
  img.onload = () => {
    ctx.drawImage(img, 0, 0, Game.DIM_X, Game.DIM_Y);
  };

  const game = new Game();
  new GameView(game, ctx).begin();
};

document.addEventListener('DOMContentLoaded', newGame);
