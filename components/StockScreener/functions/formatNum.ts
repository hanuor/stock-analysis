// Format a number
export const formatNum = (
	num: number,
	formatter: Intl.NumberFormat,
	append?: string
) => {
	if (num === null) {
		return '-';
	}
	if (append) {
		return formatter.format(num) + append;
	}
	return formatter.format(num);
};
