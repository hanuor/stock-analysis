interface Merge {
    (data: any[]): any;
    algorithm(): any;
    algorithm(newAlgorithm: any): Merge;
    merge(): any;
    merge(newMerge: any): Merge;
    skipUndefined(): boolean;
    skipUndefined(newSkipUndefined: boolean): Merge;
}
export default function (): Merge;
export {};
