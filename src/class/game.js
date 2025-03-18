import { shuffleArray } from '../utils/utils';
import Card from './card';

class Game {
    #rows;
    #cols;
    #idElement;
    #cards
    constructor(rows, cols, idElement = "game") {
        this.#rows = rows;
        this.#cols = cols;
        this.#idElement = idElement;
        this.#cards = [];
        this.generateCards();
        this.paintCards();
    }

    generateColors() {
        // Create colors array
        let colorsArray = [];
        for (let i = 0; i < (this.#cols * this.#rows) / 2; i++) {
            let red = Math.floor(Math.random() * 256);
            let green = Math.floor(Math.random() * 256);
            let blue = Math.floor(Math.random() * 256);
            let color = `rgb(${red}, ${green}, ${blue})`;
            colorsArray.push(color, color);
        }
        shuffleArray(colorsArray);
        return colorsArray;
    }

    generateCards() {
        let randomColors = this.generateColors();
        // Create cards and assign colors
        for (let row = 0; row < this.#rows; row++) {
            for (let col = 0; col < this.#cols; col++) {
                let color = randomColors.shift();
                let newCard = new Card(row, col, color);
                this.#cards.push(newCard);
            }
        }
    }

    paintCards() {
        let memoryGrid = document.getElementById(this.#idElement);
        this.#cards.map((card) => {
            let newCard = document.createElement("div");
            newCard.classList.add("matchingCards");
            newCard.dataset.row = card.row;
            newCard.dataset.col = card.col;
            memoryGrid.appendChild(newCard);
        }) 
    }
}

export default Game;