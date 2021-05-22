import create from "zustand";

export const stockState = create((set) => ({
	info: {},
	data: {},
	setInfo: (newInfo) => set({ info: newInfo }),
	setData: (newData) => set({ data: newData }),
}));
export default stockState;
