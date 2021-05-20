import map_income_statement from "./financials/map_income_statement";
import map_balance_sheet from "./financials/map_balance_sheet";
import map_cash_flow_statement from "./financials/map_cash_flow_statement";
import map_ratios from "./financials/map_ratios";

export default function financialDataMap(statement_type) {
	switch (statement_type) {
		case "income_statement": {
			return map_income_statement();
		}
		case "balance_sheet": {
			return map_balance_sheet();
		}
		case "cash_flow_statement": {
			return map_cash_flow_statement();
		}
		case "ratios": {
			return map_ratios();
		}

		default: {
			return map_income_statement();
		}
	}
}
