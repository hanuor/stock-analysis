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
import { MAP_BALANCE_SHEET } from 'data/financials/map_balance_sheet';

interface Props {
	info: Info;
	data: Financials;
}

const BalanceSheet = ({ info, data }: Props) => {
	const setInfo = stockState((state) => state.setInfo);
	const setStatement = financialsState((state) => state.setStatement);
	const setFinancialData = financialsState((state) => state.setFinancialData);

	useEffect(() => {
		setInfo(info);
		setStatement('balance_sheet');
		setFinancialData(data);
	}, [info, setInfo, data, setFinancialData, setStatement]);

	return (
		<Stock info={info}>
			<SEO
				title={`${info.name} (${info.ticker}) Balance Sheet`}
				description={`Detailed balance sheet for ${info.name} stock (${info.ticker}), including cash, debt, assets, liabilities, and book value.`}
				canonical={`stocks/${info.symbol}/financials/balance-sheet/`}
			/>
			<FinancialTable
				statement="balance_sheet"
				financialData={data}
				map={MAP_BALANCE_SHEET}
			/>
		</Stock>
	);
};
export default BalanceSheet;

interface IParams extends ParsedUrlQuery {
	symbol: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams;
	const { info, data } = await getStockFinancials('balance_sheet', symbol);

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
