export const getTitle = (statement, range) => {
	let rangeTitle = range.charAt(0).toUpperCase() + range.slice(1);

	switch (statement) {
		case "balance_sheet":
			return `Balance Sheet (${rangeTitle})`;

		case "cash_flow_statement":
			return `Cash Flow Statement (${rangeTitle})`;

		case "ratios":
			return `Ratios and Metrics (${rangeTitle})`;

		default:
			return `Income Statement (${rangeTitle})`;
	}
};

export const redOrGreen = (value, id) => {
	let change = parseFloat(value);
	if (id === "shareschange") {
		change = change * -1;
	} // Inverse colors

	if (change > 0) {
		return "text-green-600";
	} else if (change < 0) {
		return "text-red-500";
	} else {
		return "inherit";
	}
};

export const setBorder = (rowname) => {
	return rowname.includes("Growth") && "1px solid #CCC";
};

// Format the Y axis on hover charts
export const formatY = (value, format) => {
	if (!format && value > 10000000) {
		return new Intl.NumberFormat("en-US").format(value / 1000000);
	}
	if (format === "growth" || format === "margin") {
		return value.toFixed(0) + "%";
	}
	if (format === "ratio" || format === "pershare") {
		return value.toFixed(2);
	}
	return value;
};
