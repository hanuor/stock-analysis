export function fillNumber(abbr: string) {
	let str = abbr;
	str = str.replace('X', '-'); // X is a placeholder for the minus symbol
	str = str.replace('B', '000000000');
	str = str.replace('M', '000000');
	str = str.replace('K', '000');
	return str;
}
