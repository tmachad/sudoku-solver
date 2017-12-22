import { Cell } from "./cell";

export class CellGroup {
    public readonly name: string;
    public readonly cells: Cell[];
    private readonly available: Set<number>;

    constructor(n: number, name: string) {
        this.available = new Set();
        for (let i = 1; i <= n * n; i++) {
            this.available.add(i);
        }
        this.cells = new Array<Cell>(n * n);
        this.name = name;
    }

    public getAvailable(): Set<number> {
        return this.available;
    }

    public removeAvailable(n: number): boolean {
        const success = this.available.delete(n);
        // console.log(`Deleting ${n} from group ${this.name} available values ${success ? 'succeeded' : 'failed' }`);
        if (success) {
            this.cells.forEach((cell) => cell.removePotentialValue(n));
        }
        return success;
    }

    public addAvailable(n: number): boolean {
        const success = !this.available.has(n);
        // console.log(`Adding ${n} to group ${this.name} available values ${success ? 'succeeded' : 'failed' }`);
        if (success) {
            this.available.add(n);
            this.cells.forEach((cell) => cell.addPotentialValue(n));
        }

        return success;
    }
}
