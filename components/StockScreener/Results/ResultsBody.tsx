import {
	ScreenerData,
	CellString,
	CellNumber,
} from 'components/StockScreener/screener.types';
import Link from 'next/link';
import { abbreviate } from 'components/StockScreener/screener.functions';
import { ResultsTable } from './ResultsTable';

const formatter = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const COLUMNS = [
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
		Header: 'Price',
		accessor: 'p',
	},
	{
		Header: 'Change',
		accessor: 'c',
	},
	{
		Header: 'Volume',
		accessor: 'v',
	},
	{
		Header: 'Industry',
		accessor: 'i',
	},
	{
		Header: 'Market Cap',
		accessor: 'm',
		Cell: function FormatCell({ cell: { value } }: CellNumber) {
			return abbreviate(value, formatter);
		},
	},
	{
		Header: 'PE Ratio',
		accessor: 'pe',
	},
];

export function ResultsBody({ stocks }: ScreenerData) {
	return <ResultsTable rowdata={stocks} cols={COLUMNS} />;
}
