import { SAROptions } from "../calculator/sar";
interface SARIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): SARIndicator;
    accessor(): any;
    accessor(x: any): SARIndicator;
    stroke(): string | any;
    stroke(x: string | any): SARIndicator;
    fill(): string | any;
    fill(x: string | any): SARIndicator;
    echo(): any;
    echo(x: any): SARIndicator;
    type(): string;
    type(x: string): SARIndicator;
    merge(): any;
    merge(newMerge: any): SARIndicator;
    options(): SAROptions;
    options(newOptions: SAROptions): SARIndicator;
}
export default function (): SARIndicator;
export {};
