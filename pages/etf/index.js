import LayoutSidebar from 'components/Layout/LayoutSidebar';
import Table from 'components/Tables/SymbolTable';
import { ETFLink } from 'components/Links';
import abbreviateNumber from 'functions/abbreviateNumber';

export default function StocksIndexPage({ stocks }) {
	const columns = [
		{
			Header: 'Symbol',
			accessor: 's',
			Cell: function FormatCell({ cell: { value } }) {
				return <ETFLink symbol={value} />;
			},
		},
		{
			Header: 'Fund Name',
			accessor: 'n',
			Cell: function FormatCell({ cell: { value } }) {
				return <span className="namecol">{value}</span>;
			},
		},
		{
			Header: 'Asset Class',
			accessor: 'cls',
		},
		{
			Header: 'Assets',
			accessor: 'aum',
			Cell: function FormatCell({ cell: { value } }) {
				return abbreviateNumber(value * 1000, 2, true);
			},
		},
	];

	return (
		<LayoutSidebar
			meta={{
				heading: 'All ETFs',
				title: 'List of ETF Symbols',
			}}>
			<Table title="ETFs" columndata={columns} rowdata={stocks} />
		</LayoutSidebar>
	);
}

export async function getStaticProps() {
	let API = process.env.API_URL || 'https://stockanalysis.com/wp-json/sa';
	const stocksList = await fetch(API + '/index?type=etfspage');
	const json = await stocksList.json();

	return {
		props: {
			stocks: json,
		},
		revalidate: 600,
	};
}
