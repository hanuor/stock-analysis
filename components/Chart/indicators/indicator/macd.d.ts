import { MACDOptions } from "../calculator/macd";
interface MACDIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): MACDIndicator;
    accessor(): any;
    accessor(x: any): MACDIndicator;
    stroke(): string | any;
    stroke(x: string | any): MACDIndicator;
    fill(): string | any;
    fill(x: string | any): MACDIndicator;
    echo(): any;
    echo(x: any): MACDIndicator;
    type(): string;
    type(x: string): MACDIndicator;
    merge(): any;
    merge(newMerge: any): MACDIndicator;
    options(): MACDOptions;
    options(newOptions: MACDOptions): MACDIndicator;
}
export default function (): MACDIndicator;
export {};
