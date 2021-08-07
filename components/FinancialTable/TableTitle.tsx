import { financialsState } from 'state/financialsState';

interface Props {
	statement: string;
	currency?: string;
	fiscalYear?: string;
}

export const TableTitle = ({ statement, currency, fiscalYear }: Props) => {
	return (
		<div>
			<TableHeader statement={statement} />
			{currency && fiscalYear && (
				<TableInfo
					statement={statement}
					currency={currency}
					fiscalYear={fiscalYear}
				/>
			)}
		</div>
	);
};

function TableHeader({ statement }: { statement: string }) {
	const range = financialsState((state) => state.range);

	const rangeTitle = range.charAt(0).toUpperCase() + range.slice(1);
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
		<h2 className="text-2xl font-bold mb-3">
			{statementTitle} ({rangeTitle})
		</h2>
	);
}

function TableInfo({ statement, currency, fiscalYear }: Props) {
	const divider = financialsState((state) => state.divider);
	const firstWord = statement === 'ratios' ? 'Market cap' : 'Financials';

	return (
		<div className="text-sm pb-1 text-gray-600">
			{`${firstWord} in ${divider} ${currency}. Fiscal year is ${fiscalYear}.`}
		</div>
	);
}
