export interface TMAOptions {
    readonly sourcePath?: string;
    readonly windowSize: number;
}
export default function (): {
    (data: any[]): any[];
    undefinedLength(): number;
    options(newOptions?: TMAOptions | undefined): {
        sourcePath: string;
        windowSize: number;
    } | any;
};
