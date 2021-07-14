export interface ForceIndexOptions {
    readonly sourcePath: string;
    readonly volumePath: string;
}
export default function (): {
    (data: any[]): any[];
    undefinedLength(): number;
    options(newOptions?: ForceIndexOptions | undefined): {
        sourcePath: string;
        volumePath: string;
    } | any;
};
