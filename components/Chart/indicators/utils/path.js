export const path = (loc = []) => {
    const key = Array.isArray(loc) ? loc : [loc];
    const length = key.length;
    return function (obj, defaultValue) {
        if (length === 0) {
            return obj !== undefined && obj !== null ? obj : defaultValue;
        }
        let index = 0;
        while (obj != null && index < length) {
            obj = obj[key[index++]];
        }
        return index === length ? obj : defaultValue;
    };
};
//# sourceMappingURL=path.js.map