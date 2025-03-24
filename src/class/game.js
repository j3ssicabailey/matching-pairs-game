import { shuffleArray } from '../utils/utils';
import Card from './card';

class Game {
    #rows;
    #cols;
    #idElement;
    #cards
    element;
    constructor(rows, cols, idElement = "memoryGrid") {
        this.#rows = rows;
        this.#cols = cols;
        this.#idElement = idElement;
        this.#cards = [];
        this.element = document.getElementById(idElement);
        this.generateCards();
        this.paintCards();
        this.element.addEventListener("click", () => {
            this.checkOpenCards();
        })
    }

    get rows() {
        return this.#rows;
    }

    get cols() {
        return this.#cols;
    }

    checkOpenCards() {
        let openCards = this.#cards.filter((card) => card.open && !card.found);
        if (openCards.length === 2) {
            if (openCards[0].color === openCards[1].color) {
                openCards.forEach((card) => {
                    card.found = true;
                });
                this.cardsToLocalStorage();  // Save progress when a pair is found
            } else {
                setTimeout(() => {
                    openCards.forEach((card) => {
                        card.resetColor();
                    });
                    this.cardsToLocalStorage();  // Save progress even when resetting
                }, 750);
            }
        }
        if (this.#cards.every(card => card.found)) {
            alert("All matching pairs were found!");
        }
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
        this.#cards = [];
        // Look in localStorage to create the same
        if (localStorage.getItem("cards") !== null) {
            let cardsFromLocalStorage = JSON.parse(localStorage.getItem("cards"));
            cardsFromLocalStorage.map(card => {
                let newCard = new Card(card.row, card.col, card.color, card.open, card.found);
                this.#cards.push(newCard);
            })
        } else {
            let randomColors = this.generateColors();
            // Create cards and assign colors
            for (let row = 0; row < this.#rows; row++) {
                for (let col = 0; col < this.#cols; col++) {
                    let color = randomColors.shift();
                    let newCard = new Card(row, col, color);
                    this.#cards.push(newCard);
                }
            }
            this.cardsToLocalStorage();
        }
    }

    cardsToLocalStorage() {
        let arrayUserToLocalStorage = this.#cards.map(card => {
            return {
                "row": card.row,
                "col": card.col,
                "color": card.color,
                "open": card.open,
                "found": card.found
            }
        });
        localStorage.setItem("cards", JSON.stringify(arrayUserToLocalStorage));
    }


    paintCards() {
        this.setGridTemplate();
        this.#cards.forEach((card) => {
            let newCard = document.createElement("div");
            newCard.classList.add("matchingCards");
            newCard.dataset.row = card.row;
            newCard.dataset.col = card.col;
            
            // If the card is found (or open), apply its color immediately
            if (card.found || card.open) {
                newCard.style.backgroundColor = card.color;
            }
    
            card.element = newCard;
            card.addEventClick();
            this.element.appendChild(newCard);
        });
    }
    

    setGridTemplate() {
        this.element.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        this.element.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
    }

    
    static establishGridSize() {
        let rowsUser, colsUser;
        // check localStorage
        if(localStorage.getItem("rows") != null && localStorage.getItem("cols") !== null) {
            rowsUser = parseInt(localStorage.getItem("rows"));
            colsUser = parseInt(localStorage.getItem("cols"));
        } else {
            rowsUser = parseInt(prompt("Enter the number of rows: "));
            colsUser = parseInt(prompt("Enter the number of columns: "))
        
            while (rowsUser * colsUser % 2 !== 0) {
                alert("To play the game, you need an even number of cards. Please re-enter rows/columns");
                rowsUser = parseInt(prompt("Enter the number of rows: "));
                colsUser = parseInt(prompt("Enter the number of columns: "))
            }
            // localStorage to save player progress
            localStorage.setItem("rows", rowsUser);
            localStorage.setItem("cols", colsUser);
        }
        return { rows: rowsUser, cols: colsUser }; 
    }
    static resetGame() {
        localStorage.removeItem("rows");
        localStorage.removeItem("cols");
        localStorage.removeItem("cards");
        location.reload();  
    }
}

export default Game;