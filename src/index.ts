import { Cell, CellGroup, Puzzle } from "./models";

function Main(n: number, board: number[][]): void {
    console.log("Begin");

    const puzzle = new Puzzle(n, board);

    console.log(puzzle.toArray());
    console.log("Done");
}

const BOARD_1 = [
    [0, 1, 3, 0],
    [2, 0, 0, 0],
    [0, 0, 0, 3],
    [0, 2, 1, 0],
];

const BOARD_2 = [
    [2, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 2, 0, 0],
    [0, 0, 0, 4],
];

Main(2, BOARD_1);
