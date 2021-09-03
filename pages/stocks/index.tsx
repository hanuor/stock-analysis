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
	ind: string;
	mcap: number;
}

interface IStocks {
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

export default function StocksIndexPage({ stocks }: IStocks) {
	const columns: Column[] = [
		{
			Header: 'Symbol',
			accessor: 's',
			Cell: function FormatCell({ cell: { value } }: ICellString) {
				const symb = value.includes('.') ? value : `${value}/`;
				return (
					<Link href={`/stocks/${symb.toLowerCase()}`} prefetch={false}>
						<a>{value}</a>
					</Link>
				);
			},
			sortInverted: true,
		},
		{
			Header: 'Company Name',
			accessor: 'n',
			sortType: 'string'
		},
		{
			Header: 'Industry',
			accessor: 'i',
		},
		{
			Header: 'Market Cap',
			accessor: 'm',
			Cell: function FormatCell({ cell: { value } }: ICellNumber) {
				return abbreviate(value);
			},
			sortInverted: true,
		},
	];

	return (
		<LayoutSidebar heading="All Stock Symbols">
			<SEO
				title="List of All Stock Ticker Symbols"
				description="An overview of all the stock ticker symbols listed. Explore the stock pages to learn about the company’s price history, financials, key stats, and more."
				canonical="stocks/"
			/>
			<SymbolTable title="Stocks" columndata={columns} rowdata={stocks} />
		</LayoutSidebar>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const stocks = await getData('index?type=stockspage');

	return {
		props: {
			stocks,
		},
		revalidate: 6 * 60 * 60,
	};
};
