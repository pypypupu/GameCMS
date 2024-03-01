import { Game, GameType } from "./types.js";
import { deleteGame } from "./games.js";
export const generateGameCard = (game: Game): HTMLElement => {
    const container = document.createElement("section") as HTMLElement;
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

    const deleteBtn = document.createElement("button") as HTMLButtonElement;
    deleteBtn.addEventListener("click", (e: Event) => {
        deleteGame(game.id);
        e.stopPropagation();
    })
    deleteBtn.textContent = "Delete";
    container.append(deleteBtn);
    container.addEventListener("click", (e: Event) => {
        console.log(game);
    });
    return container;
}

const generateInfo = (title: string, value: string): HTMLElement => {
    const container = document.createElement("div");
    const titleContainer = document.createElement("span");
    titleContainer.textContent = title;
    const valueContainer = document.createElement("span");
    valueContainer.textContent = value;
    container.append(title, valueContainer);
    return container;
}
