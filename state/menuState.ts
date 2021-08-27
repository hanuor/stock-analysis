import create from 'zustand';

interface MenuState {
	pos: number;
	setPos: (newPos: number) => void;
}

export const menuState = create<MenuState>((set) => ({
	pos: 0,
	setPos: (newPos) => set({ pos: newPos }),
}));
