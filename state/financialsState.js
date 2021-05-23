import create from "zustand";

export const financialsState = create((set) => ({
	statement: "income_statement",
	range: "annual",
	divider: "millions",
	leftRight: false,
	financialData: {},
	setStatement: (newStatement) => set({ statement: newStatement }),
	setRange: (newRange) => set({ range: newRange }),
	setDivider: (newDivider) => set({ divider: newDivider }),
	setLeftRight: (newLeftRight) => set({ leftRight: newLeftRight }),
	setFinancialData: (newFinancialData) =>
		set({ financialData: newFinancialData }),
}));
export default financialsState;
