export function changeColor(change?: number) {
	if (change && change > 0) {
		return 'green-quote';
	} else if (change && change < 0) {
		return 'text-red-600';
	} else {
		return 'text-gray-800';
	}
}
