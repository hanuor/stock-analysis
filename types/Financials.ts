export interface FinancialsType {
	annual: FinancialReport;
	quarterly: FinancialReport;
	trailing: FinancialReport;
}

export interface FinancialReport {
	datekey: string[];
	marketcap: number[];
	revenue: number[];
}

export interface FinancialsMapType {
	id: string;
	title: string;
	tooltip?: string;
	bold?: boolean;
	extrabold?: boolean;
	data?: string;
	format?: string;
	formula?: string;
	indent?: boolean;
	border?: boolean;
}
