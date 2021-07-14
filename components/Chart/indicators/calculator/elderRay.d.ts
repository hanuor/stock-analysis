export interface ElderRayOptions {
    readonly movingAverageType: string;
    readonly sourcePath: string;
    readonly windowSize: number;
}
export default function (): {
    (data: any[]): {
        bullPower: number | undefined;
        bearPower: number | undefined;
    }[];
    undefinedLength(): number;
    ohlc(ohlcAccessor?: ((d: any) => any) | undefined): ((d: any) => {
        open: any;
        high: any;
        low: any;
        close: any;
    }) | any;
    options(newOptions?: ElderRayOptions | undefined): {
        windowSize: number;
        sourcePath: string;
        movingAverageType: string;
    } | any;
};
