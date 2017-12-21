export {};

declare global {
    /* tslint:disable-next-line:interface-name*/
    interface Set<T> {
        intersection(other: Set<T>): Set<T>;
        union(other: Set<T>): Set<T>;
    }
}

Set.prototype.intersection = function <T>(other: Set<T>): Set<T> {
    const result = new Set<T>();
    const union = this.union(other);

    union.forEach((val) => {
        if (other.has(val) && this.has(val)) {
            result.add(val);
        }
    });

    return result;
};

Set.prototype.union = function <T>(other: Set<T>): Set<T> {
    const result = new Set<T>(this);

    other.forEach((val) => result.add(val));

    return result;
};
