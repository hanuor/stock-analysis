export default function (): {
    (data: any[]): {
        force: unknown;
        smoothed: unknown;
    }[];
    undefinedLength(): number;
    options(newOptions?: any): {
        sourcePath: string;
        volumePath: string;
        smoothingType: string;
        smoothingWindow: number;
    } | any;
};
