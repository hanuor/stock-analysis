import { BollingerBandOptions } from "../calculator/bollingerband";
interface BollingerBandIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): BollingerBandIndicator;
    accessor(): any;
    accessor(x: any): BollingerBandIndicator;
    stroke(): string | any;
    stroke(x: string | any): BollingerBandIndicator;
    fill(): string | any;
    fill(x: string | any): BollingerBandIndicator;
    echo(): any;
    echo(x: any): BollingerBandIndicator;
    type(): string;
    type(x: string): BollingerBandIndicator;
    merge(): any;
    merge(newMerge: any): BollingerBandIndicator;
    options(): BollingerBandOptions;
    options(newOptions: BollingerBandOptions): BollingerBandIndicator;
}
export default function (): BollingerBandIndicator;
export {};
