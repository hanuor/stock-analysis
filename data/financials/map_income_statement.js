export default function income_statement() {
	const MAP = [
		{
			id: "revenue",
			data: "revenue",
			title: "Revenue",
			format: "standard",
		},
		{
			id: "revenueGrowth",
			data: "revenue",
			title: "Revenue Growth",
			format: "growth",
		},
		{
			id: "cor",
			data: "cor",
			title: "Cost of Revenue",
			format: "standard",
		},
		{
			id: "gp",
			data: "gp",
			title: "Gross Profit",
			format: "standard",
		},
		{
			id: "sgna",
			data: "sgna",
			title: "Selling, General & Admin",
			format: "standard",
		},
		{
			id: "opex",
			data: "opex",
			title: "Operating Expenses",
			format: "standard",
		},
		{
			id: "opinc",
			data: "opinc",
			title: "Operating Income",
			format: "standard",
		},
		{
			id: "intexp",
			data: "intexp",
			title: "Interest Expense / Income",
			format: "standard",
		},
		{
			id: "taxexp",
			data: "taxexp",
			title: "Income Tax",
			format: "standard",
		},
		{
			id: "netinc",
			data: "netinc",
			title: "Net Income",
			format: "standard",
		},
		{
			id: "netincgrowth",
			data: "netinc",
			title: "Net Income Growth",
			format: "growth",
		},
		{
			id: "prefdivis",
			data: "prefdivis",
			title: "Preferred Dividends",
			format: "standard",
		},
		{
			id: "netinccmn",
			data: "netinccmn",
			title: "Net Income Common",
			format: "standard",
		},
		{
			id: "shareswa",
			data: "shareswa",
			title: "Shares Outstanding (Basic)",
			format: "standard",
		},
		{
			id: "shareswadil",
			data: "shareswadil",
			title: "Shares Outstanding (Diluted)",
			format: "standard",
		},
		{
			id: "eps",
			data: "eps",
			title: "EPS (Basic)",
			format: "pershare",
		},
		{
			id: "epsdil",
			data: "epsdil",
			title: "EPS (Diluted)",
			format: "pershare",
		},
		{
			id: "dps",
			data: "dps",
			title: "Dividend Per Share",
			format: "pershare",
		},
		{
			id: "grossmargin",
			data: "gp",
			title: "Gross Margin",
			format: "margin",
		},
		{
			id: "netmargin",
			data: "netmargin",
			title: "Profit Margin",
			format: "percentage",
		},
		{
			id: "ebitda",
			data: "ebitda",
			title: "EBITDA",
			format: "standard",
		},
		{
			id: "ebitdamargin",
			data: "ebitda",
			title: "EBITDA Margin",
			format: "margin",
		},
		{
			id: "ebit",
			data: "ebit",
			title: "EBIT",
			format: "standard",
		},
		{
			id: "ebitmargin",
			data: "ebit",
			title: "EBIT Margin",
			format: "margin",
		},
	];

	return MAP;
}
