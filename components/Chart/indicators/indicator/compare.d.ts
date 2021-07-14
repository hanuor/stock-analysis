import { CompareOptions } from "../calculator/compare";
interface CompareIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): CompareIndicator;
    accessor(): any;
    accessor(x: any): CompareIndicator;
    stroke(): string | any;
    stroke(x: string | any): CompareIndicator;
    fill(): string | any;
    fill(x: string | any): CompareIndicator;
    echo(): any;
    echo(x: any): CompareIndicator;
    type(): string;
    type(x: string): CompareIndicator;
    merge(): any;
    merge(newMerge: any): CompareIndicator;
    options(): CompareOptions;
    options(newOptions: CompareOptions): CompareIndicator;
}
export default function (): CompareIndicator;
export {};
