interface Zip {
    (...args: any[]): any[];
    combine(): any;
    combine(x: any): Zip;
}
export default function zipper(): Zip;
export {};
