import create from 'zustand';

interface ActionsState {
	all: boolean;
	setAll: (newAll: boolean) => void;
}

export const actionsState = create<ActionsState>((set) => ({
	all: false,
	setAll: (newAll) => set({ all: newAll }),
}));
