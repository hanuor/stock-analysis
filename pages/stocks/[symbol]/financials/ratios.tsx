import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Info } from 'types/Info';
import { Financials } from 'types/Financials';
import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { SubNavigation } from 'components/FinancialTable/SubNavigation';
import { FinancialTable } from 'components/FinancialTable/_FinancialTable';
import { getStockFinancials } from 'functions/callBackEnd';
import { MAP_RATIOS } from 'data/financials/map_ratios';

interface Props {
	info: Info;
	data: Financials;
}

export default function Ratios({ info, data }: Props) {
	return (
		<Stock info={info}>
			<SEO
				title={`${info.name} (${info.ticker}) Financial Ratios and Metrics`}
				description={`Financial ratios and metrics for ${info.name} stock (${info.ticker}). Includes annual, quarterly and trailing numbers with full history and charts.`}
				canonical={`stocks/${info.symbol}/financials/ratios/`}
			/>
			<div className="px-4 lg:px-6 mx-auto">
				<SubNavigation symbol={info.symbol} statement="ratios" />
				<FinancialTable
					statement="ratios"
					financialData={data}
					map={MAP_RATIOS}
					info={info}
				/>
			</div>
		</Stock>
	);
}

interface IParams extends ParsedUrlQuery {
	symbol: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams;
	const { info, data } = await getStockFinancials('ratios', symbol);
	const key = `${symbol}_ratios`;

	return {
		props: {
			key: key,
			info,
			data,
		},
		revalidate: 3600,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' };
};
