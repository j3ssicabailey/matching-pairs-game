import '../sass/main.scss'
import Game from "./class/game";


document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("styles-loaded");

    let playAgainBtn = document.getElementById('playAgainBtn');
    if (playAgainBtn) {
        playAgainBtn.addEventListener("click", () => {
            Game.resetGame();
        });
    }

    let data = Game.establishGridSize(); 
    let game = new Game(data.rows, data.cols, "memoryGrid"); 
});