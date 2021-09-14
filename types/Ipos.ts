export interface IpoUpcoming {
	date: string;
	symbol: string;
	name: string;
	exchange: string;
	price: string;
	shares: string;
}

export type CalendarData = {
	thisweek: IpoUpcoming[];
	nextweek: IpoUpcoming[];
	later: IpoUpcoming[];
	highprofile: IpoUpcoming[];
	unknown: IpoUpcoming[];
};

export interface IpoRecent {
	date: string;
	symbol: string;
	name: string;
}
