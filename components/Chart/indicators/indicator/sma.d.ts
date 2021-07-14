import { SMAOptions } from "../calculator/sma";
interface SMAIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): SMAIndicator;
    accessor(): any;
    accessor(x: any): SMAIndicator;
    stroke(): string | any;
    stroke(x: string | any): SMAIndicator;
    fill(): string | any;
    fill(x: string | any): SMAIndicator;
    echo(): any;
    echo(x: any): SMAIndicator;
    type(): string;
    type(x: string): SMAIndicator;
    merge(): any;
    merge(newMerge: any): SMAIndicator;
    options(): SMAOptions;
    options(newOptions: SMAOptions): SMAIndicator;
}
export default function (): SMAIndicator;
export {};
