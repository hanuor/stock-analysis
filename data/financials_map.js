import mapIncomeStatement from './financials/map_income_statement';
import mapBalanceSheet from './financials/map_balance_sheet';
import mapCashflowStatement from './financials/map_cash_flow_statement';
import mapRatios from './financials/map_ratios';
import mapStatistics from './financials/map_statistics';

export default function financialDataMap(statementType) {
	switch (statementType) {
		case 'income_statement': {
			return mapIncomeStatement();
		}
		case 'balance_sheet': {
			return mapBalanceSheet();
		}
		case 'cash_flow_statement': {
			return mapCashflowStatement();
		}
		case 'ratios': {
			return mapRatios();
		}

		default: {
			return mapIncomeStatement();
		}
	}
}

export const fullMap = () => {
	const incomeStatement = mapIncomeStatement();
	const balanceSheet = mapBalanceSheet();
	const cashflowStatement = mapCashflowStatement();
	const ratios = mapRatios();
	const statistics = mapStatistics();

	return [
		...incomeStatement,
		...balanceSheet,
		...cashflowStatement,
		...ratios,
		...statistics,
	];
};
