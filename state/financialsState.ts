import create from 'zustand';

interface FinancialsState {
	range: string;
	divider: string;
	leftRight: boolean;
	setRange: (newRange: string) => void;
	setDivider: (newDivider: string) => void;
	setLeftRight: (newLeftRight: boolean) => void;
}

export const financialsState = create<FinancialsState>((set) => ({
	range: 'annual',
	divider: 'millions',
	leftRight: false,
	setRange: (newRange) => set({ range: newRange }),
	setDivider: (newDivider) => set({ divider: newDivider }),
	setLeftRight: (newLeftRight) => set({ leftRight: newLeftRight }),
}));
