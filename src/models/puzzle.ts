import { Cell } from "./cell";
import { CellGroup } from "./cell-group";
import { HistoryRecord } from "./history-record";

export class Puzzle {
    public readonly rows: CellGroup[];
    public readonly columns: CellGroup[];
    public readonly blocks: CellGroup[];
    public readonly cells: Cell[][];
    public readonly size: number;

    private unassigned: Set<Cell>;

    constructor(size: number, board: number[][]) {
        this.rows = this.initializeGroupArray(size, "r_");
        this.columns = this.initializeGroupArray(size, "c_");
        this.blocks = this.initializeGroupArray(size, "b_");
        this.cells = new Array<Cell[]>(size * size);
        for (let i = 0; i < this.cells.length; i++) {
            this.cells[i] = new Array<Cell>(size * size);
        }
        this.size = size;
        this.unassigned = new Set<Cell>();

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                const cell = new Cell(
                    this.rows[row],
                    this.columns[col],
                    this.blocks[Math.floor(row / size) * size + Math.floor(col / size)],
                    `[${row}, ${col}]`,
                );
                cell.setValue(board[row][col]);
                this.cells[row][col] = cell;
                if (cell.getValue() === 0) {
                    this.unassigned.add(cell);
                }
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

    public solve(): void {
        let abort = false;
        const historyStack = new Array<HistoryRecord>();
        while (this.unassigned.size > 0 && !abort) {
            let breakInner = false;

            // Solve all cells that have an unambiguous solution
            for (let row = 0; row < this.cells.length && !breakInner; row++) {
                for (let col = 0; col < this.cells[row].length && !breakInner; col++) {
                    const cell = this.cells[row][col];
                    // Found an unassigned cell that has an unambiguous solution
                    if (cell.getValue() === 0 && cell.potentialValueCount() === 1) {
                        const record = new HistoryRecord(cell);
                        historyStack.push(record);
                        const chosenValue = record.getFirstUntried();
                        record.chosenValue = chosenValue.value;
                        chosenValue.tried = true;
                        cell.setValue(chosenValue.value);
                        this.unassigned.delete(cell);
                        breakInner = true;
                    }
                }
            }
            // If no unambiguous solutions are available, find a cell to guess a solution for
            if (!breakInner) {
                breakInner = false;
                for (let row = 0; row < this.cells.length && !breakInner; row++) {
                    for (let col = 0; col < this.cells[row].length && !breakInner; col++) {
                        const cell = this.cells[row][col];
                        // Found a cell that needs a solution
                        if (cell.getValue() === 0) {
                            // Cell has no potential values, so we've hit a dead end
                            if (cell.potentialValueCount() === 0) {
                                let rewind = true;
                                while (rewind) {
                                    const record = historyStack.pop();
                                    if (record.untriedCount() === 0) {
                                        record.cell.setValue(0);
                                    } else {
                                        record.cell.setValue(0);
                                        const nextValue = record.getFirstUntried();
                                        record.chosenValue = nextValue.value;
                                        nextValue.tried = true;
                                        record.cell.setValue(nextValue.value);
                                        historyStack.push(record);
                                        rewind = false;
                                    }
                                }
                            // Cell has potential values we can guess
                            } else {
                                const record = new HistoryRecord(cell);
                                historyStack.push(record);
                                const chosenValue = record.getFirstUntried();
                                record.chosenValue = chosenValue.value;
                                chosenValue.tried = true;
                                cell.setValue(chosenValue.value);
                                this.unassigned.delete(cell);
                            }
                            breakInner = true;
                        }
                    }
                }
            }

            if (!breakInner || abort) {
                console.log("Hit a dead end. Time to go back up the stack!");
                console.log(`${this.unassigned.size} unassigned cells left:`);
                this.unassigned.forEach((cell) => {
                    console.log(`[${cell.row.name}, ${cell.column.name}, ${cell.block.name}] ` +
                        `value: ${cell.getValue()} pt: [${cell.getPotentialValues()}]`);
                });
                console.log("History stack:");
                historyStack.forEach((history) => console.log(history.toString()));
            }
        }
    }

    private initializeGroupArray(n: number, nameBase: string): CellGroup[] {
        const arr = new Array<CellGroup>(n * n);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = new CellGroup(n, nameBase + i.toString());
        }
        return arr;
    }
}
