import { screenerState } from 'components/StockScreener/screener.state';
import {
	CellString,
	CellNumber,
} from 'components/StockScreener/screener.types';
import Link from 'next/link';
import { abbreviate } from 'components/StockScreener/functions/abbreviate';
import { formatNum } from 'components/StockScreener/functions/formatNum';
import { ResultsTable } from './ResultsTable';

const format0dec = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
});

const format2dec = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const COLUMNS: any = [
	{
		Header: 'Symbol',
		accessor: 's',
		Cell: function FormatCell({ cell: { value } }: CellString) {
			const symb = value.includes('.') ? value : `${value}/`;
			return (
				<Link href={`/stocks/${symb.toLowerCase()}`} prefetch={false}>
					<a>{value}</a>
				</Link>
			);
		},
	},
	{
		Header: 'Company Name',
		accessor: 'n',
	},
	{
		Header: 'Market Cap',
		accessor: 'm',
		Cell: function FormatCell({ cell: { value } }: CellNumber) {
			return abbreviate(value, format2dec);
		},
	},
	{
		Header: 'Enterprise Value',
		accessor: 'ev',
	},
	{
		Header: 'Sector',
		accessor: 'sector',
	},
	{
		Header: 'Industry',
		accessor: 'i',
	},
	{
		Header: 'Exchange',
		accessor: 'exchange',
		show: false,
	},
	{
		Header: 'Price',
		accessor: 'p',
	},
	{
		Header: 'Change',
		accessor: 'c',
		Cell: ({ cell: { value } }: CellNumber) => {
			const formatted = formatNum(value, format2dec) + '%';
			if (value > 0) {
				return <span className="text-[green]">{formatted}</span>;
			} else if (value < 0) {
				return <span className="text-[red]">{formatted}</span>;
			} else {
				return <span className="text-gray-800">{formatted}</span>;
			}
		},
	},
	{
		Header: 'Volume',
		accessor: 'v',
		Cell: function FormatCell({ cell: { value } }: CellNumber) {
			return formatNum(value, format0dec);
		},
	},
	{
		Header: 'PE Ratio',
		accessor: 'pe',
		Cell: function FormatCell({ cell: { value } }: CellNumber) {
			return formatNum(value, format2dec);
		},
	},
	{
		Header: 'Country',
		accessor: 'country',
	},
	{
		Header: 'Employees',
		accessor: 'employees',
	},
	{
		Header: 'Founded',
		accessor: 'founded',
	},
	{
		Header: 'Ipo Date',
		accessor: 'ipoDate',
	},
	{
		Header: 'Revenue',
		accessor: 'revenue',
	},
	{
		Header: 'Net Income',
		accessor: 'netIncome',
	},
	{
		Header: 'EPS',
		accessor: 'eps',
	},
	{
		Header: 'Forward PE',
		accessor: 'fpe',
	},
	{
		Header: 'Price / Sales',
		accessor: 'ps',
	},
	{
		Header: 'Price / Book',
		accessor: 'pb',
	},
	{
		Header: 'Price / FCF',
		accessor: 'pfcf',
	},
];

export function ResultsBody() {
	const showColumns = screenerState((state) => state.showColumns);

	const displayColumns = COLUMNS.filter((column: any) =>
		showColumns.includes(column.accessor)
	);

	return <ResultsTable cols={displayColumns} />;
}
