export const MAP_CASH_FLOW_STATEMENT = [
	{
		id: 'netinc',
		title: 'Net Income',
		tooltip:
			'Net income is a company\'s accounting profits after subtracting all costs and expenses from the revenue. It is also called earnings, profits or "the bottom line"',
		formula: 'Net Income = Revenue - All Expenses',
	},
	{
		id: 'depamor',
		title: 'Depreciation & Amortization',
		tooltip:
			"Depreciation and amortization are accounting methods for calculating how the value of a business's assets change over time. Depreciation refers to physical assets, while amortization refers to intangible assets.",
		indent: true,
	},
	{
		id: 'sbcomp',
		title: 'Share-Based Compensation',
		tooltip:
			'Share-based compensation is the value of shares issued for the purpose of compensating the executives and employees of a company.',
		indent: true,
	},
	{
		id: 'otheroperating',
		title: 'Other Operating Activities',
		tooltip:
			'Other operating activities are items affecting the operating cash flow that do not fit into the categories above. These can include changes in accounts payables and receivables, changes in inventory, and various others.',
		indent: true,
	},
	{
		id: 'ncfo',
		title: 'Operating Cash Flow',
		tooltip:
			'Operating cash flow, also called cash flow from operating activities, measures the amount of cash that a company generates from normal business activities. It is the amount of cash left after all cash income has been received, and all cash expenses have been paid.',
		bold: true,
	},
	{
		id: 'ocfgrowth',
		data: 'ncfo',
		title: 'Operating Cash Flow Growth',
		tooltipTitle: 'Operating Cash Flow Growth (YoY)',
		format: 'growth',
		tooltip:
			'Operating cash flow growth is the percentage change in cash flow from operations compared to a previous period.',
		formula: 'OCF Growth = ((Current OCF / Previous OCF) - 1) * 100%',
		border: true,
	},
	{
		id: 'capex',
		title: 'Capital Expenditures',
		tooltip:
			'Capital expenditures are also called payments for property, plants and equipment. It measures cash spent on long-term assets that will be used to run the business, such as manufacturing equipment, real estate and others.',
		indent: true,
	},
	{
		id: 'ncfbus',
		title: 'Acquisitions',
		tooltip: 'The amount of cash spent on acquiring other businesses.',
		indent: true,
	},
	{
		id: 'ncfinv',
		title: 'Change in Investments',
		tooltip:
			'The cash either spent or received from purchasing or selling investments. A positive number implies that the company was a net seller of investments. A negative number implies that the company was a net buyer of investments.',
		indent: true,
	},
	{
		id: 'otherinvesting',
		title: 'Other Investing Activities',
		tooltip:
			'Other investing activities are investing activities that do not belong to any of the categories above.',
		indent: true,
	},
	{
		id: 'ncfi',
		title: 'Investing Cash Flow',
		tooltip:
			'Investing cash flow is the total change in cash from buying and selling investments and long-term assets.',
		bold: true,
		border: true,
	},
	{
		id: 'ncfdiv',
		title: 'Dividends Paid',
		tooltip: 'The total amount paid out as cash dividends to shareholders.',
		indent: true,
	},
	{
		id: 'ncfcommon',
		title: 'Share Issuance / Repurchase',
		tooltip:
			'The cash gained from issuing shares, or cash spent on repurchasing shares via share buybacks. A positive number implies that the company issued more shares than it repurchased. A negative number implies that the company bought back shares.',
		indent: true,
	},
	{
		id: 'ncfdebt',
		title: 'Debt Issued / Paid',
		tooltip:
			'The cash gained from issuing debt, or cash spent on paying back debts. A positive number implies that the company took on more debt than it paid. A negative number implies that the company paid back debts.',
		indent: true,
	},
	{
		id: 'otherfinancing',
		title: 'Other Financing Activities',
		tooltip:
			'Other financing activities are financing activites that do not belong to the categories above.',
		indent: true,
	},
	{
		id: 'ncff',
		title: 'Financing Cash Flow',
		tooltip:
			'Financing cash flow is the total change in cash through financing activities. This includes dividend payments, share issuance and repurchases, changes in debt levels and others.',
		border: true,
		bold: true,
	},
	{
		id: 'ncf',
		title: 'Net Cash Flow',
		tooltip:
			'Net cash flow is the sum of the operating, investing and financing cash flow numbers. It is the change in cash and equivalents on the company\'s balance sheet during the accounting period. It is often shown as "increase/decrease in cash and equivalents" on the cash flow statement.',
		formula:
			'Net Cash Flow = Operating Cash Flow + Investing Cash Flow + Financing Cash Flow',
		bold: true,
	},
	{
		id: 'fcf',
		title: 'Free Cash Flow',
		tooltip:
			'Free cash flow is the cash remaining after the company spends on everything required to maintain and grow the business. It is calculated by subtracting capital expenditures from operating cash flow.',
		formula: 'Free Cash Flow = Operating Cash Flow - Capital Expenditures',
	},
	{
		id: 'fcfgrowth',
		data: 'fcf',
		title: 'Free Cash Flow Growth',
		tooltipTitle: 'Free Cash Flow Growth (YoY)',
		format: 'growth',
		tooltip:
			'Free cash flow growth is the percentage change in free cash flow compared to a previous period.',
		formula: 'FCF Growth = ((Current FCF / Previous FCF) - 1) * 100%',
	},
	{
		id: 'fcfmargin',
		data: 'fcf',
		title: 'Free Cash Flow Margin',
		format: 'margin',
		tooltip:
			'FCF margin is the percentage of revenue left as free cash flow.',
		formula: 'FCF Margin = (Free Cash Flow / Revenue) * 100%',
	},
	{
		id: 'fcfps',
		title: 'Free Cash Flow Per Share',
		format: 'pershare',
		tooltip:
			'Free cash flow per share is the amount of free cash flow attributed to each outstanding stock.',
		formula: 'FCF Per Share = Free Cash Flow / Shares Outstanding',
	},
];
