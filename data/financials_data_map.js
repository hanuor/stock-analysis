import map_income_statement from './financials/map_income_statement';
import map_balance_sheet from './financials/map_balance_sheet';
import map_cash_flow_statement from './financials/map_cash_flow_statement';
import map_ratios from './financials/map_ratios';
import map_statistics from './financials/map_statistics';

export default function financialDataMap(statement_type) {
	switch (statement_type) {
		case 'income_statement': {
			return map_income_statement();
		}
		case 'balance_sheet': {
			return map_balance_sheet();
		}
		case 'cash_flow_statement': {
			return map_cash_flow_statement();
		}
		case 'ratios': {
			return map_ratios();
		}

		default: {
			return map_income_statement();
		}
	}
}

export const fullMap = () => {
	let income_statement = map_income_statement();
	let balance_sheet = map_balance_sheet();
	let cash_flow_statement = map_cash_flow_statement();
	let ratios = map_ratios();
	let statistics = map_statistics();

	return [
		...income_statement,
		...balance_sheet,
		...cash_flow_statement,
		...ratios,
		...statistics,
	];
};
