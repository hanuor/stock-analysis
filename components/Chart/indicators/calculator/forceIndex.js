import { path, slidingWindow } from "../utils";
import { ForceIndex as defaultOptions } from "./defaultOptionsForComputation";
export default function () {
    let options = defaultOptions;
    const calculator = (data) => {
        const { sourcePath, volumePath } = options;
        const source = path(sourcePath);
        const volume = path(volumePath);
        const forceIndexCalulator = slidingWindow()
            .windowSize(2)
            .accumulator(([prev, curr]) => (source(curr) - source(prev)) * volume(curr));
        const forceIndex = forceIndexCalulator(data);
        return forceIndex;
    };
    calculator.undefinedLength = () => {
        return 2;
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
//# sourceMappingURL=forceIndex.js.map