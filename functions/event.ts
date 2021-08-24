/**
 * This function triggers an event in Google Analytics
 * @param {string} category The event category
 * @param {string} label The event label
 */

export function event(category: string, label: string) {
	if (typeof window !== 'undefined') {
		window.gtag('event', 'click', {
			event_category: category,
			event_label: label,
		});
	}
}
