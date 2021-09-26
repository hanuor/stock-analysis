import create from 'zustand';
import { SingleStock, FilterId } from 'components/StockScreener/screener.types';
import { mergeColumns } from 'components/StockScreener/functions/mergeColumns';

interface ScreenerDataState {
	data: SingleStock[];
	setData: (data: SingleStock[]) => void;
	addDataColumn: (newColumn: SingleStock[], id: FilterId) => void;
	loaded: boolean;
	setLoaded: (loaded: boolean) => void;
	fullCount: number;
	setFullCount: (fullCount: number) => void;
}

export const screenerDataState = create<ScreenerDataState>((set) => ({
	// Data
	data: [],
	setData: (newData: SingleStock[]) =>
		set((state) => ({ ...state, data: newData })),
	addDataColumn: (newColumn: SingleStock[], id: FilterId) =>
		set((state) => ({
			data: mergeColumns(state.data, newColumn, id),
		})),
	loaded: false,
	setLoaded: (newLoaded: boolean) => set({ loaded: newLoaded }),
	fullCount: 0,
	setFullCount: (newFullCount: number) => set({ fullCount: newFullCount }),
}));
