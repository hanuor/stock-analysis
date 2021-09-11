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

const columns = COLUMNS_MAP.map((column) => {
	// If column has a "format" property, use it to format the value
	if (column.format) {
		let cell;
		switch (column.format) {
			case 'linkSymbol': {
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
				cell = function FormatCell({ cell: { value } }: CellNumber) {
					return abbreviate(value, format2dec);
				};
				break;
			}

			case 'changePcColor': {
				cell = function FormatCell({ cell: { value } }: CellNumber) {
					const formatted = formatNum(value, format2dec) + '%';
					if (value > 0) {
						return <span className="text-[green]">{formatted}</span>;
					} else if (value < 0) {
						return <span className="text-[red]">{formatted}</span>;
					} else {
						return <span className="text-gray-800">{formatted}</span>;
					}
				};
				break;
			}

			case 'format2dec': {
				cell = function FormatCell({ cell: { value } }: CellNumber) {
					return formatNum(value, format2dec);
				};
				break;
			}

			case 'format0dec': {
				cell = function FormatCell({ cell: { value } }: CellNumber) {
					return formatNum(value, format0dec);
				};
				break;
			}

			default:
				cell = function FormatCell({ cell: { value } }: any) {
					return value;
				};
				break;
		}

		return {
			Header: column.Header,
			accessor: column.accessor,
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
