export const getPeriodLabel = (range) => {
	switch (range) {
		case 'annual':
			return 'Year';

		case 'quarterly':
			return 'Quarter Ended';

		case 'trailing':
			return 'Period Ended';
	}
};

export const getPeriodTooltip = (range) => {
	switch (range) {
		case 'annual':
			return "The company's fiscal year, which is a 12-month financial reporting period. The fiscal year does not always match the calendar year.";

		case 'quarterly':
			return 'The end date of the fiscal quarter, which is a 3-month financial reporting period.';

		case 'trailing':
			return 'The end date of the preceding trailing twelve-month period.';
	}
};

export const redOrGreen = (value, id) => {
	let change = parseFloat(value);
	if (id === 'shareschange') {
		change = change * -1;
	} // Inverse colors

	if (change > 0) {
		return 'text-green-600';
	} else if (change < 0) {
		return 'text-red-500';
	} else {
		return 'inherit';
	}
};

export const setBorder = (rowname) => {
	return rowname.includes('Growth') && '1px solid #CCC';
};

// Format the Y axis on hover charts
export const formatY = (value, format) => {
	if (!format && (value > 10000000 || value < -10000000)) {
		return new Intl.NumberFormat('en-US').format(value / 1000000);
	}
	if (
		format === 'reduce_precision' &&
		(value > 10000000 || value < -10000000)
	) {
		return new Intl.NumberFormat('en-US').format(value / 1000000);
	}
	if (format === 'growth' || format === 'margin') {
		return value.toFixed(0) + '%';
	}
	if (format === 'ratio' || format === 'pershare') {
		return value.toFixed(2);
	}
	return value;
};

// Format the number in the cells
export function formatNumber({ type, current, previous, revenue, divider }) {
	const numbersIn = getDivider(divider);
	const decimals = divider === 'raw' ? 3 : 2;

	switch (type) {
		case 'standard':
			return new Intl.NumberFormat('en-US', {
				maximumFractionDigits: 2,
			}).format(current / numbersIn);

		case 'reduce_precision': {
			if (current) {
				let num = (current / numbersIn).toFixed(0) * numbersIn;
				return new Intl.NumberFormat('en-US', {
					maximumFractionDigits: 2,
				}).format(num / numbersIn);
			}
			return '-';
		}

		case 'growth': {
			if (current && previous && current > 0 && previous > 0) {
				return ((current / previous - 1) * 100).toFixed(decimals) + '%';
			}
			return '-';
		}

		case 'margin': {
			if (current && revenue) {
				return ((current / revenue) * 100).toFixed(2) + '%';
			}
			return '-';
		}

		case 'percentage': {
			return (current * 100).toFixed(decimals) + '%';
		}

		case 'pershare': {
			if (current) {
				return current.toFixed(decimals);
			}
			return '-';
		}

		case 'ratio': {
			if (current) {
				return parseFloat(current).toFixed(decimals);
			}
			return '-';
		}

		default:
			break;
	}
}

export function formatYear(date) {
	let dateObject = new Date(date);
	let year = dateObject.getFullYear();
	let month = dateObject.getMonth();
	// If fiscal year ends in Jan-Mar, show year as previous

	if (month < 4) {
		year--;
	}
	return year;
}

// Show numbers in thousands, millions or raw
function getDivider(divider) {
	switch (divider) {
		case 'thousands':
			return 1000;

		case 'millions':
			return 1000000;

		case 'raw':
			return 1;
	}
	return 1000;
}
