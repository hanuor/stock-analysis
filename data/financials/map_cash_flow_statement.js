export default function cash_flow_statement() {
	const MAP = [
		{
			id: "netinc",
			data: "netinc",
			title: "Net Income",
			format: "standard",
		},
		{
			id: "depamor",
			data: "depamor",
			title: "Depreciation & Amortization",
			format: "standard",
		},
		{
			id: "sbcomp",
			data: "sbcomp",
			title: "Share-Based Compensation",
			format: "standard",
		},
		{
			id: "ncfo",
			data: "ncfo",
			title: "Operating Cash Flow",
			format: "standard",
		},
	];

	return MAP;
}
