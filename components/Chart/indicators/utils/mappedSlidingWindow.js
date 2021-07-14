import { functor } from "./functor";
import { identity } from "./identity";
export default function () {
    let undefinedValue;
    let windowSize = 10;
    let accumulator = () => {
        /** Do Nothing */
    };
    let source = identity;
    let skipInitial = 0;
    const mappedSlidingWindow = function (data) {
        // @ts-ignore
        const size = functor(windowSize).apply(this, arguments);
        const windowData = [];
        let accumulatorIdx = 0;
        const undef = functor(undefinedValue);
        const result = [];
        data.forEach(function (d, i) {
            let mapped;
            if (i < skipInitial + size - 1) {
                mapped = undef(d, i);
                result.push(mapped);
                windowData.push(mapped);
                return;
            }
            if (i >= skipInitial + size) {
                windowData.shift();
            }
            // @ts-ignore
            windowData.push(source(d, i));
            // @ts-ignore
            mapped = accumulator(windowData, i, accumulatorIdx++);
            result.push(mapped);
            windowData.pop();
            windowData.push(mapped);
            return;
        });
        return result;
    };
    mappedSlidingWindow.undefinedValue = function (x) {
        if (!arguments.length) {
            return undefinedValue;
        }
        undefinedValue = x;
        return mappedSlidingWindow;
    };
    mappedSlidingWindow.windowSize = function (x) {
        if (!arguments.length) {
            return windowSize;
        }
        windowSize = x;
        return mappedSlidingWindow;
    };
    mappedSlidingWindow.accumulator = function (x) {
        if (!arguments.length) {
            return accumulator;
        }
        accumulator = x;
        return mappedSlidingWindow;
    };
    mappedSlidingWindow.skipInitial = function (x) {
        if (!arguments.length) {
            return skipInitial;
        }
        skipInitial = x;
        return mappedSlidingWindow;
    };
    mappedSlidingWindow.source = function (x) {
        if (!arguments.length) {
            return source;
        }
        source = x;
        return mappedSlidingWindow;
    };
    return mappedSlidingWindow;
}
//# sourceMappingURL=mappedSlidingWindow.js.map