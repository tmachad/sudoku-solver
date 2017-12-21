import { Cell } from "./cell";
import { CellGroup } from "./cell-group";

export class Puzzle {
    public readonly rows: CellGroup[];
    public readonly columns: CellGroup[];
    public readonly blocks: CellGroup[];
    public readonly cells: Cell[][];
    public readonly size: number;

    constructor(size: number, board: number[][]) {
        this.rows = this.initializeGroupArray(size);
        this.columns = this.initializeGroupArray(size);
        this.blocks = this.initializeGroupArray(size);
        this.cells = new Array<Cell[]>(size * size);
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = new Array<Cell>(size * size);
        }
        this.size = size;

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                const cell = new Cell(
                    this.rows[row],
                    this.columns[col],
                    this.blocks[Math.floor(row / size) * size + Math.floor(col / 2)],
                );
                cell.setValue(board[row][col]);
                this.cells[row][col] = cell;
            }
        }
    }

    public toArray(): number[][] {
        const arr = new Array<number[]>(this.size * this.size);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new Array<number>(this.size * this.size);
        }

        this.cells.forEach((row, rIndex) => {
            row.forEach((col, cIndex) => {
                arr[rIndex][cIndex] = row[cIndex].getValue();
            });
        });

        return arr;
    }

    private initializeGroupArray(n: number): CellGroup[] {
        const arr = new Array<CellGroup>(n * n);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new CellGroup(n);
        }
        return arr;
    }
}
