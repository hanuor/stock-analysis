import { merge, rebind, slidingWindow } from "../utils";
import baseIndicator from "./baseIndicator";
import { ElderImpulse as appearanceOptions } from "./defaultOptionsForAppearance";
const ALGORITHM_TYPE = "ElderImpulse";
export default function () {
    let macdSource;
    let emaSource;
    const base = baseIndicator().type(ALGORITHM_TYPE).stroke(appearanceOptions.stroke).fill(undefined);
    const underlyingAlgorithm = slidingWindow()
        .windowSize(2)
        .undefinedValue("neutral")
        .accumulator(([prev, curr]) => {
        if (macdSource === undefined) {
            throw new Error(`macdSource not defined for ${ALGORITHM_TYPE} calculator`);
        }
        if (emaSource === undefined) {
            throw new Error(`emaSource not defined for ${ALGORITHM_TYPE} calculator`);
        }
        const prevMacd = macdSource(prev);
        const prevEMA = emaSource(prev);
        if (prevMacd !== undefined && prevEMA !== undefined) {
            const prevMACDDivergence = prevMacd.divergence;
            const currMACDDivergence = macdSource(curr).divergence;
            const currEMA = emaSource(curr);
            if (currMACDDivergence >= prevMACDDivergence && currEMA >= prevEMA) {
                return "up";
            }
            if (currMACDDivergence <= prevMACDDivergence && currEMA <= prevEMA) {
                return "down";
            }
        }
        return "neutral";
    });
    const mergedAlgorithm = merge()
        .algorithm(underlyingAlgorithm)
        .merge((datum, i) => {
        datum.elderImpulse = i;
    });
    const indicator = function (data, options = { merge: true }) {
        const newData = options.merge ? mergedAlgorithm(data) : underlyingAlgorithm(data);
        return newData;
    };
    indicator.macdSource = function (x) {
        if (!arguments.length) {
            return macdSource;
        }
        macdSource = x;
        return indicator;
    };
    indicator.emaSource = function (x) {
        if (!arguments.length) {
            return emaSource;
        }
        emaSource = x;
        return indicator;
    };
    rebind(indicator, base, "id", "echo", "type", "stroke");
    rebind(indicator, mergedAlgorithm, "merge", "skipUndefined");
    return indicator;
}
//# sourceMappingURL=elderImpulse.js.map