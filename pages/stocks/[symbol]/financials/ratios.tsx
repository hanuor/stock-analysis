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
import { MAP_RATIOS } from 'data/financials/map_ratios';

interface Props {
	info: Info;
	data: Financials;
}

const Ratios = ({ info, data }: Props) => {
	const setInfo = stockState((state) => state.setInfo);
	const setStatement = financialsState((state) => state.setStatement);
	const setFinancialData = financialsState((state) => state.setFinancialData);

	useEffect(() => {
		setInfo(info);
		setStatement('ratios');
		setFinancialData(data);
	}, [info, setInfo, data, setFinancialData, setStatement]);

	return (
		<Stock info={info}>
			<SEO
				title={`${info.name} (${info.ticker}) Financial Ratios and Metrics`}
				description={`Financial ratios and metrics for ${info.name} stock (${info.ticker}). Includes annual, quarterly and trailing numbers with full history and charts.`}
				canonical={`stocks/${info.symbol}/financials/ratios/`}
			/>
			<FinancialTable
				statement="ratios"
				financialData={data}
				map={MAP_RATIOS}
			/>
		</Stock>
	);
};
export default Ratios;

interface IParams extends ParsedUrlQuery {
	symbol: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams;
	const { info, data } = await getStockFinancials('ratios', symbol);

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
