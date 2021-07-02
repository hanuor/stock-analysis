import stockState from 'state/stockState';
import financialsState from 'state/financialsState';

export default function TableTitle({ empty }) {
	const statement = financialsState((state) => state.statement);

	return (
		<div>
			<TableHeader statement={statement} />
			{!empty && <TableInfo statement={statement} />}
		</div>
	);
}

function TableHeader({ statement }) {
	const range = financialsState((state) => state.range);

	let rangeTitle = range.charAt(0).toUpperCase() + range.slice(1);
	let statementTitle;
	switch (statement) {
		case 'income_statement':
			statementTitle = 'Income Statement';
			break;

		case 'balance_sheet':
			statementTitle = 'Balance Sheet';
			break;

		case 'cash_flow_statement':
			statementTitle = 'Cash Flow Statement';
			break;

		case 'ratios':
			statementTitle = 'Ratios and Metrics';
			break;
	}

	return (
		<h1 className="text-2xl font-bold mb-3">
			{statementTitle} ({rangeTitle})
		</h1>
	);
}

function TableInfo({ statement }) {
	const info = stockState((state) => state.info);
	const divider = financialsState((state) => state.divider);
	const firstWord = statement === 'ratios' ? 'Market cap' : 'Financials';

	return (
		<div className="text-sm pb-1 text-gray-600">
			{`${firstWord} in ${divider} ${info.currency}. Fiscal year is ${info.fiscal_year}.`}
		</div>
	);
}
