# Pirates

Pirates is a simple single player game in which the purpose, as the pirate, is to plunder as much treasure as possible without being hit by floating mines. The controls are simple, involving only the four arrow keys; forward and back move the ship in the respective directions, and left and right rotate the ship in its static position. Every time a treasure is claimed, a new mine is added to the playing field. In addition, the mines are intelligent and move towards the pirate ship.

This game was one of my favorites on Neopets.com when I was younger, so I decided to clone it! Play it [here](https://vinitp94.github.io/Pirates/)!

## Functionality & MVP

In this game of Pirates, users are able to:

- Start a new game and play again after losing
- Keep track of their total score and high score for the session
- Toggle between having sound effects on or off
- Play by moving the ship using four arrow keys

![landing](./assets/screenshots/landing.png)

## Implementation

#### File Structure

- assets: Includes all imported images and audio files as well as stylesheet
- docs: Includes implementation timeline and original wireframe/proposal
- vendor: Includes keymaster file to allow keyboard use
- lib: Includes all core functionality of game

#### Util

The util file contains most of the calculations needed throughout the game. This includes functions to calculate distance, direction, velocity, angles, and more.

#### Moving Object

The moving object class is the parent class of the Ship, Coin, and Mine classes. They all share the same draw functionality and have the same attributes, including position, speed, the game they are a part of, and more. Individually, the Ship and Mine classes contain their own logic to move the way they do.

#### Game

The Game class contains most of the actual game logic. It tracks all of the Mine, Coin, and Ship objects in the game, handles collisions, plays sounds, and moves and draws all the objects as well. The actual function that is called repeatedly is Game#step, which is shown below:


  ```javascript
  step(delta) {
    this.moveObjects(delta);
    this.findCoin();
    this.explodeMines();
    this.ship.drag();
  }
  ```

#### GameView

The GameView class contains the code to render and animate the game on the canvas. This class stores a Game object, the Canvas element, the Ship object, and tracks the high score for the session. Keybinding is handled in this file, allowing users to play using the four arrow keys. Window.requestAnimationFrame is utilized to animate the canvas and re-render it quickly enough to allow for smooth gameplay. Upon the player losing, this class called the Game#reset method to set it's attributes to default and allow the user to play again.

  ```javascript
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
  ```

## Architecture and Technologies

Pirates is made simply with pure vanilla JavaScript along with HTML5 Canvas. No libraries are included anywhere in the game. Using vanilla DOM manipulation, HTML, and CSS, I implemented full gameplay with clean animations.

## Future Improvements

Some possible improvements to the game include:

#### Add Difficulty Options

- Option 1: Users choose difficulty between easy, medium, hard
- Option 2: Increase speed of mines as score increases
- Option 3: Add whirlpools every so often to add another possible way of losing

#### Multiple Treasures

- Spawn coins randomly that are worth different amounts
- Keep special coins available for limited time

#### Obstacles

- Include obstacles along with difficulty levels
- Add a maze like setup like Pacman
