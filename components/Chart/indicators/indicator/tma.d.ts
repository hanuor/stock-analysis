import { TMAOptions } from "../calculator/tma";
interface TMAIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): TMAIndicator;
    accessor(): any;
    accessor(x: any): TMAIndicator;
    stroke(): string | any;
    stroke(x: string | any): TMAIndicator;
    fill(): string | any;
    fill(x: string | any): TMAIndicator;
    echo(): any;
    echo(x: any): TMAIndicator;
    type(): string;
    type(x: string): TMAIndicator;
    merge(): any;
    merge(newMerge: any): TMAIndicator;
    options(): TMAOptions;
    options(newOptions: TMAOptions): TMAIndicator;
}
export default function (): TMAIndicator;
export {};
