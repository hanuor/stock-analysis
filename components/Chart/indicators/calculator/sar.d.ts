export interface SAROptions {
    readonly accelerationFactor: number;
    readonly maxAccelerationFactor: number;
}
export default function (): {
    (data: any[]): any;
    undefinedLength(): number;
    options(newOptions?: SAROptions | undefined): {
        accelerationFactor: number;
        maxAccelerationFactor: number;
    } | any;
};
