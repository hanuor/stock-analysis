import { screenerState } from 'components/StockScreener/screener.state';
import {
	CellString,
	CellNumber,
} from 'components/StockScreener/screener.types';
import Link from 'next/link';
import { abbreviate } from 'components/StockScreener/functions/abbreviate';
import { formatNum } from 'components/StockScreener/functions/formatNum';
import { ResultsTable } from './ResultsTable';
import { COLUMNS_MAP } from 'components/StockScreener/maps/tableColumns.map';

const format0dec = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
});

const format2dec = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

function formatHeader(text: string) {
	return <div className="ml-auto">{text}</div>;
}

const columns = COLUMNS_MAP.map((column) => {
	// If column has a "format" property, use it to format the value
	if (column.format) {
		let header;
		let cell;
		switch (column.format) {
			case 'linkSymbol': {
				header = column.Header;
				cell = function FormatCell({ cell: { value } }: CellString) {
					const symb = value.includes('.') ? value : `${value}/`;
					return (
						<Link href={`/stocks/${symb.toLowerCase()}`} prefetch={false}>
							<a>{value}</a>
						</Link>
					);
				};
				break;
			}

			case 'abbreviate': {
				header = formatHeader(column.Header);
				cell = function FormatCell({ cell: { value } }: CellNumber) {
					return (
						<div className="text-right">
							{abbreviate(value, format2dec)}
						</div>
					);
				};
				break;
			}

			case 'changePcColor': {
				header = formatHeader(column.Header);
				cell = function FormatCell({ cell: { value } }: CellNumber) {
					const formatted = formatNum(value, format2dec) + '%';
					if (value > 0) {
						return (
							<div className="text-right text-[green]">{formatted}</div>
						);
					} else if (value < 0) {
						return (
							<div className="text-right text-[red]">{formatted}</div>
						);
					} else {
						return (
							<div className="text-right text-gray-800">{formatted}</div>
						);
					}
				};
				break;
			}

			case 'format2dec': {
				header = formatHeader(column.Header);
				cell = function FormatCell({ cell: { value } }: CellNumber) {
					return (
						<div className="text-right">
							{formatNum(value, format2dec)}
						</div>
					);
				};
				break;
			}

			case 'format0dec': {
				header = formatHeader(column.Header);
				cell = function FormatCell({ cell: { value } }: CellNumber) {
					return (
						<div className="text-right">
							{formatNum(value, format0dec)}
						</div>
					);
				};
				break;
			}

			case 'amount': {
				header = formatHeader(column.Header);
				cell = function FormatCell({ cell: { value } }: CellNumber) {
					return (
						<div className="text-right">
							{formatNum(value, format2dec)}
						</div>
					);
				};
				break;
			}

			case 'align': {
				header = formatHeader(column.Header);
				cell = function FormatCell({ cell: { value } }: CellNumber) {
					return <div className="text-right">{value}</div>;
				};
				break;
			}

			case 'percentage': {
				header = formatHeader(column.Header);
				cell = function FormatCell({ cell: { value } }: CellNumber) {
					return (
						<div className="text-right">
							{formatNum(value, format2dec, '%')}
						</div>
					);
				};
				break;
			}

			default:
				header = column.Header;
				cell = function FormatCell({ cell: { value } }: any) {
					return value;
				};
				break;
		}

		return {
			Header: header,
			accessor: column.accessor,
			name: column.Header,
			Cell: cell,
		};
	}

	// If no format specified, just return plain Header/accessor pair
	return {
		Header: column.Header,
		accessor: column.accessor,
	};
});

export function ResultsBody() {
	const showColumns = screenerState((state) => state.showColumns);

	const displayColumns = columns.filter((column: any) =>
		showColumns.includes(column.accessor)
	);

	return <ResultsTable cols={displayColumns} />;
}