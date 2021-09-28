// Format and shorten a number and append B for billion, M for million
export function abbreviate(num: number, formatter: Intl.NumberFormat) {
	if (num >= 1000000000) {
		return formatter.format(num / 1000000000) + 'B';
	} else if (num >= 1000000) {
		return formatter.format(num / 1000000) + 'M';
	} else if (num > 1000) {
		return formatter.format(num / 1000) + 'K';
	} else if (num <= -1000000000) {
		return formatter.format(num / 1000000000) + 'B';
	} else if (num <= -1000000) {
		return formatter.format(num / 1000000) + 'M';
	} else if (num <= -1000) {
		return formatter.format(num / 1000) + 'K';
	} else {
		return formatter.format(num);
	}
}
