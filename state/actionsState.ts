import create from 'zustand';

interface ActionsState {
	all: boolean;
	filter: string;
	setAll: (newAll: boolean) => void;
	setFilter: (newFilter: string) => void;
}

export const actionsState = create<ActionsState>((set) => ({
	all: false,
	filter: '',
	setAll: (newAll) => set({ all: newAll }),
	setFilter: (newFilter) => set({ filter: newFilter }),
}));
