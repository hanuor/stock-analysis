import { GetStaticProps } from 'next';
import { TrendingAll } from 'types/Trending';
import { SEO } from 'components/SEO';
import { LayoutSidebar } from 'components/Layout/LayoutSidebar';
import { SymbolTable } from 'components/Tables/SymbolTable';
import { getData } from 'functions/API';
import { Column } from 'react-table';
import { StockLink } from 'components/Links';
import { abbreviate } from 'components/StockScreener/functions/abbreviate';

interface Props {
	trendingData: TrendingAll[];
}

interface CellString {
	cell: { value: string };
}

interface CellNumber {
	cell: { value: number };
}

export const Trending = ({ trendingData }: Props) => {
	const format2dec = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	const columns: Column[] = [
		{
			Header: 'Symbol',
			accessor: 'symbol',
			Cell: function DateCell({ cell: { value } }: CellString) {
				if (value.startsWith('=')) {
					return value.slice(1);
				}
				return <StockLink symbol={value} />;
			},
			sortType: (a, b) => {
				let ad = a.values.symbol;
				let bd = b.values.symbol;
				if (ad.startsWith('=')) {
					ad = ad.slice(1);
				}
				if (bd.startsWith('=')) {
					bd = bd.slice(1);
				}
				if (ad < bd) {
					return 1;
				}
				if (ad > bd) {
					return -1;
				} else {
					return 0;
				}
			},
			sortInverted: true,
		},
		{
			Header: 'Name',
			accessor: 'name',
			sortType: (a, b) => {
				const ad = a.values.name.toUpperCase();
				const bd = b.values.name.toUpperCase();
				if (ad < bd) {
					return 1;
				}
				if (ad > bd) {
					return -1;
				} else {
					return 0;
				}
			},
			sortInverted: true,
		},
		{
			Header: 'Market Cap',
			accessor: 'marketCap',
			Cell: function FormatCell({ cell: { value } }: CellNumber) {
				if (!value) {
					return 'n/a';
				}
				return abbreviate(value, format2dec);
			},
			sortInverted: true,
		},
		{
			Header: 'Pageviews',
			accessor: 'pageviews',
			sortInverted: true,
		},

		{
			Header: 'Stock Price',
			accessor: 'price',
			Cell: ({ cell: { value } }: CellNumber) => {
				if (!value) {
					return 'n/a';
				}
				return '$' + value.toFixed(2);
			},
			sortInverted: true,
		},

		{
			Header: 'Stock Change',
			accessor: 'change',
			sortType: 'alphanumeric',
			Cell: function FormatCell({ cell: { value } }: CellNumber) {
				const fixed = value ? value + '%' : 'n/a';

				if (value > 0) {
					return <span className="text-[green]">{fixed}</span>;
				} else if (value < 0) {
					return <span className="text-[red]">{fixed}</span>;
				} else {
					return <span className="text-gray-800">{fixed}</span>;
				}
			},
			sortInverted: true,
		},
	];

	return (
		<>
			<LayoutSidebar heading="Trending Symbols" url="/Trending/">
				<SEO
					title="List of All Stock Ticker Symbols"
					description="An overview of all the stock ticker symbols listed. Explore the stock pages to learn about the company’s price history, financials, key stats, and more."
					canonical="/trending/"
				/>
				<SymbolTable
					title="Symbols"
					columndata={columns}
					rowdata={trendingData}
				/>
			</LayoutSidebar>
		</>
	);
};

export default Trending;

export const getStaticProps: GetStaticProps = async () => {
	const trendingData = await getData('trending?q=trendingAll');

	if (trendingData.length > 19) {
		trendingData.splice(20, trendingData.length - 20);
	}
	return {
		props: {
			trendingData,
		},
		revalidate: 10 * 60,
	};
};
