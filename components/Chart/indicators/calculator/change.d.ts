export interface ChangeOptions {
    readonly sourcePath: string;
    readonly basePath: string;
    readonly mainKeys: string[];
    readonly compareKeys: string[];
}
interface ChangeCalculator {
    (data: any[]): any;
    undefinedLength(): number;
    options(): ChangeOptions;
    options(newOptions: ChangeOptions): ChangeCalculator;
}
export default function (): ChangeCalculator;
export {};
