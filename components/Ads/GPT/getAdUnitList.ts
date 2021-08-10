type PathObject = {
	one: string | null;
	two: string | null;
	three: string | null;
	four: string | null;
};

export const getAdUnitList = (path: PathObject) => {
	let ads: string[] = [];

	if (path.one === 'stocks' || path.one === 'etf') {
		if (!path.three) {
			ads = ['sidebar1', 'header', 'mobile1'];
		} else if (path.three && ['holdings', 'dividend'].includes(path.three)) {
			ads = ['header'];
		} else if (path.three && ['financials', 'chart'].includes(path.three)) {
			ads = ['header'];
		} else {
			ads = ['header'];
		}
	} else if (path.one === 'ipos') {
		ads = ['header'];
	} else if (path.one === null) {
		ads = [];
	}

	return ads;
};
