export const getPeriodLabel = (range: string) => {
	switch (range) {
		case 'annual':
			return 'Year';

		case 'quarterly':
			return 'Quarter Ended';

		case 'trailing':
			return 'Period Ended';

		default:
			return '';
	}
};

export const getPeriodTooltip = (range: string) => {
	switch (range) {
		case 'annual':
			return "The company's fiscal year, which is a 12-month financial reporting period. The fiscal year does not always match the calendar year.";

		case 'quarterly':
			return 'The end date of the fiscal quarter, which is a 3-month financial reporting period.';

		case 'trailing':
			return 'The end date of the preceding trailing twelve-month period.';

		default:
			return '';
	}
};

export const redOrGreen = (value: string, id: string) => {
	let change = parseFloat(value);
	if (id === 'shareschange') {
		change = change * -1;
	} // Inverse colors

	if (change > 0) {
		return 'text-green-700';
	} else if (change < 0) {
		return 'text-red-600';
	} else {
		return 'inherit';
	}
};

export const setBorder = (rowname: string) => {
	return rowname.includes('Growth') && '1px solid #CCC';
};

// Format the Y axis on hover charts
export const formatY = (value: number, format?: string) => {
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

interface FormatNumber {
	type: string;
	current: number;
	previous: number | null | string;
	revenue: number | null;
	divider: string;
}

// Format the number in the cells
export function formatNumber({
	type,
	current,
	previous,
	revenue,
	divider,
}: FormatNumber) {
	const numbersIn: number = getDivider(divider);
	const decimals = divider === 'raw' ? 3 : 2;

	switch (type) {
		case 'standard':
			return new Intl.NumberFormat('en-US', {
				maximumFractionDigits: 2,
			}).format(current / numbersIn);

		case 'reduce_precision': {
			if (current) {
				const rawnum: number | any = current / numbersIn;
				const num = rawnum.toFixed(0) * numbersIn;
				return new Intl.NumberFormat('en-US', {
					maximumFractionDigits: 2,
				}).format(num / numbersIn);
			}
			return '-';
		}

		case 'growth': {
			if (
				current &&
				previous &&
				typeof current === 'number' &&
				typeof previous === 'number' &&
				current > 0 &&
				previous > 0
			) {
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
				return current.toFixed(decimals);
			}
			return '-';
		}

		default:
			return '';
	}
}

export function formatYear(date: string | number) {
	const dateObject = new Date(date);
	let year = dateObject.getFullYear();
	const month = dateObject.getMonth();
	// If fiscal year ends in Jan-Mar, show year as previous

	if (month < 4) {
		year--;
	}
	return year;
}

export function countDecimals(value: string) {
	const float = parseFloat(value);
	if (Math.floor(float.valueOf()) === float.valueOf()) return 0;

	const str = value.toString();
	if (str.indexOf('.') !== -1 && str.indexOf('-') !== -1) {
		return str.split('-')[1] || 0;
	} else if (str.indexOf('.') !== -1) {
		return str.split('.')[1].length || 0;
	}
	return str.split('-')[1] || 0;
}

export function reducePrecisionFix(value: number) {
	if (value > 10000000 || value < -10000000) {
		const divided: number = value / 1000000;
		// divided = divided.toFixed(0);
		return new Intl.NumberFormat('en-US').format(divided);
	}
	return value;
}

// Show numbers in thousands, millions or raw
function getDivider(divider: string) {
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
