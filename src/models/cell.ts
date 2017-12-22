import "../extensions/set";
import { CellGroup } from "./cell-group";

export class Cell {
    public potentialValues: Set<number>;
    public row: CellGroup;
    public column: CellGroup;
    public block: CellGroup;

    private value: number;

    constructor(row: CellGroup, column: CellGroup, block: CellGroup) {
        this.value = 0;
        this.row = row;
        row.cells.push(this);
        this.column = column;
        this.block = block;
        this.potentialValues = row.available.intersection(column.available).intersection(block.available);
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(val: number): void {
        if (this.value !== 0) {
            this.row.available.add(this.value);
            this.column.available.add(this.value);
            this.block.available.add(this.value);
        }

        this.value = val;

        if (this.value !== 0) {
            this.row.available.delete(this.value);
            this.column.available.delete(this.value);
            this.block.available.delete(this.value);
        }
    }

    public toString(): string {
        return `{\n\tvalue: ${this.value},\n\tpotentialValues: ${this.potentialValues.toString()}\n}`;
    }
}
