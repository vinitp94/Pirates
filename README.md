# Pirates

### Background

Pirates is a simple single player game in which the purpose, as the pirate, is to plunder as much treasure as possible without being hit by floating mines. The controls are simple, involving only the four arrow keys; forward and back move the ship in the respective directions, and left and right rotate the ship in its static position. Every time a treasure is claimed, a new mine is added to the playing field. In addition, the mines are intelligent and move towards the pirate ship.

This game was one of my favorites on Neopets.com when I was younger, so I decided to clone it!. It can be played [here](https://vinitp94.github.io/Pirates/).

### Functionality & MVP

In this game of Pirates, users are able to:

- Start a new game and play again after losing
- Keep track of their total score and high score for the session
- Toggle between having sound effects on or off
- Play by moving the ship using four arrow keys

![landing](./assets/screenshots/landing.png)

### Implementation

TODO

### Architecture and Technologies

Pirates is made simply with pure vanilla JavaScript along with HTML5 Canvas. No libraries are included anywhere in the game. Using vanilla DOM manipulation, HTML, and CSS, I implemented full gameplay with clean animations.

### Future Improvements

Some possible improvements to the game include:

##### Add Difficulty Options

- Option 1: Users choose difficulty between easy, medium, hard
- Option 2: Increase speed of mines as score increases
- Option 3: Add whirlpools every so often to add another possible way of losing

##### Multiple Treasures

- Spawn coins randomly that are worth different amounts
- Keep special coins available for limited time

##### Obstacles

- Include obstacles along with difficulty levels
- Add a maze like setup like Pacman
