/**
 * This function triggers an event in Google Analytics
 * @param {string} category The event category
 * @param {string} label The event label
 */

export function event(category: string, label: string) {
	console.log({ label });
	gtag('event', 'click', {
		event_category: category,
		event_label: label,
	});
}
