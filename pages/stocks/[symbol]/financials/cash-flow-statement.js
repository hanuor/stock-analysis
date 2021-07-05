import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import FinancialTable from 'components/FinancialTable/_FinancialTable';
import { getStockInfo, getStockFinancials } from 'functions/callBackEnd';
import { useEffect } from 'react';
import { stockState } from 'state/stockState';
import { financialsState } from 'state/financialsState';

export default function CashFlowStatement({ info, data }) {
	const setInfo = stockState((state) => state.setInfo);
	const setStatement = financialsState((state) => state.setStatement);
	const setFinancialData = financialsState((state) => state.setFinancialData);

	useEffect(() => {
		setInfo(info);
		setStatement('cash_flow_statement');
		setFinancialData(data);
	}, [info, setInfo, data, setFinancialData, setStatement]);

	return (
		<Stock>
			<SEO
				title={`${info.name} (${info.ticker}) Cash Flow Statement`}
				description={`Detailed cash flow statements for ${info.name} stock (${info.ticker}), including operating cash flow, capex and free cash flow.`}
				canonical={`stocks/${info.symbol}/financials/cash-flow-statement/`}
			/>
			<FinancialTable statement="cash_flow_statement" financialData={data} />
		</Stock>
	);
}

export async function getStaticProps({ params }) {
	const info = await getStockInfo({ params });
	const data = await getStockFinancials('cash_flow_statement', info.id);

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
