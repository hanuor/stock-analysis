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

interface Years {
	[key: string]: {
		[key: string]: number;
	};
}

export const makeYearArray = (years: Years, current: number) => {
	return Object.keys(years)
		.flatMap((year) => {
			return Number(year) < current - 2 && Number(year) > 1997 ? [year] : [];
		})
		.reverse();
};

export const leastMost = (years: any, current?: number) => {
	// iterate through object to find the smallest and largest value
	let smallest = Number.MAX_VALUE;
	let smallestYear = '';
	let largest = 0;
	let largestYear = '';

	Object.keys(years).forEach((year) => {
		if (Number(years[year]) < smallest && Number(year) !== current) {
			smallest = Number(years[year]);
			smallestYear = year;
		}
		if (Number(years[year]) > largest) {
			largest = Number(years[year]);
			largestYear = year;
		}
	});

	return {
		least: {
			key: smallestYear,
			value: smallest,
		},
		most: {
			key: largestYear,
			value: largest,
		},
	};
};

export const getFullMonth = (monthStr: string) => {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const date = new Date(`${monthStr}-06-01`);
	return months[date.getMonth()];
};
