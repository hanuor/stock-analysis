import { mean } from "d3-array";
import { slidingWindow } from "../utils";
import { SMA as defaultOptions } from "./defaultOptionsForComputation";
export default function () {
    let options = defaultOptions;
    const calculator = (data) => {
        const { windowSize, sourcePath } = options;
        const average = slidingWindow()
            .windowSize(windowSize)
            .sourcePath(sourcePath)
            .accumulator((values) => mean(values));
        return average(data);
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
//# sourceMappingURL=sma.js.map