class Card {
    #col;
    #row;
    #color;
    #open;
    #found;
    #element;

    constructor(row, col, color, open = false, found = false) {
        this.#row = row;
        this.#col = col;
        this.#color = color;
        this.#open = open;
        this.#found = found;
    }

    get row() {
        return this.#row;
    }

    get col() {
        return this.#col;
    }

    get open() {
        return this.#open;
    }

    get color() {
        return this.#color;
    }

    get found() {
        return this.#found;
    }

    set element(element) {
        this.#element = element;
    }

    set found(newValue) {
        this.#found = newValue;
    }

    addEventClick() {
        if (this.#element) {
            this.#element.addEventListener("click", (e) => {
                if (this.#found === false) {
                    this.#element.style.backgroundColor = this.#color;
                    this.#open = true; 
                }
            });
        }
    }

    resetColor() {
        this.#element.style.backgroundColor = "rgb(36, 36, 36)";
        this.#open = false;
    }
}

export default Card;