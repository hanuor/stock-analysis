import { EMAOptions } from "../calculator/ema";
interface EMAIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): EMAIndicator;
    accessor(): any;
    accessor(x: any): EMAIndicator;
    stroke(): string | any;
    stroke(x: string | any): EMAIndicator;
    fill(): string | any;
    fill(x: string | any): EMAIndicator;
    echo(): any;
    echo(x: any): EMAIndicator;
    type(): string;
    type(x: string): EMAIndicator;
    merge(): any;
    merge(newMerge: any): EMAIndicator;
    options(): EMAOptions;
    options(newOptions: EMAOptions): EMAIndicator;
}
export default function (): EMAIndicator;
export {};
