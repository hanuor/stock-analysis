import { formatNumber } from './formatNumber';

export const abbreviateNumber = (num: number, dec = 2, noT = false) => {
	// for positive values
	if (num > 0) {
		if (!noT && num > 1000000000000) {
			return formatNumber(num / 1000000000000, dec, dec, 'T');
		}
		if (num > 1000000000) {
			return formatNumber(num / 1000000000, dec, dec, 'B');
		} else if (num > 1000000) {
			return formatNumber(num / 1000000, dec, dec, 'M');
		} else {
			return formatNumber(num, 0, 0, '');
		}
	}

	// for negative values
	else if (num < 0) {
		if (num < -1000000000) {
			return formatNumber(num / 1000000000, dec, dec, 'B');
		} else if (num < -1000000) {
			return formatNumber(num / 1000000, dec, dec, 'M');
		} else {
			return formatNumber(num, 0, 0, '');
		}
	}

	// if zero or null
	else {
		return 'n/a';
	}
};
