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
        let startGuessing = false;
        const historyStack = new Array<HistoryRecord>();
        while (this.unassigned.size > 0) {
            let breakInner = false;

            // Solve all cells that have an unambiguous solution
            for (let row = 0; row < this.cells.length && !breakInner; row++) {
                for (let col = 0; col < this.cells[row].length && !breakInner; col++) {
                    const cell = this.cells[row][col];
                    if (cell.getValue() === 0) {
                        if (cell.potentialValueCount() === 0) {
                            // A dead end has been reached, rewind history to the last branch
                            let rewind = true;
                            while (rewind) {
                                const record = historyStack.pop();
                                if (record.untriedCount() === 0) {
                                    record.cell.setValue(0);
                                    this.unassigned.add(record.cell);
                                } else {
                                    record.cell.setValue(0);
                                    record.chooseFirstUntried();
                                    historyStack.push(record);
                                    rewind = false;
                                }
                            }
                            startGuessing = false;  // reset this just in case it was set to true when rewind occurred
                            breakInner = true;
                        } else if (cell.potentialValueCount() === 1) {
                            // Cell only has one possible value, so take that
                            const record = new HistoryRecord(cell);
                            record.chooseFirstUntried();
                            historyStack.push(record);
                            this.unassigned.delete(cell);
                            breakInner = true;
                        } else if (startGuessing) {
                            // Cell has multiple possible values, so try the first untried one
                            const record = new HistoryRecord(cell);
                            record.chooseFirstUntried();
                            historyStack.push(record);
                            this.unassigned.delete(cell);
                            breakInner = true;
                        }
                    }
                }
            }

            if (!breakInner) {
                startGuessing = true;
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
