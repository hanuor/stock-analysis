import {
	ScreenerData,
	CellString,
} from 'components/StockScreener/screener.types';
import Link from 'next/link';
import { ResultsTable } from './ResultsTable';

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
	},
	{
		Header: 'PE Ratio',
		accessor: 'pe',
	},
];

export function ResultsBody({ stocks }: ScreenerData) {
	return <ResultsTable rowdata={stocks} cols={COLUMNS} />;
}
