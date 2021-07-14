import { ChangeOptions } from "../calculator/change";
interface ChangeIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): ChangeIndicator;
    accessor(): any;
    accessor(x: any): ChangeIndicator;
    stroke(): string | any;
    stroke(x: string | any): ChangeIndicator;
    fill(): string | any;
    fill(x: string | any): ChangeIndicator;
    echo(): any;
    echo(x: any): ChangeIndicator;
    type(): string;
    type(x: string): ChangeIndicator;
    merge(): any;
    merge(newMerge: any): ChangeIndicator;
    options(): ChangeOptions;
    options(newOptions: ChangeOptions): ChangeIndicator;
}
export default function (): ChangeIndicator;
export {};
