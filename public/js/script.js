import { GameType } from "./types.js";
import { platforms, ratings } from "./types.js";
import { addToInventory, displayInventory } from "./games.js";
// generation of children based on an array
const generateChildren = (parent, children) => {
    for (let child of children) {
        const element = document.createElement("option");
        element.value = child.toString();
        element.textContent = child.toString();
        parent.appendChild(element);
    }
};
// Game type select element modification according to the current type
const gameInputsSelect = document.getElementById("game-input");
const gameInputsLabel = document.getElementById("game-input-label");
const changeForm = (value) => {
    gameInputsSelect.innerHTML = "";
    let children;
    if (value === GameType.BOARD) {
        gameInputsLabel.textContent = "Number of Players";
        children = ratings;
    }
    else {
        gameInputsLabel.textContent = "Platform";
        children = platforms;
    }
    generateChildren(gameInputsSelect, children);
};
const typeSelect = document.getElementById("type");
changeForm(typeSelect.value);
typeSelect.addEventListener("change", (e) => {
    const { value } = e.target;
    changeForm(value);
});
let counter = 0;
// form logic
const addGameForm = document.getElementById("add-game");
const titleEl = document.getElementById("title");
const releaseEl = document.getElementById("release");
const ratingEl = document.getElementById("rating");
addGameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("get all fields 🎮");
    const { value: title } = titleEl;
    const { value: release } = releaseEl;
    const { value: rating } = ratingEl;
    const { value: type } = typeSelect;
    const { value: gameInput } = gameInputsSelect;
    const product = {
        id: counter++,
        title: title,
        releaseYear: new Date(release),
        rating: +rating,
        numberOfPlayers: type === GameType.BOARD ? +gameInput : undefined,
        platform: type === GameType.DIGITAL ? gameInput : undefined,
        type: type === GameType.BOARD ? GameType.BOARD : GameType.DIGITAL
    };
    addToInventory(product);
});
const showAll = document.getElementById("show-all-btn");
showAll.addEventListener("click", (e) => {
    displayInventory();
});
const showDigital = document.getElementById("show-digital-btn");
showDigital.addEventListener("click", (e) => {
    displayInventory(GameType.DIGITAL);
});
const showBoard = document.getElementById("show-board-btn");
showBoard.addEventListener("click", (e) => {
    displayInventory(GameType.BOARD);
});
