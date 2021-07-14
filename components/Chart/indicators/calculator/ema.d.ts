export interface EMAOptions {
    readonly windowSize: number;
    readonly sourcePath?: string;
}
interface EMACalculator {
    (data: any[]): (number | undefined)[];
    undefinedLength(): number;
    options(): EMAOptions;
    options(newOptions: EMAOptions): EMACalculator;
}
export default function (): EMACalculator;
export {};
