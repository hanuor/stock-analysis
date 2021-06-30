import create from 'zustand';

export const stockState = create((set) => ({
	info: {},
	data: {},
	quote: null,
	setInfo: (newInfo) => set({ info: newInfo }),
	setData: (newData) => set({ data: newData }),
	setQuote: (newQuote) => set({ quote: newQuote }),
}));
export default stockState;
