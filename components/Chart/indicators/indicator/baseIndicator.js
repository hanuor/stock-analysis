import { scaleOrdinal } from "d3-scale";
const defaultColors = ["#F44336", "#2196F3", "#8BC34A", "#FF5722", "#3F51B5", "#03A9F4", "#9C27B0", "#4CAF50"];
let i = 0;
const overlayColors = scaleOrdinal(defaultColors);
export default function () {
    let id = i++;
    let accessor;
    let stroke;
    let fill;
    let echo;
    let type;
    const baseIndicator = () => () => {
        /** Do Nothing */
    };
    baseIndicator.id = (newId) => {
        if (newId === undefined) {
            return id;
        }
        id = newId;
        return baseIndicator;
    };
    baseIndicator.accessor = (newAccessor) => {
        if (newAccessor === undefined) {
            return accessor;
        }
        accessor = newAccessor;
        return baseIndicator;
    };
    baseIndicator.stroke = (newStroke) => {
        if (newStroke === undefined) {
            return !stroke ? (stroke = overlayColors(id)) : stroke;
        }
        stroke = newStroke;
        return baseIndicator;
    };
    baseIndicator.fill = (newFill) => {
        if (newFill === undefined) {
            return !fill ? (fill = overlayColors(id)) : fill;
        }
        fill = newFill;
        return baseIndicator;
    };
    baseIndicator.echo = (newEcho) => {
        if (newEcho === undefined) {
            return echo;
        }
        echo = newEcho;
        return baseIndicator;
    };
    baseIndicator.type = (newType) => {
        if (newType === undefined) {
            return type;
        }
        type = newType;
        return baseIndicator;
    };
    return baseIndicator;
}
//# sourceMappingURL=baseIndicator.js.map