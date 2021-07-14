export default function (): {
    (rawData: any[]): any[];
    options(newOptions?: any): {
        boxSize: number;
        reversal: number;
        sourcePath: string;
    } | any;
    dateMutator(newDateMutator?: any): ((d: any, date: any) => void) | any;
    dateAccessor(newDateAccessor?: any): ((d: any) => any) | any;
};
