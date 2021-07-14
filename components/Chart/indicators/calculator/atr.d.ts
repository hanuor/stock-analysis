export interface ATROptions {
    readonly windowSize: number;
}
export interface ATRSource {
    readonly close: number;
    readonly high: number;
    readonly low: number;
    readonly open: number;
}
export interface ATRCalculator {
    (data: any[]): any;
    undefinedLength(): number;
    options(): ATROptions;
    options(newOptions: ATROptions): ATRCalculator;
    source(): (d: any) => ATRSource;
    source(newSource: (d: any) => ATRSource): ATRCalculator;
}
export default function (): ATRCalculator;
