export interface Statistics {
	valuation: StatisticType;
	dates: StatisticType;
	shares: StatisticType;
	ratios: StatisticType;
	evratios: StatisticType;
	financialPosition: StatisticType;
	financialEfficiency: StatisticType;
	taxes: StatisticType;
	stockprice: StatisticType;
	short: StatisticType;
	income: StatisticType;
	balance: StatisticType;
	cashflow: StatisticType;
	margins: StatisticType;
	dividends: StatisticType;
	splits: StatisticType;
}

export interface StatisticType {
	data: StatsArray[];
	text: string;
}

type StatsArray = [string, string, string, string];
