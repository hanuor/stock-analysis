import create from "zustand";

export const financialsState = create((set) => ({
	statement: "income_statement",
	range: "annual",
	setStatement: (newStatement) => set({ statement: newStatement }),
	setRange: (newRange) => set({ range: newRange }),
}));
