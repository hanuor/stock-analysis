export interface CompareOptions {
    readonly basePath: string;
    readonly compareKeys: string[];
    readonly mainKeys: string[];
    readonly sourcePath?: string;
}
export default function (): {
    (data: any[]): {}[];
    options(newOptions?: CompareOptions | undefined): CompareOptions | any;
};
