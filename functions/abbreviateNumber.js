function formatNum(num, dec, append) {
	return (
		new Intl.NumberFormat('en-US', {
			minimumFractionDigits: dec,
			maximumFractionDigits: dec,
		}).format(num) + append
	);
}

export default function abbreviateNumber(num, dec = 2, noT = false) {
	// for positive values
	if (num > 0) {
		if (!noT && num > 1000000000000) {
			return formatNum(num / 1000000000000, dec, 'T');
		}
		if (num > 1000000000) {
			return formatNum(num / 1000000000, dec, 'B');
		} else if (num > 1000000) {
			return formatNum(num / 1000000, dec, 'M');
		} else {
			return formatNum(num, 0, '');
		}
	}

	// for negative values
	else if (num < 0) {
		if (num < -1000000000) {
			return formatNum(num / 1000000000, dec, 'B');
		} else if (num < -1000000) {
			return formatNum(num / 1000000, dec, 'M');
		} else {
			return formatNum(num, 0, '');
		}
	}

	// if zero or null
	else {
		return 'n/a';
	}
}
