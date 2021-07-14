import { slidingWindow } from "../utils";
import { Change as defaultOptions } from "./defaultOptionsForComputation";
export default function () {
    let options = defaultOptions;
    const calculator = (data) => {
        const { sourcePath } = options;
        const algo = slidingWindow()
            .windowSize(2)
            .sourcePath(sourcePath)
            .accumulator(([prev, curr]) => {
            const absoluteChange = curr - prev;
            const percentChange = (absoluteChange * 100) / prev;
            return { absoluteChange, percentChange };
        });
        const newData = algo(data);
        return newData;
    };
    calculator.undefinedLength = () => {
        return 1;
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
//# sourceMappingURL=change.js.map