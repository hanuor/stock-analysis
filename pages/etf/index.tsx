import { GetStaticProps } from 'next';
import { Column } from 'react-table';
import { LayoutSidebar } from 'components/Layout/LayoutSidebar';
import { SEO } from 'components/SEO';
import { SymbolTable } from 'components/Tables/SymbolTable';
import { ETFLink } from 'components/Links';
import abbreviateNumber from 'functions/abbreviateNumber';

interface IStock {
	s: string;
	n: string;
	cls: string;
	aum: number;
}

interface IEtfs {
	stocks: IStock[];
}

interface ICellString {
	cell: {
		value: string;
	};
}

interface ICellNumber {
	cell: {
		value: number;
	};
}

export default function StocksIndexPage({ stocks }: IEtfs) {
	const columns: Column[] = [
		{
			Header: 'Symbol',
			accessor: 's',
			Cell: function FormatCell({ cell: { value } }: ICellString) {
				return <ETFLink symbol={value} />;
			},
		},
		{
			Header: 'Fund Name',
			accessor: 'n',
			Cell: function FormatCell({ cell: { value } }: ICellString) {
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
			Cell: function FormatCell({ cell: { value } }: ICellNumber) {
				return abbreviateNumber(value * 1000, 2, true);
			},
		},
	];

	return (
		<LayoutSidebar heading="All ETFs">
			<SEO
				title="List of ETF Symbols"
				description="An overview of the ETF symbols currently listed on the site. Explore the ETF pages to learn about the fund’s price history, key information and more."
				canonical="etf/"
			/>
			<SymbolTable title="ETFs" columndata={columns} rowdata={stocks} />
		</LayoutSidebar>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const stocksList = await fetch(
		'https://stockanalysis.com/wp-json/sa/index?type=etfspage'
	);
	const json = await stocksList.json();

	return {
		props: {
			stocks: json,
		},
		revalidate: 24 * 60 * 60,
	};
};
