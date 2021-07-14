export interface STOOptions {
    readonly windowSize: number;
    readonly kWindowSize: number;
    readonly dWindowSize: number;
}
export default function (): {
    (data: any[]): {
        K: any;
        D: any;
    }[];
    undefinedLength(): number;
    source(newSource?: any): ((d: any) => {
        open: any;
        high: any;
        low: any;
        close: any;
    }) | any;
    options(newOptions?: any): STOOptions | any;
};
