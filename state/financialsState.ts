import create from 'zustand';

interface FinancialsState {
	range: string;
	divider: string;
	leftRight: string;
	reversed: boolean;
	setRange: (newRange: string) => void;
	setDivider: (newDivider: string) => void;
	setLeftRight: (newLeftRight: string) => void;
	setReversed: (newReversed: boolean) => void;
}

export const financialsState = create<FinancialsState>((set) => ({
	range: 'annual',
	divider: 'millions',
	leftRight: 'left',
	reversed: false,
	setRange: (newRange) => set({ range: newRange }),
	setDivider: (newDivider) => set({ divider: newDivider }),
	setLeftRight: (newLeftRight) => set({ leftRight: newLeftRight }),
	setReversed: (newReversed) => set({ reversed: newReversed }),
}));
