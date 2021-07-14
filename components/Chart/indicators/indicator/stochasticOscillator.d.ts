import { STOOptions } from "../calculator/sto";
interface StochasticOscillatorIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): StochasticOscillatorIndicator;
    accessor(): any;
    accessor(x: any): StochasticOscillatorIndicator;
    stroke(): string | any;
    stroke(x: string | any): StochasticOscillatorIndicator;
    fill(): string | any;
    fill(x: string | any): StochasticOscillatorIndicator;
    echo(): any;
    echo(x: any): StochasticOscillatorIndicator;
    type(): string;
    type(x: string): StochasticOscillatorIndicator;
    merge(): any;
    merge(newMerge: any): StochasticOscillatorIndicator;
    options(): STOOptions;
    options(newOptions: STOOptions): StochasticOscillatorIndicator;
}
export default function (): StochasticOscillatorIndicator;
export {};
