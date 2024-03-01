import { generateGameCard } from "./card.js";
const gameContainer = document.getElementById("game-container");
const inventory = [];
export const addToInventory = (game) => {
    inventory.push(game);
    displayInventory();
};
export const displayInventory = (type) => {
    gameContainer.innerHTML = "";
    inventory.forEach((game) => {
        if (type)
            if (type !== game.type)
                return;
        const gameCard = generateGameCard(game);
        gameContainer.prepend(gameCard);
    });
};
export const deleteGame = (id) => {
    const index = inventory.findIndex((game) => game.id === id);
    inventory.splice(index, 1);
    displayInventory();
};
