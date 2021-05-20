export default function ratios() {
	const MAP = [
		{
			id: "marketcap",
			title: "Market Capitalization",
			format: "reduce_precision",
		},
		{
			id: "ev",
			title: "Enterprise Value",
			format: "reduce_precision",
		},
		{
			id: "pe",
			title: "PE Ratio",
			format: "ratio",
		},
		{
			id: "ps",
			title: "PS Ratio",
			format: "ratio",
		},
		{
			id: "pb",
			title: "PB Ratio",
			format: "ratio",
		},
		{
			id: "pfcf",
			title: "P/FCF Ratio",
			format: "ratio",
		},
		{
			id: "pocf",
			title: "P/OCF Ratio",
			format: "ratio",
		},
		{
			id: "evrevenue",
			title: "EV/Sales Ratio",
			format: "ratio",
		},
		{
			id: "evebitda",
			title: "EV/EBITDA Ratio",
			format: "ratio",
		},
		{
			id: "evebit",
			title: "EV/EBIT Ratio",
			format: "ratio",
		},
		{
			id: "evfcf",
			title: "EV/FCF Ratio",
			format: "ratio",
		},
		{
			id: "debtequity",
			title: "Debt / Equity Ratio",
			format: "ratio",
		},
		{
			id: "currentratio",
			title: "Current Ratio",
			format: "ratio",
		},
		{
			id: "assetturnover",
			title: "Asset Turnover",
			format: "ratio",
		},
		{
			id: "roe",
			title: "Return on Equity (ROE)",
			format: "ratio",
		},
		{
			id: "roa",
			title: "Return on Assets (ROA)",
			format: "ratio",
		},
		{
			id: "roic",
			title: "Return on Capital (ROIC)",
			format: "ratio",
		},
		{
			id: "earningsyield",
			title: "Earnings Yield",
			format: "percentage",
		},
		{
			id: "fcfyield",
			title: "FCF Yield",
			format: "percentage",
		},
		{
			id: "dividendyield",
			title: "Dividend Yield",
			format: "percentage",
		},
		{
			id: "payoutratio",
			title: "Payout Ratio",
			format: "percentage",
		},
	];

	return MAP;
}
