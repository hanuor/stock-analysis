import exportFromJSON from 'export-from-json';
import financialsState from 'state/financialsState';
import mapData from 'data/financials_map';
import useUserInfo from 'users/useUserInfo';
import { stockState } from 'state/stockState';
import { formatNumber } from './FinancialTable.functions';

const menuBtn = 'shadow-sm py-2 px-3 text-left bg-white hover:bg-gray-100';

export const ExportMenu = () => {
	const range = financialsState((state) => state.range);
	const statement = financialsState((state) => state.statement);
	const financialData = financialsState((state) => state.financialData);
	const info = stockState((state) => state.info);
	const leftRight = financialsState((state) => state.leftRight);
	const { isPro } = useUserInfo();

	// Map the data (the export-from-json library needs the data in a specific format)
	const exportData = (type) => {
		// Get the info required to map the data
		const rawdata =
			statement === 'ratios' && range === 'quarterly'
				? financialData.ratios.trailing
				: financialData[statement][range];

		const paywall = range === 'annual' ? 15 : 40;
		const fullcount = rawdata.datekey.length;
		const showcount = !isPro && fullcount > paywall ? paywall : fullcount; // How many data columns
		const DATA_MAP = mapData(statement);

		// Map the columns
		let dataColumns = leftRight ? [] : ['Indicator'];
		rawdata.datekey.map((cell) => {
			dataColumns.push(cell);
		});

		// Limit columns if paywalled
		if (fullcount > showcount) {
			dataColumns = dataColumns.slice(0, showcount);
		}

		if (leftRight) {
			dataColumns.push('Indicator');
			dataColumns = dataColumns.reverse();
		}

		const columns = dataColumns;

		// Map the rows
		const newArray = [];
		DATA_MAP.map((row) => {
			let newRow = leftRight ? [] : [row.title];
			const dataid = row.data || row.id;
			const format = row.format || 'standard';
			const offset = range === 'annual' ? 1 : 4;

			const rowdata = rawdata[dataid];
			const revenuedata = rawdata.revenue;

			rowdata.map((item, index) => {
				const prev = format === 'growth' ? rowdata[index + offset] : null;
				const rev = format === 'margin' ? revenuedata[index] : null;
				newRow.push(
					formatNumber({
						type: row.format || 'standard',
						current: item,
						previous: prev,
						revenue: rev,
						divider: 'raw',
					})
				);
			});

			// Limit columns if paywalled
			if (fullcount > showcount) {
				newRow = newRow.slice(0, showcount);
			}

			if (leftRight) {
				newRow.push(row.title);
				newRow = newRow.reverse();
			}

			const newObject = {};
			for (let i = 0; i < showcount + 1; i++) {
				newObject[columns[i]] = newRow[i];
			}

			newArray.push(newObject);
		});

		const data = newArray;
		const fileName = info.symbol + '-' + statement + '-' + range;
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
