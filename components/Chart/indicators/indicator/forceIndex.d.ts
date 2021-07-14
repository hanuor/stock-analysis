import { ForceIndexOptions } from "../calculator/forceIndex";
interface ForceIndexIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): ForceIndexIndicator;
    accessor(): any;
    accessor(x: any): ForceIndexIndicator;
    stroke(): string | any;
    stroke(x: string | any): ForceIndexIndicator;
    fill(): string | any;
    fill(x: string | any): ForceIndexIndicator;
    echo(): any;
    echo(x: any): ForceIndexIndicator;
    type(): string;
    type(x: string): ForceIndexIndicator;
    merge(): any;
    merge(newMerge: any): ForceIndexIndicator;
    options(): ForceIndexOptions;
    options(newOptions: ForceIndexOptions): ForceIndexIndicator;
}
export default function (): ForceIndexIndicator;
export {};
