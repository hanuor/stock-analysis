import create from 'zustand';

interface FinancialsState {
	statement: string;
	range: string;
	divider: string;
	leftRight: boolean;
	financialData: object;
	setStatement: (newStatement: string) => void;
	setRange: (newRange: string) => void;
	setDivider: (newDivider: string) => void;
	setLeftRight: (newLeftRight: boolean) => void;
	setFinancialData: (newFinancialData: object) => void;
}

export const financialsState = create<FinancialsState>((set) => ({
	statement: '',
	range: 'annual',
	divider: 'millions',
	leftRight: false,
	financialData: {},
	setStatement: (newStatement) => set({ statement: newStatement }),
	setRange: (newRange) => set({ range: newRange }),
	setDivider: (newDivider) => set({ divider: newDivider }),
	setLeftRight: (newLeftRight) => set({ leftRight: newLeftRight }),
	setFinancialData: (newFinancialData) =>
		set({ financialData: newFinancialData }),
}));
