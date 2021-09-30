export function fillNumber(abbr: string) {
	if (!abbr) {
		return '';
	}

	let str = abbr;
	str = str.replace('X', '-'); // X is a placeholder for the minus symbol
	str = str.replace('T', '000000000000');
	str = str.replace('B', '000000000');
	str = str.replace('M', '000000');
	str = str.replace('K', '000');
	return str;
}
