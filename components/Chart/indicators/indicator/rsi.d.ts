import { RSIOptions } from "../calculator/rsi";
interface RSIIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): RSIIndicator;
    accessor(): any;
    accessor(x: any): RSIIndicator;
    stroke(): string | any;
    stroke(x: string | any): RSIIndicator;
    fill(): string | any;
    fill(x: string | any): RSIIndicator;
    echo(): any;
    echo(x: any): RSIIndicator;
    type(): string;
    type(x: string): RSIIndicator;
    merge(): any;
    merge(newMerge: any): RSIIndicator;
    options(): RSIOptions;
    options(newOptions: RSIOptions): RSIIndicator;
}
export default function (): RSIIndicator;
export {};
