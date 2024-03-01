import { Inventory, Game, GameType } from "./types.js"
import { generateGameCard } from "./card.js";
const gameContainer = document.getElementById("game-container") as HTMLDivElement;
const inventory: Inventory = [];

export const addToInventory = (game: Game): void => {
    inventory.push(game);
    displayInventory();
}

export const displayInventory = (type?: GameType): void => {
    gameContainer.innerHTML = "";

    inventory.forEach((game: Game) => {
        if (type)
            if (type !== game.type)
                return;
        const gameCard = generateGameCard(game);
        gameContainer.prepend(gameCard);
    })
}

export const deleteGame = (id: number): void => {
    const index = inventory.findIndex((game: Game) => game.id === id);
    inventory.splice(index, 1);
    displayInventory();
}