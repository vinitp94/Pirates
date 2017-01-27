const Ship = require('./ship');
const Coin = require('./coin');
const Mine = require('./mine');
const Util = require('./util');

const muteBtn = document.getElementById('sound').children[0];

muteBtn.addEventListener('click', () => {
  if (muteBtn.id === 'sound-on') {
    muteBtn.id = 'sound-off';
    muteBtn.src = './assets/images/sound_off.png';

  } else {
    muteBtn.id = 'sound-on';
    muteBtn.src = './assets/sound_on.png';
  }
});

const coinSnd = new Audio('./assets/audio/coin_sound.wav');
const expSnd = new Audio('./assets/audio/explosion_sound.wav');

class Game {
  constructor() {
    this.mines = [];
    this.coin = new Coin({ game: this });
    this.ship = null;
    this.maxWidth = Game.DIM_X;
    this.maxHeight = Game.DIM_Y;
    this.score = 0;

    this.coinSound = coinSnd;
    this.explosionSound = expSnd;
  }

  addShip() {
    const ship = new Ship({
      game: this
    });

    this.ship = ship;
    return ship;
  }

  addMine() {
    const mine = new Mine({
      game: this
    });

    this.mines.push(mine);
    return mine;
  }

  randomPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }

  allObjects() {
    return [].concat([this.ship], [this.coin], this.mines);
  }

  moveObjects(delta) {
    this.allObjects().forEach((obj) => {
      obj.move(delta);
    });
    this.mines.forEach((mine) => {
      mine.stalk(this.ship.pos);
    });
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    let img = document.getElementById('bg');
    ctx.drawImage(img, 0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((obj) => {
      obj.draw(ctx);
    });
  }

  soundOn() {
    return (document.getElementById('sound').children[0].id === 'sound-on');
  }

  explodeMines() {
    for (let i = 0; i < this.mines.length; i++) {
      for (let j = i + 1; j < this.mines.length; j++) {
        if (this.mines[i].isCollidedWith(this.mines[j])) {
          if (this.soundOn()) {
            this.explosionSound.play();
          }
          this.remove(this.mines[i]);
          this.remove(this.mines[j]);
        }
      }
    }
  }

  findCoin() {
    if (this.coin.isCollidedWith(this.ship)) {
      this.remove(this.coin);
      this.score += 100;
      if (this.soundOn()) {
        this.coinSound.play();
      }
      this.addMine();
    }
  }

  playerLost() {
    let result = false;
    this.mines.forEach((mine) => {
      if (mine.isCollidedWith(this.ship)) {
        if (this.soundOn()) {
          this.explosionSound.play();
        }
        this.remove(mine);
        result = true;
      }
    });
    return result;
  }

  reset() {
    this.addShip();
    this.mines = [];
    this.coin = new Coin({ game: this });
    this.score = 0;
  }

  remove(obj) {
    if (obj instanceof Coin) {
      this.coin = new Coin({ game: this });
    } if (obj instanceof Mine) {
      this.mines.splice(this.mines.indexOf(obj), 1);
    }
  }

  step(delta) {
    this.moveObjects(delta);
    this.findCoin();
    this.explodeMines();
    this.ship.drag();
  }
}

Game.DIM_X = 1000;
Game.DIM_Y = 600;

module.exports = Game;
