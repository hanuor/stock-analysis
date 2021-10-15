import { Row } from 'react-table';

export const priceSort = (a: Row, b: Row, columnId: string, desc: boolean) => {
	const splitA = a.values.ipoPriceRange.split(/(\s+)/);
	const splitB = b.values.ipoPriceRange.split(/(\s+)/);

	let aNumber;
	let bNumber;

	if (splitA.length > 1) {
		aNumber =
			(Number(splitA[0].substring(1)) + Number(splitA[4].substring(1))) / 2;
	} else {
		if (a.values.ipoPriceRange == 'n/a') {
			aNumber = 0;
		} else {
			aNumber = Number(splitA[0].substring(1));
		}
	}

	if (splitB.length > 1) {
		bNumber =
			(Number(splitB[0].substring(1)) + Number(splitB[4].substring(1))) / 2;
	} else {
		if (b.values.ipoPriceRange == 'n/a') {
			bNumber = 0;
		} else {
			bNumber = Number(splitB[0].substring(1));
		}
	}

	if (aNumber > bNumber) {
		return -1;
	} else if (aNumber == bNumber) {
		return 0;
	} else return 1;
};

export const dateSort = (a: Row, b: Row, columnId: string, desc: boolean) => {
	const aDate = new Date(a.values.ipoDate);
	const bDate = new Date(b.values.ipoDate);
	if (aDate < bDate) {
		return -1;
	} else if (aDate > bDate) {
		return 1;
	}
	return 0;
};
