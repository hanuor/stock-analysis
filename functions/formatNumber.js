// Format the number in the cells
export function formatNumber({ type, current, previous, divider }) {
	const numbersIn = getDivider(divider);

	switch (type) {
		case "standard":
			return new Intl.NumberFormat("en-US").format(current / numbersIn);

		case "reduce_precision": {
			if (current) {
				let num = (current / 1000).toFixed(0) * 1000;
				return new Intl.NumberFormat("en-US").format(num / numbersIn);
			}
			return "n/a";
		}

		case "percentage":
			return ((current / previous - 1) * 100).toFixed(2) + "%";

		case "ratio":
			return current.toFixed(2);

		default:
			break;
	}
}

export function formatDate(date, range) {
	if (range === "annual") {
		let dateObject = new Date(date);
		let year = dateObject.getFullYear();
		let month = dateObject.getMonth();
		if (month < 4) {
			// If fiscal year ends in Jan-Mar, show year as previous
			year--;
		}

		return year;
	}
	return date;
}

// Show numbers in thousands, millions or raw
function getDivider(divider) {
	switch (divider) {
		case "thousands":
			return 1000;

		case "millions":
			return 1000000;

		case "raw":
			return 1;
	}
	return 1000;
}
