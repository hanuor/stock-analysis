import { formatNumber } from 'functions/numbers/formatNumber';

// sum of all values in an object with key as year
export const sumObjectValues = (obj: { [key: string]: number }) => {
	let sum = 0;
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			sum += obj[key];
		}
	}
	return formatNumber(sum, 0, 0);
};
