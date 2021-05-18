// Format the number in the cells
export function formatNumber({ type, current, previous, divider }) {
	const numbersIn = getDivider(divider);

	switch (type) {
		case "standard":
			return new Intl.NumberFormat("en-US").format(current / numbersIn);

		case "percentage":
			return ((current / previous - 1) * 100).toFixed(2) + "%";

		default:
			break;
	}
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
