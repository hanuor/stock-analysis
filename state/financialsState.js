import create from "zustand";

export const financialsState = create((set) => ({
	statement: "income_statement",
	range: "annual",
	divider: "millions",
	financialData: {},
	setStatement: (newStatement) => set({ statement: newStatement }),
	setRange: (newRange) => set({ range: newRange }),
	setDivider: (newDivider) => set({ divider: newDivider }),
	setFinancialData: (newFinancialData) =>
		set({ financialData: newFinancialData }),
}));
export default financialsState;
