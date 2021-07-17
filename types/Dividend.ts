export interface DividendI {
	chartData: object;
	chartOptions: object;
	history: Dividend[];
	infoBox: string;
	infoTable: object;
}

export type Dividend = {
	exDate: string;
	amount: string;
	recordDate: string;
	payDate: string;
};
