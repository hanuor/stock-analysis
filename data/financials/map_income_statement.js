export default function income_statement() {
	const MAP = [
		{
			id: "revenue",
			title: "Revenue",
			tooltip:
				"Revenue is the amount of money a company receives from its main business activities, such as sales of products or services. Revenue is also called sales.",
		},
		{
			id: "revenuegrowth",
			data: "revenue",
			title: "Revenue Growth",
			format: "growth",
			tooltip:
				"Revenue growth is how much a company's revenue has increased compared to a previous time period, expressed as a percentage.",
		},
		{
			id: "cor",
			title: "Cost of Revenue",
			tooltip:
				"Cost of revenue is also called cost of goods sold (COGS). It is the variable cost related to the company's production of products and services.",
		},
		{
			id: "gp",
			title: "Gross Profit",
			tooltip:
				"Gross profit is a company’s profit after subtracting the costs directly linked to making and delivering its products and services.",
		},
		{
			id: "sgna",
			title: "Selling, General & Admin",
		},
		{
			id: "rnd",
			title: "Research & Development",
		},
		{
			id: "otheropex",
			title: "Other Operating Expenses",
		},
		{
			id: "opex",
			title: "Operating Expenses",
		},
		{
			id: "opinc",
			title: "Operating Income",
		},
		{
			id: "intexp",
			title: "Interest Expense / Income",
		},
		{
			id: "otherincome",
			title: "Other Expense / Income",
		},
		{
			id: "pretax",
			title: "Pretax Income",
		},
		{
			id: "taxexp",
			title: "Income Tax",
		},
		{
			id: "netinc",
			title: "Net Income",
		},

		{
			id: "netinccmn",
			title: "Net Income Common",
		},
		{
			id: "prefdivis",
			title: "Preferred Dividends",
		},
		{
			id: "netincgrowth",
			data: "netinccmn",
			title: "Net Income Growth",
			format: "growth",
		},
		{
			id: "shareswa",
			title: "Shares Outstanding (Basic)",
			format: "reduce_precision",
		},
		{
			id: "shareswadil",
			title: "Shares Outstanding (Diluted)",
			format: "reduce_precision",
		},
		{
			id: "shareschange",
			data: "shareswadil",
			title: "Shares Change",
			format: "growth",
		},
		{
			id: "eps",
			title: "EPS (Basic)",
			format: "pershare",
		},
		{
			id: "epsdil",
			title: "EPS (Diluted)",
			format: "pershare",
		},
		{
			id: "epsgrowth",
			data: "epsdil",
			title: "EPS Growth",
			format: "growth",
		},
		{
			id: "fcfps",
			title: "Free Cash Flow Per Share",
			format: "pershare",
		},
		{
			id: "dps",
			title: "Dividend Per Share",
			format: "pershare",
		},
		{
			id: "dpsgrowth",
			data: "dps",
			title: "Dividend Growth",
			format: "growth",
		},
		{
			id: "grossmargin",
			data: "gp",
			title: "Gross Margin",
			format: "margin",
		},
		{
			id: "operatingmargin",
			data: "opinc",
			title: "Operating Margin",
			format: "margin",
		},
		{
			id: "netmargin",
			data: "netinc",
			title: "Profit Margin",
			format: "margin",
		},
		{
			id: "fcfmargin",
			data: "fcf",
			title: "Free Cash Flow Margin",
			format: "margin",
		},
		{
			id: "taxrate",
			title: "Effective Tax Rate",
			format: "percentage",
		},
		{
			id: "ebitda",
			title: "EBITDA",
		},
		{
			id: "ebitdamargin",
			data: "ebitda",
			title: "EBITDA Margin",
			format: "margin",
		},
		{
			id: "ebit",
			title: "EBIT",
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
