import { screenerState } from 'components/StockScreener/screener.state';
import { FilterId } from '../screener.types';
import { getData } from 'functions/API';

export function useFetchColumns() {
	const fetchedColumns = screenerState((state) => state.fetchedColumns);
	const addFetchedColumn = screenerState((state) => state.addFetchedColumn);
	const addDataColumn = screenerState((state) => state.addDataColumn);

	async function fetchColumn(id: FilterId) {
		if (!fetchedColumns.includes(id)) {
			addFetchedColumn(id);
			const fetched = await getData(`screener?type=${id}`);
			addDataColumn(fetched, id);
		}
	}

	return fetchColumn;
}
