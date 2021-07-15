import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import FinancialTable from 'components/FinancialTable/_FinancialTable';
import { getStockFinancials } from 'functions/callBackEnd';
import { useEffect } from 'react';
import { stockState } from 'state/stockState';
import { financialsState } from 'state/financialsState';
import { MAP_INCOME_STATEMENT } from 'data/financials/map_income_statement';

export default function IncomeStatement({ info, data }) {
	const setInfo = stockState((state) => state.setInfo);
	const setStatement = financialsState((state) => state.setStatement);
	const setFinancialData = financialsState((state) => state.setFinancialData);

	useEffect(() => {
		setInfo(info);
		setStatement('income_statement');
		setFinancialData(data);
	}, [info, setInfo, data, setFinancialData, setStatement]);

	return (
		<Stock>
			<SEO
				title={`${info.name} (${info.ticker}) Financial Statements: Income`}
				description={`Detailed financial statements for ${info.name} stock (${info.ticker}), including the income statement, balance sheet, and cash flow statement.`}
				canonical={`stocks/${info.symbol}/financials/`}
			/>
			<FinancialTable
				statement="income_statement"
				financialData={data}
				map={MAP_INCOME_STATEMENT}
			/>
		</Stock>
	);
}

export async function getStaticProps({ params }) {
	const { info, data } = await getStockFinancials(
		'income_statement',
		params.symbol
	);

	return {
		props: {
			info,
			data,
		},
		revalidate: 3600,
	};
}

export async function getStaticPaths() {
	return { paths: [], fallback: 'blocking' };
}
