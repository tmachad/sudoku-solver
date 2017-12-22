import "../extensions/set";
import { CellGroup } from "./cell-group";

export class Cell {
    public readonly row: CellGroup;
    public readonly column: CellGroup;
    public readonly block: CellGroup;

    private value: number;
    private readonly potentialValues: Set<number>;

    constructor(row: CellGroup, column: CellGroup, block: CellGroup) {
        this.value = 0;
        this.row = row;
        row.cells.push(this);
        this.column = column;
        this.block = block;
        this.potentialValues = row.getAvailable()
        .intersection(column.getAvailable())
        .intersection(block.getAvailable());
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(n: number): boolean {
        const success = n === 0 
            || (this.row.getAvailable().has(n) 
            && this.column.getAvailable().has(n) 
            && this.block.getAvailable().has(n));

        if (success) {
            if (this.value !== 0) {
                this.row.addAvailable(this.value);
                this.column.addAvailable(this.value);
                this.block.addAvailable(this.value);
            }

            this.value = n;

            if (this.value !== 0) {
                this.row.removeAvailable(this.value);
                this.column.removeAvailable(this.value);
                this.block.removeAvailable(this.value);
            }
        }
        return success;
    }

    public addPotentialValue(n: number): boolean {
        const success = this.row.getAvailable().has(n) 
            && this.column.getAvailable().has(n) 
            && this.block.getAvailable().has(n);
        
        if (success) {
            this.potentialValues.add(n);
        }

        return success;
    }

    public removePotentialValue(n: number): boolean {
        return this.potentialValues.delete(n);
    }

    public toString(): string {
        return `{\n\tvalue: ${this.value},` +
        `\n\tpotentialValues: ${this.potentialValues.toString()},` +
        `\n\trow: ${this.row.name},` +
        `\n\tcolumn: ${this.column.name},` +
        `\n\tblock: ${this.block.name}\n}`;
    }
}
