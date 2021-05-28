// todo: Make table paginated, sortable and filterable
// todo: Add more columns, such as industry and market cap

import Link from 'next/link';
import LayoutSidebar from '@/Layout/LayoutSidebar';
import Table from '@/Tables/TablePaginated';

export default function StocksIndexPage({ stocks }) {
	const columnHeaders = [
		{
			Header: 'Stock Symbol',
			accessor: 's',
			Cell: function SymbolCell({ cell: { value } }) {
				return <Link href={`/stocks/${value.toLowerCase()}`}>{value}</Link>;
			},
		},
		{
			Header: 'Company Name',
			accessor: 'n',
		},
	];

	return (
		<LayoutSidebar title="All Stocks">
			<Table columnHeaders={columnHeaders}>{stocks}</Table>
		</LayoutSidebar>
	);
}

export async function getStaticProps() {
	const stocksList = await fetch(process.env.API_URL + '/index?type=stocks');
	const json = await stocksList.json();

	return {
		props: {
			stocks: json,
		},
	};
}
