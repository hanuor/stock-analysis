import { GetStaticProps } from 'next';
import { Column } from 'react-table';
import { LayoutSidebar } from 'components/Layout/LayoutSidebar';
import { SEO } from 'components/SEO';
import { SymbolTable } from 'components/Tables/SymbolTable';
import { StockLink } from 'components/Links';
import abbreviateNumber from 'functions/abbreviateNumber';

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
			Cell: function FormatCell({ cell: { value } }: ICellNumber) {
				return abbreviateNumber(value, 2, true);
			},
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
	const stocksList = await fetch(
		'https://stockanalysis.com/wp-json/sa/index?type=stockspage'
	);
	const json = await stocksList.json();

	return {
		props: {
			stocks: json,
		},
		revalidate: 2 * 60 * 60,
	};
};
