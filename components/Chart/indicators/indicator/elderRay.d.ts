import { ElderRayOptions } from "../calculator/elderRay";
interface ElderRayIndicator {
    (data: any[], options?: {
        merge: boolean;
    }): any;
    id(): number;
    id(x: number): ElderRayIndicator;
    accessor(): any;
    accessor(x: any): ElderRayIndicator;
    stroke(): string | any;
    stroke(x: string | any): ElderRayIndicator;
    fill(): string | any;
    fill(x: string | any): ElderRayIndicator;
    echo(): any;
    echo(x: any): ElderRayIndicator;
    type(): string;
    type(x: string): ElderRayIndicator;
    merge(): any;
    merge(newMerge: any): ElderRayIndicator;
    options(): ElderRayOptions;
    options(newOptions: ElderRayOptions): ElderRayIndicator;
}
export default function (): ElderRayIndicator;
export {};
