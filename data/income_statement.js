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
			format: "percentage",
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
	];

	return MAP;
}
