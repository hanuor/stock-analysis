import create from 'zustand';
import { Info } from 'types/Info';

interface StockState {
	info: Info;
	data: object;
	quote: object | null;
	setInfo: (newInfo: Info) => void;
	setData: (newData: object) => void;
	setQuote: (newQuote: object | null) => void;
}

export const stockState = create<StockState>((set) => ({
	info: {} as Info,
	data: {},
	quote: null,
	setInfo: (newInfo) => set({ info: newInfo }),
	setData: (newData) => set({ data: newData }),
	setQuote: (newQuote) => set({ quote: newQuote }),
}));
export default stockState;
