import '../sass/main.scss'

import Game from "./class/game"
import Card from "./class/card"

let rowsUser = parseInt(prompt("Enter the number of rows: "));
let colsUser = parseInt(prompt("Enter the number of columns: "))

let game = new Game(rowsUser, colsUser, "game");
let card = new Card();