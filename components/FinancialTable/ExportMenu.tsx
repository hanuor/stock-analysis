import { financialsState } from 'state/financialsState';
import ExcellentExport from 'excellentexport';
import { authState } from 'state/authState';

const menuBtn = 'shadow-sm py-2 px-3 text-left bg-white hover:bg-gray-100';

interface Props {
	statement: string;
	symbol: string;
	fullcount: number;
	showcount: number;
	setExportOpen: (arg: boolean) => void;
}

export const ExportMenu = ({
	statement,
	symbol,
	fullcount,
	showcount,
	setExportOpen,
}: Props) => {
	const range = financialsState((state) => state.range);
	const isPro = authState((state) => state.isPro);

	const period = range === 'annual' ? 'years' : 'quarters';
	const paywallMessage = `* Showing ${showcount} of ${fullcount} ${period}. Export the full financial history with a free trial of Stock Analysis Pro: https://stockanalysis.com/pro/`;

	const exp = (type: 'csv' | 'xls' | 'xlsx') => {
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
					fixArray: (array) => {
						if (!isPro && showcount < fullcount) {
							if (type == 'csv') {
								array[array.length] = [];
								array[array.length] = [paywallMessage];
							} else {
								array[3].push(['']);
								array[3].push(
									`* Showing ${showcount} of ${fullcount} ${period}.`
								);
								array[4].push(['']);
								array[5].push(['']);
								array[5].push(['Export the full financial history']);
								array[6].push(['']);
								array[6].push([
									'with a free trial of Stock Analysis Pro:',
								]);

								array[8].push(['']);
								array[8].push(['https://stockanalysis.com/pro/']);
							}
						}

						return array;
					},
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
	};

	return (
		<div className="absolute right-0 flex flex-col w-full shadow-lg border border-gray-200 rounded-md dropdown-menu">
			<button className={menuBtn} onClick={() => exp('xlsx')}>
				Export to Excel
			</button>
			<button className={menuBtn} onClick={() => exp('csv')}>
				Export to CSV
			</button>
		</div>
	);
};
export default ExportMenu;
