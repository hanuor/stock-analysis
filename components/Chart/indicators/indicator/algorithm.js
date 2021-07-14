import { identity, merge, slidingWindow } from "../utils";
export default function () {
    let windowSize = 1;
    let accumulator = identity;
    let mergeAs = identity;
    function algorithm(data) {
        const defaultAlgorithm = slidingWindow().windowSize(windowSize).accumulator(accumulator);
        const calculator = merge().algorithm(defaultAlgorithm).merge(mergeAs);
        const newData = calculator(data);
        return newData;
    }
    algorithm.accumulator = (newAccumulator) => {
        if (newAccumulator === undefined) {
            return accumulator;
        }
        accumulator = newAccumulator;
        return algorithm;
    };
    algorithm.windowSize = (newWindowSize) => {
        if (newWindowSize === undefined) {
            return windowSize;
        }
        windowSize = newWindowSize;
        return algorithm;
    };
    algorithm.merge = (newMerge) => {
        if (newMerge === undefined) {
            return mergeAs;
        }
        mergeAs = newMerge;
        return algorithm;
    };
    return algorithm;
}
//# sourceMappingURL=algorithm.js.map