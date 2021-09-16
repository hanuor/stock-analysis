import create from 'zustand';
import {
	SingleStock,
	ColumnId,
	FilterValue,
} from 'components/StockScreener/screener.types';
import { mergeColumns } from 'components/StockScreener/functions/mergeColumns';

interface ScreenerState {
	data: SingleStock[];
	setData: (data: SingleStock[]) => void;
	addDataColumn: (newColumn: SingleStock[], columnId: ColumnId) => void;
	filters: FilterValue[];
	addFilter: (newFilter: FilterValue) => void;
	removeFilter: (filter: ColumnId) => void;

	// Filter menu
	filterMenu: string;
	setFilterMenu: (newMenu: string) => void;
	openFilter: ColumnId | '';
	setOpenFilter: (newFilter: ColumnId | '') => void;

	resultsMenu: string;
	setResultsMenu: (newMenu: string) => void;
	defaultColumns: ColumnId[];
	fetchedColumns: ColumnId[];
	showColumns: ColumnId[];
	filteredColumns: ColumnId[];
	addFetchedColumn: (newColumn: string) => void;
	addFilteredColumn: (newColumn: string) => void;
	removeFilteredColumn: (columns: string) => void;
	setShowColumns: (newColumns: ColumnId[]) => void;
	tablePage: number;
	setTablePage: (newTablePage: number) => void;
	tableSize: number;
	setTableSize: (tableSize: number) => void;
}

export const screenerState = create<ScreenerState>((set) => ({
	// Data
	data: [],
	setData: (newData: SingleStock[]) =>
		set((state) => ({ ...state, data: newData })),
	addDataColumn: (newColumn: SingleStock[], columnId: ColumnId) =>
		set((state) => ({
			data: mergeColumns(state.data, newColumn, columnId),
		})),

	// Filters
	filters: [],
	addFilter: (newFilter: FilterValue) =>
		set((state) => ({
			...state,
			filters: [...state.filters, newFilter],
		})),
	removeFilter: (filter: string) =>
		set((state) => ({
			...state,
			filters: state.filters.filter((f) => f.columnId !== filter),
		})),

	// Filter Menu
	filterMenu: 'Popular',
	setFilterMenu: (newMenu: string) => set({ filterMenu: newMenu }),
	openFilter: '', // The filter menu that is open
	setOpenFilter: (newFilter: ColumnId | '') => set({ openFilter: newFilter }),

	// Results Menu
	resultsMenu: 'General',
	setResultsMenu: (newMenu: string) => set({ resultsMenu: newMenu }),

	// Columns
	defaultColumns: ['s', 'n', 'm', 'p', 'c', 'i', 'v', 'pe'], // Loaded by default, shown under "General"
	fetchedColumns: ['s', 'n', 'm', 'p', 'c', 'i', 'v', 'pe'], // All data columns that have been fetched
	showColumns: ['s', 'n', 'm', 'p', 'c', 'i', 'v', 'pe'], // Columns that are currently showing
	filteredColumns: ['s', 'n'], // All data columns that are being filtered
	addFetchedColumn: (newColumn: any) =>
		set((state) => ({
			fetchedColumns: [...state.fetchedColumns, newColumn],
		})),
	addFilteredColumn: (newColumn: any) =>
		set((state) => ({
			filteredColumns: [...state.filteredColumns, newColumn],
		})),
	removeFilteredColumn: (column: any) =>
		set((state) => ({
			filteredColumns: state.filteredColumns.filter((c) => c !== column),
		})),
	setShowColumns: (newColumns) => set({ showColumns: newColumns }),

	// Pagination
	tablePage: 0,
	setTablePage: (newTablePage) => set({ tablePage: newTablePage }),
	tableSize: 20,
	setTableSize: (newTableSize) => set({ tableSize: newTableSize }),
}));
