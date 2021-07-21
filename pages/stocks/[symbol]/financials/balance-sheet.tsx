import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Info } from 'types/Info';
import { FinancialsType } from 'types/Financials';
import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { SubNavigation } from 'components/FinancialTable/SubNavigation';
import { FinancialTable } from 'components/FinancialTable/_FinancialTable';
import { getStockFinancials } from 'functions/callBackEnd';
import { MAP_BALANCE_SHEET } from 'data/financials/map_balance_sheet';

interface Props {
	info: Info;
	data: FinancialsType;
}

export default function BalanceSheet({ info, data }: Props) {
	return (
		<Stock info={info}>
			<SEO
				title={`${info.name} (${info.ticker}) Balance Sheet`}
				description={`Detailed balance sheet for ${info.name} stock (${info.ticker}), including cash, debt, assets, liabilities, and book value.`}
				canonical={`stocks/${info.symbol}/financials/balance-sheet/`}
			/>
			<div className="px-4 lg:px-6 mx-auto">
				<SubNavigation symbol={info.symbol} statement="balance_sheet" />
				<FinancialTable
					statement="balance_sheet"
					financials={data}
					map={MAP_BALANCE_SHEET}
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
	const { info, data } = await getStockFinancials('balance_sheet', symbol);
	const key = `${symbol}_balance_sheet`;

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