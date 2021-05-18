import create from "zustand";

export const financialsState = create((set) => ({
	range: "annual",
	setRange: (newRange) => set({ range: newRange }),
}));
