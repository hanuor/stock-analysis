// todo: Make table paginated, sortable and filterable
// todo: Add more columns, such as industry and market cap

import LayoutSidebar from '@/Layout/LayoutSidebar';
import Table from '@/Tables/SymbolTable';
import StockLink from '@/components/Links';
import abbreviateNumber from '@/Functions/abbreviateNumber';

export default function StocksIndexPage({ stocks }) {
	const columns = [
		{
			Header: 'Symbol',
			accessor: 's',
			Cell: function FormatCell({ cell: { value } }) {
				return <StockLink symbol={value} />;
			},
		},
		{
			Header: 'Company Name',
			accessor: 'n',
		},
		{
			Header: 'Industry',
			accessor: 'ind',
		},
		{
			Header: 'Market Cap',
			accessor: 'mcap',
			Cell: function FormatCell({ cell: { value } }) {
				return abbreviateNumber(value, 2, true);
			},
		},
	];

	return (
		<LayoutSidebar
			meta={{
				heading: 'All Stock Symbols',
				title: 'List of All Stock Ticker Symbols',
			}}>
			<Table title="Stocks" columndata={columns} rowdata={stocks} />
		</LayoutSidebar>
	);
}

export async function getStaticProps() {
	let API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';
	const stocksList = await fetch(API + '/index?type=stockspage');
	const json = await stocksList.json();

	return {
		props: {
			stocks: json,
		},
		revalidate: 600,
	};
}
