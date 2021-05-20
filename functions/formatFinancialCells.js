export const redOrGreen = (rowname, value) => {
	if (rowname.includes("Growth")) {
		let change = parseFloat(value);

		if (change > 0) {
			return "green";
		} else if (change < 0) {
			return "red";
		} else {
			return "inherit";
		}
	}
};

export const setBorder = (rowname) => {
	return rowname.includes("Growth") && "1px solid #CCC";
};
