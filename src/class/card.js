class Card {
    #col;
    #row;
    #color;
    #open;
    #found;
    constructor(row, col, color) {
        this.#row = row;
        this.#col = col;
        this.#color = color;
        this.#open = false;
        this.#found = false;
    }

    get row() {
        return this.#row;
    }

    get col() {
        return this.#col;
    }
}

export default Card;