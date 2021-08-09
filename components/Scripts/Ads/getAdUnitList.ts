import { navState } from 'state/navState';

export const getAdUnitList = () => {
	const path = navState((state) => state.path);

	let ads: string[] = [];

	if (path.one === 'stocks' || path.one === 'etf') {
		if (!path.three) {
			ads = ['sidebar_1'];
		} else if (path.three && ['holdings', 'dividend'].includes(path.three)) {
			ads = [];
		} else if (path.three && ['financials', 'chart'].includes(path.three)) {
			ads = [];
		} else {
			ads = [];
		}
	} else if (path.one === 'ipos') {
		ads = [];
	} else if (path.one === '') {
		ads = [];
	}

	return ads;
};
