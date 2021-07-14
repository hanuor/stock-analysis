interface MappedSlidingWindow {
    (data: any[]): any;
    accumulator(): any;
    accumulator(x: any): MappedSlidingWindow;
    skipInitial(): number;
    skipInitial(x: number): MappedSlidingWindow;
    source(): any;
    source(x: any): MappedSlidingWindow;
    undefinedValue(): any;
    undefinedValue(x: any): MappedSlidingWindow;
    windowSize(): number;
    windowSize(x: number): MappedSlidingWindow;
}
export default function (): MappedSlidingWindow;
export {};
