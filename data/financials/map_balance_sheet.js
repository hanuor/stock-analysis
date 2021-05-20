export default function balance_sheet() {
	const MAP = [
		{
			id: "cashneq",
			title: "Cash & Equivalents",
		},
		{
			id: "investmentsc",
			title: "Short-Term Investments",
		},
		{
			id: "totalcash",
			title: "Cash & Cash Equivalents",
		},
		{
			id: "cashgrowth",
			data: "totalcash",
			title: "Cash Growth",
			format: "growth",
		},
		{
			id: "receivables",
			title: "Receivables",
		},
		{
			id: "inventory",
			title: "Inventory",
		},
		{
			id: "othercurrent",
			title: "Other Current Assets",
		},
		{
			id: "assetsc",
			title: "Total Current Assets",
		},
		{
			id: "ppnenet",
			title: "Property, Plant & Equipment",
		},
		{
			id: "investmentsnc",
			title: "Long-Term Investments",
		},
		{
			id: "intangibles",
			title: "Goodwill and Intangibles",
		},
		{
			id: "othernoncurrent",
			title: "Other Long-Term Assets",
		},
		{
			id: "assetsnc",
			title: "Total Long-Term Assets",
		},
		{
			id: "assets",
			title: "Total Assets",
		},
		{
			id: "payables",
			title: "Accounts Payable",
		},
		{
			id: "deferredrev",
			title: "Deferred Revenue",
		},
		{
			id: "debtc",
			title: "Current Debt",
		},
		{
			id: "otherliabilitiescurrent",
			title: "Other Current Liabilities",
		},
		{
			id: "liabilitiesc",
			title: "Total Current Liabilities",
		},
		{
			id: "debtnc",
			title: "Long-Term Debt",
		},
		{
			id: "otherliabilitiesnoncurrent",
			title: "Other Long-Term Liabilities",
		},
		{
			id: "liabilitiesnc",
			title: "Total Long-Term Liabilities",
		},
		{
			id: "liabilities",
			title: "Total Liabilities",
		},
		{
			id: "debt",
			title: "Total Debt",
		},
		{
			id: "debtgrowth",
			data: "debt",
			title: "Debt Growth",
			format: "growth",
		},
		{
			id: "commonstocknet",
			data: "commonstocknet",
			title: "Common Stock",
		},
		{
			id: "retearn",
			title: "Retained Earnings",
		},
		{
			id: "accoci",
			title: "Comprehensive Income",
		},
		{
			id: "equity",
			title: "Shareholders' Equity",
		},
		{
			id: "liabilitiesequity",
			title: "Total Liabilities and Equity",
		},
		{
			id: "netcash",
			title: "Net Cash / Debt",
		},
		{
			id: "netcashgrowth",
			data: "netcash",
			title: "Net Cash / Debt Growth",
			format: "growth",
		},
		{
			id: "netcashpershare",
			title: "Net Cash Per Share",
			format: "pershare",
		},
		{
			id: "workingcapital",
			title: "Working Capital",
		},
		{
			id: "bvps",
			title: "Book Value Per Share",
			format: "pershare",
		},
	];

	return MAP;
}
