export {};

declare global {
    /* tslint:disable-next-line:interface-name*/
    interface Set<T> {
        intersection(other: Set<T>): Set<T>;
        union(other: Set<T>): Set<T>;
        toString(): string;
        where(predicate: (item: T) => boolean): Set<T>;
        countWhere(predicate: (item: T) => boolean): number;
        hasWhere(predicate: (item: T) => boolean): boolean;
        deleteWhere(predicate: (item: T) => boolean): boolean;
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

Set.prototype.where = function <T>(predicate: (item: T) => boolean): Set<T> {
    const result = new Set<T>();

    this.forEach((val) => {
        if (predicate(val)) {
            result.add(val);
        }
    });

    return result;
};

Set.prototype.countWhere = function <T>(predicate: (item: T) => boolean): number {
    let counter = 0;

    this.forEach((val) => {
        if (predicate(val)) {
            counter++;
        }
    });

    return counter;
};

Set.prototype.hasWhere = function <T>(predicate: (item: T) => boolean): boolean {
    let result = false;

    this.forEach((val) => {
        result = result || predicate(val);
    });

    return result;
};

Set.prototype.deleteWhere = function<T>(predicate: (item: T) => boolean): boolean {
    let obj: T = null;

    this.forEach((val) => {
        if (obj === null && predicate(obj)) {
            obj = val;
        }
    });

    if (obj !== null) {
        return this.delete(obj);
    } else {
        return false;
    }
};
