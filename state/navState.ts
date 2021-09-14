import create from 'zustand';

type PathObject = {
	one: string | null;
	two: string | null;
	three: string | null;
	four: string | null;
};

interface NavStateInterface {
	path: PathObject;
	setPath: (newPath: PathObject) => void;
	route: string;
	setRoute: (newRoute: string) => void;
	views: number;
	setViews: (newViews: number) => void;
}

export const navState = create<NavStateInterface>((set) => ({
	path: {} as PathObject,
	setPath: (newPath) => set({ path: newPath }),
	route: '',
	setRoute: (newRoute) => set({ route: newRoute }),
	views: 0,
	setViews: (newViews) => set({ views: newViews }),
}));
