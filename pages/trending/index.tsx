import { GetStaticProps } from 'next';
import { TrendingAll } from 'types/Trending';
import { SEO } from 'components/SEO';
import { LayoutSidebar } from 'components/Layout/LayoutSidebar';
import { SymbolTableSimple } from 'components/Tables/SymbolTableSimple';
import { getData } from 'functions/API';
import { Column } from 'react-table';
import { StockLink } from 'components/Links';
import { abbreviate } from 'components/StockScreener/functions/abbreviate';

interface Props {
	timestamp: string;
	data: TrendingAll[];
}

interface CellString {
	cell: { value: string };
}

interface CellNumber {
	cell: { value: number };
}

export default function Trending({ timestamp, data }: Props) {
	const format0dec = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	const format2dec = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	const columns: Column[] = [
		{
			Header: 'No.',
			accessor: 'no',
		},
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
			Header: 'Views',
			accessor: 'pageviews',
			Cell: function FormatCell({ cell: { value } }: CellNumber) {
				return format0dec.format(value);
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
			Header: 'Price',
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
			Header: 'Change',
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
		{
			Header: 'Volume',
			accessor: 'volume',
			Cell: function FormatCell({ cell: { value } }: CellNumber) {
				return format0dec.format(value);
			},
			sortInverted: true,
		},
	];

	return (
		<>
			<LayoutSidebar heading="Trending Today" url="/trending/">
				<SEO
					title="Today's Top Trending Stocks"
					description="An overview of all the stock ticker symbols listed. Explore the stock pages to learn about the company’s price history, financials, key stats, and more."
					canonical="/trending/"
				/>
				<SymbolTableSimple
					title="Stocks"
					columndata={columns}
					rowdata={data}
				/>
				<div className="text-sm text-gray-700 mt-1.5">
					Updated: {timestamp}. Stocks are sorted by pageviews according to
					Google Analytics.
				</div>
			</LayoutSidebar>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const raw = await getData('trending?q=trendingAll');

	const { timestamp, data } = raw;

	if (data.length > 19) {
		data.splice(20, data.length - 20);
	}
	return {
		props: {
			timestamp,
			data,
		},
		revalidate: 30 * 60,
	};
};
