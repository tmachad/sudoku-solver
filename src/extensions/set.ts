export {};

declare global {
    /* tslint:disable-next-line:interface-name*/
    interface Set<T> {
        intersection(other: Set<T>): Set<T>;
        union(other: Set<T>): Set<T>;
        toString(): string;
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

Set.prototype.toString = function(): string {
    let str = "[ ";
    this.forEach((val) => {
        str = str.concat(`${val}, `);
    });
    if (str.length > 2) {
        str = str.substr(0, str.length - 2);
    } else {
        str = str.substr(0, str.length - 1);
    }
    str = str.concat(" ]");
    return str;
};
