import create from 'zustand';

export const navState = create((set) => ({
	path: {},
	setPath: (newPath) => set({ path: newPath }),
}));

export default navState;
