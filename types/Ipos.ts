export interface IpoUpcoming {
	date: string;
	symbol: string;
	name: string;
	exchange: string;
	price: string;
	shares: string;
}

export type IpoCounts = {
	thisweek: number;
	nextweek: number;
	later: number;
	unscheduled: number;
};

export type CalendarData = {
	counts: IpoCounts;
	thisweek: IpoUpcoming[];
	nextweek: IpoUpcoming[];
	later: IpoUpcoming[];
};

export interface IpoRecent {
	date: string;
	symbol: string;
	name: string;
}

export type FilingMin = {
	symbol: string;
	name: string;
};
