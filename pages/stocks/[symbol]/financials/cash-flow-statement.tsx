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
import { MAP_CASH_FLOW_STATEMENT } from 'data/financials/map_cash_flow_statement';

interface Props {
	info: Info;
	data: Financials;
}

const CashFlowStatement = ({ info, data }: Props) => {
	const setInfo = stockState((state) => state.setInfo);
	const setStatement = financialsState((state) => state.setStatement);
	const setFinancialData = financialsState((state) => state.setFinancialData);

	useEffect(() => {
		setInfo(info);
		setStatement('cash_flow_statement');
		setFinancialData(data);
	}, [info, setInfo, data, setFinancialData, setStatement]);

	return (
		<Stock info={info}>
			<SEO
				title={`${info.name} (${info.ticker}) Cash Flow Statement`}
				description={`Detailed cash flow statements for ${info.name} stock (${info.ticker}), including operating cash flow, capex and free cash flow.`}
				canonical={`stocks/${info.symbol}/financials/cash-flow-statement/`}
			/>
			<FinancialTable
				statement="cash_flow_statement"
				financialData={data}
				map={MAP_CASH_FLOW_STATEMENT}
			/>
		</Stock>
	);
};
export default CashFlowStatement;

interface IParams extends ParsedUrlQuery {
	symbol: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams;
	const { info, data } = await getStockFinancials(
		'cash_flow_statement',
		symbol
	);

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
