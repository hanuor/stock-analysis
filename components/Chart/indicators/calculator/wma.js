import { sum } from "d3-array";
import { slidingWindow } from "../utils";
import { WMA as defaultOptions } from "./defaultOptionsForComputation";
export default function () {
    let options = defaultOptions;
    const calculator = (data) => {
        const { windowSize, sourcePath } = options;
        const weight = (windowSize * (windowSize + 1)) / 2;
        const waverage = slidingWindow()
            .windowSize(windowSize)
            .sourcePath(sourcePath)
            .accumulator((values) => {
            const total = sum(values, (v, i) => {
                return (i + 1) * v;
            });
            return total / weight;
        });
        return waverage(data);
    };
    calculator.undefinedLength = () => {
        const { windowSize } = options;
        return windowSize - 1;
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
//# sourceMappingURL=wma.js.map