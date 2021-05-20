export default function cash_flow_statement() {
	const MAP = [
		{
			id: "netinc",
			title: "Net Income",
		},
		{
			id: "depamor",
			title: "Depreciation & Amortization",
		},
		{
			id: "sbcomp",
			title: "Share-Based Compensation",
		},
		{
			id: "otheroperating",
			title: "Other Operating Activities",
		},
		{
			id: "ncfo",
			title: "Operating Cash Flow",
		},
		{
			id: "capex",
			title: "Capital Expenditures",
		},
		{
			id: "ncfbus",
			title: "Acquisitions",
		},
		{
			id: "ncfinv",
			title: "Change in Investments",
		},
		{
			id: "otherinvesting",
			title: "Other Investing Activities",
		},
		{
			id: "ncfi",
			title: "Investing Cash Flow",
		},
		{
			id: "ncfdiv",
			title: "Dividends Paid",
		},
		{
			id: "ncfcommon",
			title: "Share Issuance / Repurchase",
		},
		{
			id: "ncfdebt",
			title: "Debt Issued / Paid",
		},
		{
			id: "otherfinancing",
			title: "Other Financing Activities",
		},
		{
			id: "ncff",
			title: "Financing Cash Flow",
		},
		{
			id: "ncf",
			title: "Net Cash Flow",
		},
		{
			id: "fcf",
			title: "Free Cash Flow",
		},
		{
			id: "fcfgrowth",
			data: "fcf",
			title: "Free Cash Flow Growth",
			format: "growth",
		},
		{
			id: "fcfmargin",
			data: "fcf",
			title: "Free Cash Flow Margin",
			format: "margin",
		},
		{
			id: "fcfps",
			title: "Free Cash Flow Per Share",
			format: "pershare",
		},
	];

	return MAP;
}
