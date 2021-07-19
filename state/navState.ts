import create from 'zustand';

type PathObject = {
	one?: string | null;
	two?: string | null;
	three?: string | null;
	four?: string | null;
};

interface NavStateInterface {
	path: PathObject;
	setPath: (newPath: PathObject) => void;
}

export const navState = create<NavStateInterface>((set) => ({
	path: {},
	setPath: (newPath) => set({ path: newPath }),
}));
