export interface Algorithm {
    (data: any[]): any;
    accumulator(): any;
    accumulator(newAccumulator: any): Algorithm;
    windowSize(): number;
    windowSize(windowSize: number): Algorithm;
    merge(): any;
    merge(newMerge: any): Algorithm;
}
export default function (): Algorithm;
