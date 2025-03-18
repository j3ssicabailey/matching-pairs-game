import '../sass/main.scss'

import Game from "./class/game"
import Card from "./class/card"

let playAgainBtn = document.getElementById('playAgainBtn');
playAgainBtn.addEventListener("click", () => {
    Game.resetGame();
})

let data = Game.establishGridSize();

let game = new Game(data.rows, data.cols, "memoryGrid");

