interface SlidingWindow {
    (data: any[]): any[];
    misc(): any;
    misc(x: any): SlidingWindow;
    accumulator(): any;
    accumulator(x: any): SlidingWindow;
    skipInitial(): number;
    skipInitial(x: number): SlidingWindow;
    source(): any;
    source(source: any): SlidingWindow;
    sourcePath(): any;
    sourcePath(x: any): SlidingWindow;
    windowSize(): number;
    windowSize(windowSize: number): SlidingWindow;
    undefinedValue(): any;
    undefinedValue(x: any): SlidingWindow;
}
export default function (): SlidingWindow;
export {};
