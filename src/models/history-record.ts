import "../extensions/set";
import { Cell } from "./cell";
import { PotentialValue } from "./potential-value";

export class HistoryRecord {
    public readonly cell: Cell;
    public readonly potentialValues: Set<PotentialValue>;
    public chosenValue: number;

    constructor(cell: Cell) {
        this.cell = cell;
        this.potentialValues = new Set();
        this.cell.getPotentialValues().forEach((val) => this.potentialValues.add(new PotentialValue(val)));
    }

    public getFirstUntried(): PotentialValue {
        return this.potentialValues.where((item) => !item.tried).values().next().value;
    }

    public getPotentialValue(n: number): PotentialValue {
        return this.potentialValues.where((item) => item.value === n).values().next().value;
    }

    public toString(): string {
        return `{\n\tcell: ${this.cell.toString()}\n\tpotentialValues: ${this.potentialValues.toString()}\n}`;
    }

    public untriedCount(): number {
        return this.potentialValues.countWhere((item) => item.tried === false);
    }
}
