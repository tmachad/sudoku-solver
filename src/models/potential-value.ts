export class PotentialValue {
    public value: number;
    public tried: boolean;

    constructor(value: number) {
        this.value = value;
        this.tried = false;
    }
}
