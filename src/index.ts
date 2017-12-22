import { Cell, CellGroup, Puzzle } from "./models";

function Main(n: number, board: number[][]): void {
    console.log("Begin");

    const puzzle = new Puzzle(n, board);
    console.log(puzzle.toArray());
    puzzle.solve();
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

const BOARD_3 = [
    [6, 0, 3, 0, 4, 0, 5, 0, 8],
    [0, 0, 9, 0, 0, 0, 3, 0, 0],
    [5, 8, 0, 0, 2, 0, 0, 6, 9],
    [0, 0, 0, 0, 1, 6, 0, 0, 0],
    [7, 0, 1, 0, 0, 0, 6, 0, 3],
    [0, 0, 0, 3, 7, 0, 0, 0, 0],
    [2, 7, 0, 0, 3, 0, 0, 5, 6],
    [0, 0, 6, 0, 0, 0, 8, 0, 0],
    [8, 0, 5, 0, 9, 0, 7, 0, 2],
];

Main(3, BOARD_3);
