import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Info } from 'types/Info';
import { FinancialsType } from 'types/Financials';
import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { SubNavigation } from 'components/FinancialTable/SubNavigation';
import { FinancialTable } from 'components/FinancialTable/_FinancialTable';
import { getStockFinancials } from 'functions/callBackEnd';
import { MAP_CASH_FLOW_STATEMENT } from 'data/financials/map_cash_flow_statement';

interface Props {
	info: Info;
	data: FinancialsType;
}

export default function CashFlowStatement({ info, data }: Props) {
	return (
		<Stock info={info}>
			<SEO
				title={`${info.name} (${info.ticker}) Cash Flow Statement`}
				description={`Detailed cash flow statements for ${info.name} stock (${info.ticker}), including operating cash flow, capex and free cash flow.`}
				canonical={`stocks/${info.symbol}/financials/cash-flow-statement/`}
			/>
			<div className="px-4 lg:px-6 mx-auto">
				<SubNavigation
					symbol={info.symbol}
					statement="cash_flow_statement"
				/>
				<FinancialTable
					statement="cash_flow_statement"
					financials={data}
					map={MAP_CASH_FLOW_STATEMENT}
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
	const { info, data } = await getStockFinancials(
		'cash_flow_statement',
		symbol
	);

	if (info === 'redirect') {
		return {
			redirect: {
				destination: data,
				statusCode: 301,
			},
		};
	}

	const key = `${symbol}_cash_flow_statement`;

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
