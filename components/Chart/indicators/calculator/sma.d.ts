export interface SMAOptions {
    readonly sourcePath?: string;
    readonly windowSize: number;
}
export default function (): {
    (data: any[]): any[];
    undefinedLength(): number;
    options(newOptions?: SMAOptions | undefined): {
        sourcePath: string;
        windowSize: number;
    } | any;
};
