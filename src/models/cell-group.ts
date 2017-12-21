import { Cell } from "./cell";

export class CellGroup {
    public available: Set<number>;
    public cells: Cell[];

    constructor(n: number) {
        this.available = new Set();
        for (let i = 1; i <= n * n; i++) {
            this.available.add(i);
        }
        this.cells = new Array<Cell>(n * n);
    }
}
