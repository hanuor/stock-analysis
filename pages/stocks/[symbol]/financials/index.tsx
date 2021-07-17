import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Info } from 'types/Info';
import { Financials } from 'types/Financials';
import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { FinancialTable } from 'components/FinancialTable/_FinancialTable';
import { getStockFinancials } from 'functions/callBackEnd';
import { useEffect } from 'react';
import { stockState } from 'state/stockState';
import { financialsState } from 'state/financialsState';
import { MAP_INCOME_STATEMENT } from 'data/financials/map_income_statement';

interface Props {
	info: Info;
	data: Financials;
}

const IncomeStatement = ({ info, data }: Props) => {
	const setInfo = stockState((state) => state.setInfo);
	const setStatement = financialsState((state) => state.setStatement);
	const setFinancialData = financialsState((state) => state.setFinancialData);

	useEffect(() => {
		setInfo(info);
		setStatement('income_statement');
		setFinancialData(data);
	}, [info, setInfo, data, setFinancialData, setStatement]);

	return (
		<Stock info={info}>
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
};
export default IncomeStatement;

interface IParams extends ParsedUrlQuery {
	symbol: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams;
	const { info, data } = await getStockFinancials('income_statement', symbol);

	return {
		props: {
			info,
			data,
		},
		revalidate: 3600,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' };
};
