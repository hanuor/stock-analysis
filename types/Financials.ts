export interface FinancialsType {
	annual: FinancialReport;
	quarterly: FinancialReport;
	trailing: FinancialReport;
}

export interface FinancialReport {
	[key: string]: any[];
}

export type Statement =
	| 'income_statement'
	| 'balance_sheet'
	| 'cash_flow_statement'
	| 'ratios';

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
