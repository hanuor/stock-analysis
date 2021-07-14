export interface WMAOptions {
    sourcePath?: string;
    windowSize: number;
}
export default function (): {
    (data: any[]): any[];
    undefinedLength(): number;
    options(newOptions?: WMAOptions | undefined): {
        sourcePath: string;
        windowSize: number;
    } | any;
};
