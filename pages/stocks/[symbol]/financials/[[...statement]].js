import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
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

	const name = info.name;
	const ticker = info.ticker;

	let title;
	let description;
	let urlPath;
	switch (statement) {
		case 'income_statement': {
			title = `${name} (${ticker}) Financial Statements: Income`;
			description = `Detailed financial statements for ${name} stock (${ticker}), including the income statement, balance sheet, and cash flow statement.`;
			urlPath = '/';
			break;
		}

		case 'balance_sheet': {
			title = `${name} (${ticker}) Balance Sheet`;
			description = `Detailed balance sheet for ${name} stock (${ticker}), including cash, debt, assets, liabilities, and book value.`;
			urlPath = '/balance-sheet/';
			break;
		}

		case 'cash_flow_statement': {
			title = `${name} (${ticker}) Cash Flow Statement`;
			description = `Detailed cash flow statements for ${name} stock (${ticker}), including operating cash flow, capex and free cash flow.`;
			urlPath = '/cash-flow-statement/';
			break;
		}

		case 'ratios': {
			title = `${name} (${ticker}) Financial Ratios and Metrics`;
			description = `Financial ratios and metrics for ${name} stock (${ticker}). Includes annual, quarterly and trailing numbers with full history and charts.`;
			urlPath = '/ratios/';
			break;
		}
	}

	console.log(title);
	console.log(urlPath);

	return (
		<Stock>
			<SEO
				title={title}
				description={description}
				canonical={`stocks/${info.symbol}/financials${urlPath}`}
			/>
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
