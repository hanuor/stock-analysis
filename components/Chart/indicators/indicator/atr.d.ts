import { ATROptions } from "../calculator/atr";
interface ATRIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): ATRIndicator;
    accessor(): any;
    accessor(x: any): ATRIndicator;
    stroke(): string | any;
    stroke(x: string | any): ATRIndicator;
    fill(): string | any;
    fill(x: string | any): ATRIndicator;
    echo(): any;
    echo(x: any): ATRIndicator;
    type(): string;
    type(x: string): ATRIndicator;
    merge(): any;
    merge(newMerge: any): ATRIndicator;
    options(): ATROptions;
    options(newOptions: ATROptions): ATRIndicator;
    skipUndefined(): boolean;
    skipUndefined(newSkipUndefined: boolean): ATRIndicator;
}
export default function (): ATRIndicator;
export {};
