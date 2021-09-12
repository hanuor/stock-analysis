import { screenerState } from 'components/StockScreener/screener.state';
import { ColumnId, ColumnName } from 'components/StockScreener/screener.types';
import { resultColumns } from 'components/StockScreener/maps/resultColumns.map';
import { getData } from 'functions/API';

type Props = {
	name: ColumnName;
};

export function ResultsMenuItem({ name }: Props) {
	const filters = screenerState((state) => state.filters);
	const resultsMenu = screenerState((state) => state.resultsMenu);
	const setResultsMenu = screenerState((state) => state.setResultsMenu);
	const setShowColumns = screenerState((state) => state.setShowColumns);
	const defaultColumns = screenerState((state) => state.defaultColumns);
	const fetchedColumns = screenerState((state) => state.fetchedColumns);
	const filteredColumns = screenerState((state) => state.filteredColumns);
	const addFetchedColumn = screenerState((state) => state.addFetchedColumn);
	const addDataColumn = screenerState((state) => state.addDataColumn);

	let display = name.toString();
	if (name === 'Filtered') {
		display = `${name} (${filters.length})`;
	}

	function fetchManyColumns(columns: ColumnId[]) {
		columns.forEach(async (columnId) => {
			if (!fetchedColumns.includes(columnId)) {
				addFetchedColumn(columnId);
				const fetched = await getData(`screener?type=${columnId}`);
				addDataColumn(fetched, columnId);
			}
		});
	}

	// When hovering over a results tab, fetch the required columns
	function handleHover(name: ColumnName) {
		if (name !== 'Filtered' && name !== 'General') {
			fetchManyColumns(resultColumns[name]);
		}
	}

	function handleFilter(name: ColumnName) {
		setResultsMenu(name);

		if (name === 'Filtered') {
			setShowColumns(filteredColumns);
		} else if (name === 'General') {
			setShowColumns(defaultColumns);
		} else {
			setShowColumns(resultColumns[name]);
		}
	}

	if (resultsMenu === name) {
		return (
			<li>
				<span className="active" data-title={display}>
					{display}
				</span>
			</li>
		);
	}

	return (
		<li>
			<span
				className="inactive"
				data-title={display}
				onClick={() => handleFilter(name)}
				onMouseOver={() => handleHover(name)}
			>
				{display}
			</span>
		</li>
	);
}
