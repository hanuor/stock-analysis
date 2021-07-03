import Stock from 'components/Layout/StockLayout';
import FinancialTable from 'components/FinancialTable/_FinancialTable';
import { getPageData, getStockInfo } from 'functions/callBackEnd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { stockState } from 'state/stockState';
import { financialsState } from 'state/financialsState';

export default function FinancialsPage({ info, data }) {
	const setInfo = stockState((state) => state.setInfo);
	const setFinancialData = financialsState((state) => state.setFinancialData);

	useEffect(() => {
		setInfo(info);
		setFinancialData(data);
	}, [data, info, setFinancialData, setInfo]);

	const statement = financialsState((state) => state.statement);
	const setStatement = financialsState((state) => state.setStatement);

	const router = useRouter();
	useEffect(() => {
		const route = router.asPath;
		const split = route.split('/');
		const subpage = split[4] || 'income-statement';

		if (subpage !== statement) {
			switch (subpage) {
				case 'income-statement': {
					setStatement('income_statement');
					break;
				}

				case 'balance-sheet': {
					setStatement('balance_sheet');
					break;
				}

				case 'cash-flow-statement': {
					setStatement('cash_flow_statement');
					break;
				}

				case 'ratios': {
					setStatement('ratios');
					break;
				}
			}
		}
	});

	return (
		<Stock>
			<FinancialTable />
		</Stock>
	);
}

export async function getStaticProps({ params }) {
	const info = await getStockInfo({ params });
	const data = await getPageData(info.id, 'financials');

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
