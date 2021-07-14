export interface MACDOptions {
    readonly fast: number;
    readonly slow: number;
    readonly signal: number;
    readonly sourcePath?: string;
}
interface MACDCalculator {
    (data: any[]): {
        macd: number | undefined;
        signal: number | undefined;
        divergence: number | undefined;
    }[];
    undefinedLength(): number;
    options(): MACDOptions;
    options(newOptions: MACDOptions): MACDCalculator;
}
export default function (): MACDCalculator;
export {};
