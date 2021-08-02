import { FinancialReport } from 'types/Financials';
import { formatNumber } from 'functions/numbers/formatNumber';

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
export const formatY = (
	value: number,
	format?: string,
	ymin?: number,
	ymax?: number
) => {
	if (
		!format &&
		((ymax && (ymax > 10000000 || ymax < -10000000)) ||
			(ymin && (ymin > 10000000 || ymin < -10000000)))
	) {
		return formatNumber(value / 1000000, 0, 0);
	}

	if (
		format === 'reduce_precision' &&
		(value > 10000000 || value < -10000000)
	) {
		return formatNumber(value / 1000000, 0, 0); // new Intl.NumberFormat('en-US').format(value / 1000000);
	}

	if (format === 'growth' || format === 'margin') {
		return formatNumber(value, 0, 0, '%');
	}
	if (format === 'percentage') {
		return formatNumber(value, 0, 2, '%');
	}
	if (format === 'ratio' || format === 'pershare') {
		return formatNumber(value, 2, 2);
	}
	return value;
};

interface FormatCell {
	type: string;
	current: number;
	previous: number | null | string;
	revenue: number | null;
	divider: string;
}

// Format the number in the cells
export function formatCell({
	type,
	current,
	previous,
	revenue,
	divider,
}: FormatCell) {
	const numbersIn: number = getDivider(divider);
	const decimals = divider === 'raw' ? 3 : 2;

	switch (type) {
		case 'standard':
			return formatNumber(current / numbersIn, 0, 2);

		case 'reduce_precision': {
			if (current) {
				return formatNumber(current / numbersIn, 0, 0);
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

// Format the number in the cells
export function formatCellExport({
	type,
	current,
	previous,
	revenue,
	divider,
}: FormatCell) {
	const decimals = 3;

	switch (type) {
		case 'standard':
			return current;

		case 'reduce_precision': {
			if (current) {
				return current;
			}
			return;
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
				return parseFloat((current / previous - 1).toFixed(decimals));
			}
			return;
		}

		case 'margin': {
			if (current && revenue) {
				return parseFloat((current / revenue).toFixed(decimals));
			}
			return;
		}

		case 'percentage': {
			return current;
		}

		case 'pershare': {
			if (current) {
				return current;
			}
			return;
		}

		case 'ratio': {
			if (current) {
				return current;
			}
			return;
		}

		default:
			return;
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
		const divided = value / 1000000;
		return formatNumber(divided, 0, 0);
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

// Slice financial data if paywalled
export function sliceData(data: FinancialReport, showcount: number) {
	const sliced = {} as FinancialReport;

	Object.keys(data).forEach((key) => {
		sliced[key] = data[key].slice(0, showcount);
	});

	return sliced;
}

// Reverse left/right order of financial data
export function reverseData(data: FinancialReport) {
	const reversed = {} as FinancialReport;

	Object.keys(data).forEach((key) => {
		reversed[key] = data[key].reverse();
	});

	return reversed;
}
