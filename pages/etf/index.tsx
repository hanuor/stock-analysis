import { GetStaticProps } from 'next';
import { getData } from 'functions/API';
import { Column } from 'react-table';
import { LayoutSidebar } from 'components/Layout/LayoutSidebar';
import { SEO } from 'components/SEO';
import { SymbolTable } from 'components/Tables/SymbolTable';
import Link from 'next/link';

const formatter = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const abbreviate = (num: number) => {
	if (num > 1000000000) {
		return formatter.format(num / 1000000000) + 'B';
	} else if (num > 1000000) {
		return formatter.format(num / 1000000) + 'M';
	} else {
		return formatter.format(num);
	}
};

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
				return (
					<Link href={`/etf/${value.toLowerCase()}/`} prefetch={false}>
						<a>{value}</a>
					</Link>
				);
			},
		},
		{
			Header: 'Fund Name',
			accessor: 'n',
		},
		{
			Header: 'Asset Class',
			accessor: 'c',
		},
		{
			Header: 'Assets',
			accessor: 'a',
			Cell: function FormatCell({ cell: { value } }: ICellNumber) {
				return abbreviate(value * 1000);
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
	const etfs = await getData('index?type=etfspage');

	return {
		props: {
			stocks: etfs,
		},
		revalidate: 24 * 60 * 60,
	};
};
