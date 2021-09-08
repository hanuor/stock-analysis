import create from 'zustand';
import {
	SingleStock,
	ColumnId,
	FilterValue,
} from 'components/StockScreener/screener.types';
import { mergeColumns } from 'components/StockScreener/screener.functions';

interface ScreenerState {
	data: SingleStock[];
	setData: (data: SingleStock[]) => void;
	addDataColumn: (newColumn: SingleStock[], columnId: ColumnId) => void;
	filters: FilterValue[];
	addFilter: (filter: ColumnId, value: string) => void;
	removeFilter: (filter: string) => void;
	tablePage: number;
	setTablePage: (newTablePage: number) => void;
	tableSize: number;
	setTableSize: (tableSize: number) => void;
	showColumns: string[];
	addColumn: (newColumn: string) => void;
	removeColumn: (columns: string) => void;
	setShowColumns: (newColumns: string[]) => void;
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
	addFilter: (newFilter: ColumnId, value: string) =>
		set((state) => ({
			...state,
			filters: [...state.filters, { column: newFilter, value: value }],
		})),
	removeFilter: (filter: string) =>
		set((state) => ({
			...state,
			filters: state.filters.filter((f) => f.column !== filter),
		})),

	// Pagination
	tablePage: 0,
	setTablePage: (newTablePage) => set({ tablePage: newTablePage }),
	tableSize: 25,
	setTableSize: (newTableSize) => set({ tableSize: newTableSize }),

	// Columns
	showColumns: ['s', 'n', 'm', 'p', 'c', 'i', 'v', 'pe'],
	addColumn: (newColumn: any) =>
		set((state) => ({
			showColumns: [...state.showColumns, newColumn],
		})),
	removeColumn: (column: any) =>
		set((state) => ({
			showColumns: state.showColumns.filter((c) => c !== column),
		})),
	setShowColumns: (newColumns) => set({ showColumns: newColumns }),
}));
