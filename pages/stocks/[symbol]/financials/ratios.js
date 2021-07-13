import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import FinancialTable from 'components/FinancialTable/_FinancialTable';
import { getStockInfo, getStockFinancials } from 'functions/callBackEnd';
import { useEffect } from 'react';
import { stockState } from 'state/stockState';
import { financialsState } from 'state/financialsState';

export default function Ratios({ info, data }) {
	const setInfo = stockState((state) => state.setInfo);
	const setStatement = financialsState((state) => state.setStatement);
	const setFinancialData = financialsState((state) => state.setFinancialData);

	useEffect(() => {
		setInfo(info);
		setStatement('ratios');
		setFinancialData(data);
	}, [info, setInfo, data, setFinancialData, setStatement]);

	return (
		<Stock>
			<SEO
				title={`${info.name} (${info.ticker}) Financial Ratios and Metrics`}
				description={`Financial ratios and metrics for ${info.name} stock (${info.ticker}). Includes annual, quarterly and trailing numbers with full history and charts.`}
				canonical={`stocks/${info.symbol}/financials/ratios/`}
			/>
			<FinancialTable statement="ratios" financialData={data} />
		</Stock>
	);
}

export async function getStaticProps({ params }) {
	const info = await getStockInfo({ params });
	const data = await getStockFinancials('ratios', info.id);

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
