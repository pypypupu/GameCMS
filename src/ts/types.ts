export const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

type Rating = typeof ratings[number];

export enum GameType {
    DIGITAL = "digital",
    BOARD = "board"
}

export const platforms = ["PlayStation", "Windows", "Linux", "MacOS", "XBOX", "Nintendo Switch"] as const;

type Platform = typeof platforms[number];

export type VideoGame = {
    id: number;
    title: string;
    releaseYear: Date;
    rating: Rating;
    type: GameType.DIGITAL;
    platform: Platform;
}

export type BoardGame = Omit<VideoGame, "platform" | "type"> & {
    numberOfPlayers: Rating;
    type: GameType.BOARD;
}

export type Game = VideoGame | BoardGame;
export type Inventory = Array<Game>
