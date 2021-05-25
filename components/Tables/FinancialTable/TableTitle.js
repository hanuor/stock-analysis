import stockState from "@State/stockState";
import financialsState from "@State/financialsState";

export default function TableTitle() {
	return (
		<div>
			<TableHeader />
			<TableInfo />
		</div>
	);
}

function TableHeader() {
	const statement = financialsState((state) => state.statement);
	const range = financialsState((state) => state.range);

	let rangeTitle = range.charAt(0).toUpperCase() + range.slice(1);
	let statementTitle;
	switch (statement) {
		case "income_statement":
			statementTitle = "Income Statement";
			break;

		case "balance_sheet":
			statementTitle = "Balance Sheet";
			break;

		case "cash_flow_statement":
			statementTitle = "Cash Flow Statement";
			break;

		case "ratios":
			statementTitle = "Ratios and Metrics";
			break;
	}

	return (
		<h1 className="text-2xl font-bold mb-3">
			{statementTitle} ({rangeTitle})
		</h1>
	);
}

function TableInfo() {
	const info = stockState((state) => state.info);
	const divider = financialsState((state) => state.divider);

	return (
		<div className="text-sm pb-1 text-gray-600">
			Numbers in {divider} {info.currency}. Fiscal year is {info.fiscal_year}
			.
		</div>
	);
}
