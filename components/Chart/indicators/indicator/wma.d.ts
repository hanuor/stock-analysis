import { WMAOptions } from "../calculator/wma";
interface WMAIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): WMAIndicator;
    accessor(): any;
    accessor(x: any): WMAIndicator;
    stroke(): string | any;
    stroke(x: string | any): WMAIndicator;
    fill(): string | any;
    fill(x: string | any): WMAIndicator;
    echo(): any;
    echo(x: any): WMAIndicator;
    type(): string;
    type(x: string): WMAIndicator;
    merge(): any;
    merge(newMerge: any): WMAIndicator;
    options(): WMAOptions;
    options(newOptions: WMAOptions): WMAIndicator;
}
export default function (): WMAIndicator;
export {};
