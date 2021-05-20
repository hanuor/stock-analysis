// Format the number in the cells
export function formatNumber({ type, current, previous, revenue, divider }) {
	const numbersIn = getDivider(divider);

	switch (type) {
		case "standard":
			return new Intl.NumberFormat("en-US").format(current / numbersIn);

		case "reduce_precision": {
			if (current) {
				let num = (current / numbersIn).toFixed(0) * numbersIn;
				return new Intl.NumberFormat("en-US").format(num / numbersIn);
			}
			return "-";
		}

		case "growth": {
			if (previous) {
				return ((current / previous - 1) * 100).toFixed(2) + "%";
			}
			return "-";
		}

		case "margin": {
			if (current && revenue) {
				return ((current / revenue) * 100).toFixed(2) + "%";
			}
			return "-";
		}

		case "percentage":
			return (current * 100).toFixed(2) + "%";

		case "pershare": {
			if (current) {
				return current.toFixed(2);
			}
			return "-";
		}

		case "ratio": {
			if (current) {
				return current.toFixed(2);
			}
			return "-";
		}

		default:
			break;
	}
}

export function formatDate(date) {
	let dateObject = new Date(date);
	let year = dateObject.getFullYear();
	let month = dateObject.getMonth();
	// If fiscal year ends in Jan-Mar, show year as previous

	if (month < 4) {
		year--;
	}
	return year;
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
