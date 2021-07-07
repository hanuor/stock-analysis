export interface IOHLCData {
	readonly close: number;
	readonly date: Date;
	readonly high: number;
	readonly low: number;
	readonly open: number;
	readonly volume: number;
	readonly ma1: number;
	readonly ma2: number;
}
