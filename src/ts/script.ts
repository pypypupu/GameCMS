import { Game, GameType } from "./types.js";
import { platforms, ratings } from "./types.js";
import { addToInventory, displayInventory } from "./games.js";
// generation of children based on an array

const generateChildren = (parent: HTMLElement, children: readonly number[] | readonly string[]) => {
    for (let child of children) {
        const element = document.createElement("option");
        element.value = child.toString();
        element.textContent = child.toString();
        parent.appendChild(element);
    }
}

// Game type select element modification according to the current type
const gameInputsSelect = document.getElementById("game-input") as HTMLSelectElement;
const gameInputsLabel = document.getElementById("game-input-label") as HTMLElement;

const changeForm = (value: string): void => {
    gameInputsSelect.innerHTML = ""
    let children: readonly any[];
    if (value === GameType.BOARD) {
        gameInputsLabel.textContent = "Number of Players"
        children = ratings
    }
    else {
        gameInputsLabel.textContent = "Platform"
        children = platforms;
    }
    generateChildren(gameInputsSelect, children);
}

const typeSelect = document.getElementById("type") as HTMLSelectElement;
changeForm(typeSelect.value);

typeSelect.addEventListener("change", (e) => {
    const { value } = e.target as HTMLSelectElement
    changeForm(value);
});

let counter = 0;

// form logic
const addGameForm = document.getElementById("add-game") as HTMLFormElement;

const titleEl = document.getElementById("title") as HTMLInputElement;
const releaseEl = document.getElementById("release") as HTMLInputElement;
const ratingEl = document.getElementById("rating") as HTMLInputElement;

addGameForm.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    console.log("get all fields 🎮")
    const { value: title } = titleEl;
    const { value: release } = releaseEl;
    const { value: rating } = ratingEl;
    const { value: type } = typeSelect;
    const { value: gameInput } = gameInputsSelect;

    const product: Game = {
        id: counter++,
        title: title,
        releaseYear: new Date(release),
        rating: +rating as Game["rating"],
        numberOfPlayers: type === GameType.BOARD ? +gameInput as Game["rating"] : undefined,
        platform: type === GameType.DIGITAL ? gameInput as typeof platforms[number] : undefined,
        type: type === GameType.BOARD ? GameType.BOARD : GameType.DIGITAL
    }

    addToInventory(product);
})

const showAll = document.getElementById("show-all-btn") as HTMLButtonElement;
showAll.addEventListener("click", (e: Event) => {
    displayInventory();
})
const showDigital = document.getElementById("show-digital-btn") as HTMLButtonElement;
showDigital.addEventListener("click", (e: Event) => {
    displayInventory(GameType.DIGITAL);
})
const showBoard = document.getElementById("show-board-btn") as HTMLButtonElement
showBoard.addEventListener("click", (e: Event) => {
    displayInventory(GameType.BOARD);
})