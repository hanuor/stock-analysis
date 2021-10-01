export function decrementFilter(string: string) {
	let append = '';

	// Check if last character is K, M, B or T
	if (
		string.slice(-1) === 'K' ||
		string.slice(-1) === 'M' ||
		string.slice(-1) === 'B' ||
		string.slice(-1) === 'T'
	) {
		append = string.slice(-1);

		// Remove last character
		string = string.slice(0, -1);
	}

	return Number(string) - 1 + append;
}
