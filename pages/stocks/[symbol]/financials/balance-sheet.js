import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import FinancialTable from 'components/FinancialTable/_FinancialTable';
import { getStockInfo, getStockFinancials } from 'functions/callBackEnd';
import { useEffect } from 'react';
import { stockState } from 'state/stockState';
import { financialsState } from 'state/financialsState';

export default function BalanceSheet({ info, data }) {
	const setInfo = stockState((state) => state.setInfo);
	const setStatement = financialsState((state) => state.setStatement);
	const setFinancialData = financialsState((state) => state.setFinancialData);

	useEffect(() => {
		setInfo(info);
		setStatement('balance_sheet');
		setFinancialData(data);
	}, [info, setInfo, data, setFinancialData, setStatement]);

	return (
		<Stock>
			<SEO
				title={`${info.name} (${info.ticker}) Balance Sheet`}
				description={`Detailed balance sheet for ${info.name} stock (${info.ticker}), including cash, debt, assets, liabilities, and book value.`}
				canonical={`stocks/${info.symbol}/financials/balance-sheet/`}
			/>
			<FinancialTable statement="balance_sheet" financialData={data} />
		</Stock>
	);
}

export async function getStaticProps({ params }) {
	const info = await getStockInfo({ params });
	const data = await getStockFinancials('balance_sheet', info.id);

	return {
		props: {
			info,
			data,
		},
		revalidate: 300,
	};
}

export async function getStaticPaths() {
	return { paths: [], fallback: 'blocking' };
}
