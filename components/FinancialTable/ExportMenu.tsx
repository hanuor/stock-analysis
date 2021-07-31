import {
	FinancialsMapType,
	FinancialsType,
	FinancialReport,
} from 'types/Financials';
import exportFromJSON, { ExportType } from 'export-from-json';
import { financialsState } from 'state/financialsState';
import { authState } from 'state/authState';
import { formatCellExport } from './FinancialTable.functions';

const menuBtn = 'shadow-sm py-2 px-3 text-left bg-white hover:bg-gray-100';

interface Props {
	map: FinancialsMapType[];
	financials: FinancialsType;
	statement: string;
	symbol: string;
}

export const ExportMenu = ({ map, financials, statement, symbol }: Props) => {
	const range = financialsState((state) => state.range);
	const leftRight = financialsState((state) => state.leftRight);
	const isPro = authState((state) => state.isPro);

	// Map the data (the export-from-json library needs the data in a specific format)
	const exportData = (type: ExportType) => {
		const rawdata = financials[range as keyof FinancialsType];

		const paywall = range === 'annual' ? 10 : 40;
		const fullcount = rawdata.datekey.length;
		const showcount = !isPro && fullcount > paywall ? paywall : fullcount; // How many data columns
		const DATA_MAP = map;

		// Map the columns
		let dataColumns = leftRight ? [] : ['Indicator'];
		rawdata.datekey.map((cell) => {
			dataColumns.push(cell);
		});

		// Limit columns if paywalled
		if (fullcount > showcount) {
			dataColumns = dataColumns.slice(0, showcount + 1);
		}

		if (leftRight) {
			dataColumns.push('Indicator');
			dataColumns = dataColumns.reverse();
		}

		const columns = dataColumns;

		// Map the rows
		const newArray: object[] = [];
		DATA_MAP.map((row) => {
			let newRow: any[] = leftRight ? [] : [row.title];
			const dataid = row.data || row.id;
			const format = row.format || 'standard';
			const offset = range === 'annual' ? 1 : 4;

			const rowdata = rawdata[dataid as keyof FinancialReport];

			if (rowdata) {
				const revenuedata = rawdata.revenue;

				rowdata.map((item, index) => {
					const prev =
						format === 'growth' ? rowdata[index + offset] : null;
					const rev = format === 'margin' ? revenuedata[index] : null;
					const current = item as number;

					newRow.push(
						formatCellExport({
							type: row.format || 'standard',
							current: current,
							previous: prev,
							revenue: rev,
							divider: 'raw',
						})
					);
				});

				// Limit columns if paywalled
				if (fullcount > showcount) {
					newRow = newRow.slice(0, showcount + 1);
				}

				if (leftRight) {
					newRow.push(row.title);
					newRow = newRow.reverse();
				}

				interface RowData {
					[key: string]: string;
				}

				const newObject: RowData = {};
				for (let i = 0; i < showcount + 1; i++) {
					newObject[columns[i] as keyof RowData] = newRow[i];
				}

				newArray.push(newObject);
			}
		});

		const data = newArray;
		const fileName = symbol + '-' + statement + '-' + range;
		const exportType = type;
		exportFromJSON({ data, fileName, exportType });
	};

	return (
		<div className="absolute right-0 flex flex-col w-full shadow-lg border border-gray-200 rounded-md dropdown-menu">
			<button className={menuBtn} onClick={() => exportData('xls')}>
				Export to Excel
			</button>
			<button className={menuBtn} onClick={() => exportData('csv')}>
				Export to CSV
			</button>
			<button className={menuBtn} onClick={() => exportData('txt')}>
				Export to Text
			</button>
			<button className={menuBtn} onClick={() => exportData('json')}>
				Export to JSON
			</button>
		</div>
	);
};
