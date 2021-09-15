export function getFilterFromString(string: string) {
	const equalValue = string.charAt(0) === '=' ? true : false;
	const explode = string.split('-');
	const compareValue = explode[0] ?? null;
	const firstValue = explode[1] ? Number(explode[1]) : undefined;
	const secondValue = explode[2] ? Number(explode[2]) : undefined;

	return { compareValue, firstValue, secondValue, equalValue };
}
