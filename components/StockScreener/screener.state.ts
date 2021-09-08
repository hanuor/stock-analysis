import create from 'zustand';
import { SingleStock } from 'components/StockScreener/screener.types';
import { mergeColumns } from 'components/StockScreener/screener.functions';

// Merge two arrays of objects by the 's' key
// const merge = (a: SingleStock[], b: SingleStock[]) => {
// 	console.log({ a });
// 	console.log({ b });
// 	const merged = a.map((item) => {
// 		const match = b.find((i) => i.s === item.s);
// 		return match ? { ...item, ...match } : item;
// 	});
// 	console.log(merged);
// 	return merged;
// };

interface ScreenerState {
	data: SingleStock[];
	setData: (data: SingleStock[]) => void;
	addDataColumn: (newColumn: SingleStock[], columnId: string) => void;
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
	addDataColumn: (newColumn: SingleStock[], columnId: string) =>
		set((state) => ({
			data: mergeColumns(state.data, newColumn, columnId),
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
