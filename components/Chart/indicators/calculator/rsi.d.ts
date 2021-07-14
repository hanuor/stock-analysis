export interface RSIOptions {
    windowSize: number;
    sourcePath?: string;
}
export default function (): {
    (data: any[]): any[];
    undefinedLength(): number;
    options(newOptions?: RSIOptions | undefined): {
        windowSize: number;
        sourcePath: string;
    } | any;
};
