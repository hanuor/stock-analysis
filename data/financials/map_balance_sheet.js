export default function balance_sheet() {
	const MAP = [
		{
			id: "cashneq",
			data: "cashneq",
			title: "Cash & Equivalents",
			format: "standard",
		},
		{
			id: "investmentsc",
			data: "investmentsc",
			title: "Short-Term Investments",
			format: "standard",
		},
		{
			id: "receivables",
			data: "receivables",
			title: "Receivables",
			format: "standard",
		},
		{
			id: "inventory",
			data: "inventory",
			title: "Inventory",
			format: "standard",
		},
	];

	return MAP;
}
