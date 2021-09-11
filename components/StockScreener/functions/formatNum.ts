// Format a number
export const formatNum = (num: number, formatter: Intl.NumberFormat) => {
	return formatter.format(num);
};
