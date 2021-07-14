export interface BollingerBandOptions {
    readonly windowSize: number;
    readonly sourcePath: string;
    readonly multiplier: number;
    readonly movingAverageType: string;
}
interface BollingerBandCalculator {
    (data: any[]): any;
    undefinedLength(): number;
    options(): BollingerBandOptions;
    options(newOptions: BollingerBandOptions): BollingerBandCalculator;
}
export default function (): BollingerBandCalculator;
export {};
