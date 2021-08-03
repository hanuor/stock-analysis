// Check if the current time is during trading hours (weekdays between 4:00 and 20:00)
export function isTradingHours() {
	const now = new Date().toLocaleString('en-US', {
		timeZone: 'America/New_York',
	});

	const US = new Date(now);

	const day = US.getDay();
	const hour = US.getHours();

	if (day === 0 || day === 6) {
		return false;
	}

	if (hour < 4 || hour > 20) {
		return false;
	}

	return true;
}
