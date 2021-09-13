// Format a number
export const formatNum = (num: number, formatter: Intl.NumberFormat) => {
	if (num === null) {
		return '-';
	}
	return formatter.format(num);
};
