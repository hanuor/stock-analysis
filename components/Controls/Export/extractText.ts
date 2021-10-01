/**
 * This function extracts the text from table cell HTML when exporting. Either from the title tag or the inner text.
 * @param {string} value The value extracted from the table cell
 * @return {string | null}
 */
export function extractTextFromHTML(value: string): string | null {
	if (value.split('class=').length === 3) {
		return new DOMParser().parseFromString(value, 'text/html').documentElement
			.textContent;
	}
	if (value.includes('href=') || value.includes('class=')) {
		// Grab value between > and 2nd <
		const start = value.indexOf('>') + 1;
		const end = value.indexOf('<', 1);
		return value.substring(start, end);
	}
	if (value.includes('title=')) {
		// Grab value between double quotes
		const start = value.indexOf('"') + 1;
		const end = value.lastIndexOf('"');
		return value.substring(start, end);
	}
	return value;
}
