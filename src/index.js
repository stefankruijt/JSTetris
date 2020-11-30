import Game from './game';

console.log("Start Tetris game");

var tetrisGame = document.createElement('canvas');
tetrisGame.id = 'tetris-game';
tetrisGame.height = 500;
tetrisGame.width = 250;
tetrisGame.style = "background-color:#147479";

document.body.appendChild(tetrisGame); // adds the canvas to the body element
new Game(tetrisGame);