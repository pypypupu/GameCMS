import { GameType } from "./types.js";
import { deleteGame } from "./games.js";
export const generateGameCard = (game) => {
    const container = document.createElement("section");
    container.classList.add("game-card");
    const title = generateInfo("Title", game.title);
    const rating = generateInfo("Rating", game.rating.toString());
    const releaseDate = generateInfo("Release Date", game.releaseYear.toDateString());
    container.append(title, rating, releaseDate);
    switch (game.type) {
        case GameType.BOARD:
            const playerNum = generateInfo("Number of Players", game.numberOfPlayers.toString());
            container.append(playerNum);
            break;
        case GameType.DIGITAL:
            const platform = generateInfo("Platform", game.platform);
            container.append(platform);
            break;
    }
    const deleteBtn = document.createElement("button");
    deleteBtn.addEventListener("click", (e) => {
        deleteGame(game.id);
        e.stopPropagation();
    });
    deleteBtn.textContent = "Delete";
    container.append(deleteBtn);
    container.addEventListener("click", (e) => {
        console.log(game);
    });
    return container;
};
const generateInfo = (title, value) => {
    const container = document.createElement("div");
    const titleContainer = document.createElement("span");
    titleContainer.textContent = title;
    const valueContainer = document.createElement("span");
    valueContainer.textContent = value;
    container.append(title, valueContainer);
    return container;
};
