export interface BaseIndicator {
    (): () => void;
    id(): number;
    id(x: number): BaseIndicator;
    accessor(): any;
    accessor(x: any): BaseIndicator;
    stroke(): string | any;
    stroke(x: string | any): BaseIndicator;
    fill(): string | any;
    fill(x: string | any): BaseIndicator;
    echo(): any;
    echo(x: any): BaseIndicator;
    type(): string;
    type(x: string): BaseIndicator;
}
export default function (): BaseIndicator;
