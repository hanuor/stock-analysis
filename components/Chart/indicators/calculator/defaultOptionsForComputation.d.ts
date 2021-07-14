export declare const BollingerBand: {
    windowSize: number;
    sourcePath: string;
    multiplier: number;
    movingAverageType: string;
};
export declare const ATR: {
    windowSize: number;
};
export declare const ForceIndex: {
    sourcePath: string;
    volumePath: string;
};
export declare const SmoothedForceIndex: {
    sourcePath: string;
    volumePath: string;
    smoothingType: string;
    smoothingWindow: number;
};
export declare const Change: {
    sourcePath: string;
    basePath: string;
    mainKeys: never[];
    compareKeys: never[];
};
export declare const Compare: {
    basePath: string;
    mainKeys: string[];
    compareKeys: never[];
};
export declare const ElderRay: {
    windowSize: number;
    sourcePath: string;
    movingAverageType: string;
};
export declare const ElderImpulse: {
    sourcePath: string;
};
export declare const SAR: {
    accelerationFactor: number;
    maxAccelerationFactor: number;
};
export declare const MACD: {
    fast: number;
    slow: number;
    signal: number;
    sourcePath: string;
};
export declare const FullStochasticOscillator: {
    windowSize: number;
    kWindowSize: number;
    dWindowSize: number;
};
export declare const RSI: {
    windowSize: number;
    sourcePath: string;
};
export declare const EMA: {
    sourcePath: string;
    windowSize: number;
};
export declare const SMA: {
    sourcePath: string;
    windowSize: number;
};
export declare const WMA: {
    sourcePath: string;
    windowSize: number;
};
export declare const TMA: {
    sourcePath: string;
    windowSize: number;
};
export declare const Kagi: {
    reversalType: string;
    windowSize: number;
    reversal: number;
    sourcePath: string;
};
export declare const Renko: {
    reversalType: string;
    windowSize: number;
    fixedBrickSize: number;
    sourcePath: string;
};
export declare const PointAndFigure: {
    boxSize: number;
    reversal: number;
    sourcePath: string;
};
