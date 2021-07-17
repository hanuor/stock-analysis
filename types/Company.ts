export interface Company {
	info: CompanyInfo;
	logo: Logo;
	description: string;
	contact: Contact;
	stockDetails: StockDetails;
	executives: Executive[];
	secFilings: SecFilings;
}

export type StockDetails = {
	symbol: string;
	exchange: string;
	fiscalYear: string;
	currency: string;
	ipoPrice: string | null;
	cik: string;
	cusip: string;
	isin: string;
	eid: string;
};

export type CompanyInfo = {
	name: string;
	country: string;
	founded: string;
	ipoDate: string;
	industry: string;
	sector: string;
	employees: string;
	ceo: string;
};

export type Logo = {
	src?: string;
	width: number;
	height: number;
	alt: string;
};

export type Contact = {
	address: string;
	phone: string;
	website: string;
	domain: string;
};

export type Executive = {
	Name: string;
	Title: string;
};

export type SecFilings = {
	filings: Filing[];
	updated: string;
};

export type Filing = {
	type: string;
	title: string;
	url: string;
	time: string;
	cleantime: string;
};
