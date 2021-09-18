import create from 'zustand';

interface ActionsState {
	all: boolean;
	filter: string;
	pos: number;
	isFiltered: boolean;
	setAll: (newAll: boolean) => void;
	setFilter: (newFilter: string) => void;
	setPos: (newPos: number) => void;
	setIsFiltered: (newIsFiltered: boolean) => void;
}

export const actionsState = create<ActionsState>((set) => ({
	pos: 0,
	all: false,
	filter: '',
	isFiltered: false,
	setAll: (newAll) => set({ all: newAll }),
	setFilter: (newFilter) => set({ filter: newFilter }),
	setPos: (newPos) => set({ pos: newPos }),
	setIsFiltered: (newIsFiltered) => set({ isFiltered: newIsFiltered }),
}));
