import "../extensions/set";
import { CellGroup } from "./cell-group";
import { PotentialValue } from "./potential-value";

export class Cell {
    public readonly row: CellGroup;
    public readonly column: CellGroup;
    public readonly block: CellGroup;
    public readonly name: string;

    private value: number;
    private readonly potentialValues: Set<PotentialValue>;

    constructor(row: CellGroup, column: CellGroup, block: CellGroup, name: string) {
        this.value = 0;
        this.row = row;
        this.row.cells.push(this);
        this.column = column;
        this.column.cells.push(this);
        this.block = block;
        this.block.cells.push(this);
        this.potentialValues = new Set();
        this.potentialValues = new Set<PotentialValue>();
        const potVals = row.getAvailable()
        .intersection(column.getAvailable())
        .intersection(block.getAvailable());
        potVals.forEach((val) => this.potentialValues.add(new PotentialValue(val)));

        this.name = name;
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(n: number): boolean {
        const success = n === 0
            || this.potentialValues.has((item) => item.value === n);
        if (success) {
            if (this.value !== 0) {
                this.row.addAvailable(this.value);
                this.column.addAvailable(this.value);
                this.block.addAvailable(this.value);
                this.potentialValues.add(new PotentialValue(this.value));
            }

            this.value = n;

            if (this.value !== 0) {
                this.row.removeAvailable(this.value);
                this.column.removeAvailable(this.value);
                this.block.removeAvailable(this.value);
                this.potentialValues.delete((item) => item.value === this.value);
            }
        }
        return success;
    }

    public addPotentialValue(n: number): boolean {
        const success = this.row.getAvailable().has(n)
            && this.column.getAvailable().has(n)
            && this.block.getAvailable().has(n);
        if (success) {
            this.potentialValues.add(new PotentialValue(n));
        }

        return success;
    }

    public removePotentialValue(n: number): boolean {
        const success = this.potentialValues.delete((item) => item.value === n);
        return success;
    }

    public getPotentialValues(): number[] {
        const result = new Array<number>(this.potentialValues.values.length);
        this.potentialValues.forEach((item) => result.push(item.value));
        return result;
    }

    public potentialValueCount(): number {
        return this.potentialValues.size;
    }

    public toString(): string {
        return `{\n\tname: ${this.name}` +
        `\n\tvalue: ${this.value},` +
        `\n\tpotentialValues: ${this.potentialValues.toString()},` +
        `\n\trow: ${this.row.name},` +
        `\n\tcolumn: ${this.column.name},` +
        `\n\tblock: ${this.block.name}\n}`;
    }
}
