export interface DividendI {
	chartData: DividendChartDataType;
	chartOptions: {
		growth: boolean;
		trailing: boolean;
	};
	history: DividendType[];
	infoBox: string;
	infoTable: InfoTableType;
}

export type DividendType = {
	exDate: string;
	amount: string;
	recordDate: string;
	payDate: string;
};

export type InfoTableType = {
	annual: string;
	exdiv: string;
	frequency: string;
	growth: string;
	payoutRatio: string;
	yield: string;
};

export type DividendChartDataType = {
	amount: number[];
	date: string[];
	growth: number[];
	growthTTM: number[];
	ttm: number[];
};
