export const getAdUnitList = (path) => {
	let ads = [];

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
	} else if (path.one === '') {
		ads = ['header'];
	}

	return ads;
};
