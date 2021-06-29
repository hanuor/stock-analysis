import exportFromJSON from 'export-from-json';
import financialsState from '@State/financialsState';
import mapData from '@Data/financials_data_map';
import useUserInfo from '@Firebase/useUserInfo';
import { stockState } from '@State/stockState';
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
	const Export = (type) => {
		// Get the info required to map the data
		const rawdata =
			statement === 'ratios' && range === 'quarterly'
				? financialData.ratios.trailing
				: financialData[statement][range];

		let paywall = range === 'annual' ? 15 : 40;
		const fullcount = rawdata.datekey.length;
		let showcount = !isPro && fullcount > paywall ? paywall : fullcount; // How many data columns
		const data_map = mapData(statement);

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
		let newArray = [];
		data_map.map((row) => {
			let newRow = leftRight ? [] : [row.title];
			let dataid = row.data || row.id;
			let format = row.format || 'standard';
			let offset = range === 'annual' ? 1 : 4;

			let rowdata = rawdata[dataid];
			let revenuedata = rawdata.revenue;

			rowdata.map((item, index) => {
				let prev = format === 'growth' ? rowdata[index + offset] : null;
				let rev = format === 'margin' ? revenuedata[index] : null;
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

			let newObject = {};
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
			<button className={menuBtn} onClick={() => Export('xls')}>
				Export to Excel
			</button>
			<button className={menuBtn} onClick={() => Export('csv')}>
				Export to CSV
			</button>
			<button className={menuBtn} onClick={() => Export('txt')}>
				Export to Text
			</button>
			<button className={menuBtn} onClick={() => Export('json')}>
				Export to JSON
			</button>
		</div>
	);
};
