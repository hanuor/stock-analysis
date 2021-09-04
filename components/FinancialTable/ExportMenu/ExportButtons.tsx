import ExcellentExport from 'excellentexport';

interface Props {
	symbol: string;
	statement: string;
	range: string;
	setExportOpen: (arg: boolean) => void;
}

export default function ExportButtons({
	statement,
	symbol,
	range,
	setExportOpen,
}: Props) {
	function executeExport(type: 'csv' | 'xls' | 'xlsx') {
		setExportOpen(false);
		const fileName = symbol + '-' + statement + '-' + range;

		return ExcellentExport.convert(
			{
				openAsDownload: true,
				filename: fileName,
				format: type,
			},
			[
				{
					name: symbol.toUpperCase(),
					from: { table: 'financial-table' },
					fixValue: (value, row, col) => {
						if (row === 0 && col !== 0) {
							return `${value}`;
						}
						if (col === 0) {
							return value.replace(/(<([^>]+)>)/gi, '');
						}
						if (value === '-') {
							return '';
						}
						value = value.match(/"([^"]*)"/)[1];
						if (value.includes(',')) {
							return parseFloat(value.replace(/,/g, ''));
						}
						if (value.includes('%')) {
							return parseFloat(value.replace(/%/, '')) / 100;
						}
						return parseFloat(value);
					},
				},
			]
		);
	}

	return (
		<>
			<button
				className="flex items-center justify-between shadow-sm py-2 px-3 text-left bg-white hover:bg-gray-100"
				onClick={() => executeExport('xlsx')}
				id="financials-export-excel"
			>
				Export to Excel
			</button>
			<button
				className="flex items-center justify-between shadow-sm py-2 px-3 text-left bg-white hover:bg-gray-100"
				onClick={() => executeExport('csv')}
				id="financials-export-csv"
			>
				Export to CSV
			</button>
		</>
	);
}
