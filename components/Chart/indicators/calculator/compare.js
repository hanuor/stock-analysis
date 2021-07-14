import { path } from "../utils";
import { Change as defaultOptions } from "./defaultOptionsForComputation";
export default function () {
    let options = defaultOptions;
    const calculator = (data) => {
        const { basePath, mainKeys, compareKeys } = options;
        const base = path(basePath);
        const first = data[0];
        const b = base(first);
        const firsts = {};
        const compareData = data.map((d) => {
            const result = {};
            mainKeys.forEach((key) => {
                if (typeof d[key] === "object") {
                    // @ts-ignore
                    result[key] = {};
                    Object.keys(d[key]).forEach((subkey) => {
                        // @ts-ignore
                        result[key][subkey] = (d[key][subkey] - b) / b;
                    });
                }
                else {
                    // @ts-ignore
                    result[key] = (d[key] - b) / b;
                }
            });
            compareKeys.forEach((key) => {
                if (d[key] !== undefined && firsts[key] === undefined) {
                    // @ts-ignore
                    firsts[key] = d[key];
                }
                if (d[key] !== undefined && firsts[key] !== undefined) {
                    // @ts-ignore
                    result[key] = (d[key] - firsts[key]) / firsts[key];
                }
            });
            return result;
        });
        return compareData;
    };
    calculator.options = (newOptions) => {
        if (newOptions === undefined) {
            return options;
        }
        options = Object.assign(Object.assign({}, defaultOptions), newOptions);
        return calculator;
    };
    return calculator;
}
//# sourceMappingURL=compare.js.map