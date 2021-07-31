export const MAP_RATIOS = [
	{
		id: 'marketcap',
		title: 'Market Capitalization',
		format: 'reduce_precision',
		tooltip:
			"Market capitalization, or market cap, is the total value of all of a company's outstanding shares.",
		formula: 'Market Cap = Shares Outstanding * Stock Price',
		bold: true,
	},
	{
		id: 'marketcapgrowth',
		data: 'marketcap',
		title: 'Market Cap Growth',
		format: 'growth',
		tooltip:
			"Market cap growth is how much a company's market cap has increased compared to a previous point in time.",
		formula:
			'Market Cap Growth = ((Current Market Cap / Previous Market Cap) - 1) * 100%',
	},
	{
		id: 'ev',
		title: 'Enterprise Value',
		format: 'reduce_precision',
		tooltip:
			"Enterprise value measures the total value of a company's outstanding shares, adjusted for debt and cash levels.",
		formula:
			'Enterprise Value = Market Cap + Total Debt - Cash & Equivalents',
	},
	{
		id: 'pe',
		title: 'PE Ratio',
		format: 'ratio',
		tooltip:
			'The price-to-earnings (P/E) ratio is a valuation metric that shows how expensive a stock is relative to earnings.',
		formula: 'PE Ratio = Stock Price / Earnings Per Share',
	},
	{
		id: 'ps',
		title: 'PS Ratio',
		format: 'ratio',
		tooltip:
			'The price-to-sales (P/S) ratio is a commonly used valuation metric. It shows how expensive a stock is compared to revenue.',
		formula: 'PS Ratio = Market Capitalization / Revenue',
	},
	{
		id: 'pb',
		title: 'PB Ratio',
		format: 'ratio',
		tooltip:
			"The price-to-book (P/B) ratio measures a stock's price relative to book value. Book value is also called Shareholders' equity.",
		formula: "PB Ratio = Market Capitalization / Shareholders' Equity",
	},
	{
		id: 'pfcf',
		title: 'P/FCF Ratio',
		format: 'ratio',

		tooltip:
			'The price to free cash flow (P/FCF) ratio is similar to the P/E ratio, except it uses free cash flow instead of accounting earnings.',
		formula: 'P/FCF Ratio = Market Capitalization / Free Cash Flow',
	},
	{
		id: 'pocf',
		title: 'P/OCF Ratio',
		format: 'ratio',

		tooltip:
			'The price to operating cash flow (P/OCF) ratio measures the price of a stock relative to operating cash flow.',
		formula: 'P/OCF Ratio = Market Capitalization / Operating Cash Flow',
		border: true,
	},
	{
		id: 'evrevenue',
		title: 'EV/Sales Ratio',
		format: 'ratio',
		tooltip:
			"The enterprise value to sales (EV/Sales) ratio is similar to the price-to-sales ratio, but the price is adjusted for the company's debt and cash levels.",
		formula: 'EV/Sales Ratio = Enterprise Value / Revenue',
	},
	{
		id: 'evebitda',
		title: 'EV/EBITDA Ratio',
		format: 'ratio',
		tooltip:
			"The EV/EBITDA ratio measures a company's valuation relative to its EBITDA, or Earnings Before Interest, Taxes, Depreciation, and Amortization.",
		formula: 'EV/EBITDA Ratio = Enterprise Value / EBITDA',
	},
	{
		id: 'evebit',
		title: 'EV/EBIT Ratio',
		format: 'ratio',
		tooltip:
			"The EV/EBIT is a valuation metric that measures a company's price relative to EBIT, or Earnings Before Interest and Taxes.",
		formula: 'EV/EBIT Ratio = Enterprise Value / EBIT',
	},
	{
		id: 'evfcf',
		title: 'EV/FCF Ratio',
		format: 'ratio',
		tooltip:
			"The enterprise value to free cash flow (EV/FCF) ratio is similar to the price to free cash flow ratio, except the price is adjusted for the company's cash and debt.",
		formula: 'EV/FCF Ratio = Enterprise Value / Free Cash Flow',
		border: true,
	},
	{
		id: 'debtequity',
		title: 'Debt / Equity Ratio',
		format: 'ratio',
		tooltip:
			"The debt-to-equity ratio measures a company's debt levels relative to its shareholders' equity or book value. A high ratio implies that a company has a lot of debt.",
		formula: "Debt / Equity Ratio = Total Debt / Shareholders' Equity",
	},
	{
		id: 'debtebitda',
		title: 'Debt / EBITDA Ratio',
		format: 'ratio',
		tooltip:
			"The debt-to-EBITDA ratio is a company's debt levels relative to its trailing twelve-month EBITDA. A high ratio implies that debt is high relative to the company's earnings.",
		formula: 'Debt / EBITDA Ratio = Total Debt / EBITDA (ttm)',
	},
	{
		id: 'debtfcf',
		title: 'Debt / FCF Ratio',
		format: 'ratio',
		tooltip:
			"The debt-to-FCF ratio measures the debt levels relative to a company's free cash flow over the previous twelve months. If the ratio is high, it means that the company will need to spend a lot of the cash it generates on paying back debt.",
		formula: 'Debt / FCF Ratio = Total Debt / Free Cash Flow (ttm)',
	},
	{
		id: 'currentratio',
		title: 'Current Ratio',
		format: 'ratio',
		tooltip:
			"The current ratio is used to measure a company's short-term liquidity. A low number can indicate that a company will have trouble paying its upcoming liabilities.",
		formula: 'Current Ratio = Current Assets / Current Liabilities',
		border: true,
	},
	{
		id: 'assetturnover',
		title: 'Asset Turnover',
		format: 'ratio',
		tooltip:
			"The asset turnover ratio measures the amount of sales relative to a company's assets. It indicates how efficiently the company uses its assets to generate revenue.",
		formula: 'Asset Turnover Ratio = Revenue / Average Assets',
	},
	{
		id: 'roe',
		title: 'Return on Equity (ROE)',
		format: 'percentage',
		tooltip:
			'Return on equity (ROE) is a profitability metric that shows how efficient a company is at using its equity (or "net" assets) to generate profits.',
		formula: "ROE = (Net Income / Shareholders' Equity) * 100%",
	},
	{
		id: 'roa',
		title: 'Return on Assets (ROA)',
		format: 'percentage',
		tooltip:
			'Return on assets (ROA) is a metric that measures how much profit a company is able to generate using its assets.',
		formula: 'ROA = (Net Income / Total Assets) * 100%',
	},
	{
		id: 'roic',
		title: 'Return on Capital (ROIC)',
		format: 'percentage',
		tooltip:
			'Return on invested capital (ROIC) measures how effective a company is at investing its capital in order to increase profits. It is calculated by dividing the NOPAT (Net Operating Income After Tax) by the average invested capital in the previous year.',
		formula: 'ROIC = (NOPAT / Average Invested Capital) * 100%',
		border: true,
	},
	{
		id: 'earningsyield',
		title: 'Earnings Yield',
		format: 'percentage',
		tooltip:
			"The earnings yield is a valuation metric that measures a company's profits relative to stock price, expressed as a percentage yield. It is the inverse of the P/E ratio.",
		formula: 'Earnings Yield = (Earnings Per Share / Stock Price) * 100%',
	},
	{
		id: 'fcfyield',
		title: 'FCF Yield',
		format: 'percentage',
		tooltip:
			"The free cash flow (FCF) yield measures a company's free cash flow relative to its price, shown as a percentage. It is the inverse of the P/FCF ratio.",
		formula: 'FCF Yield = (Free Cash Flow / Market Cap) * 100%',
	},
	{
		id: 'dividendyield',
		title: 'Dividend Yield',
		format: 'percentage',
		tooltip:
			'The dividend yield is how much a stock pays in dividends each year, as a percentage of the stock price.',
		formula:
			'Dividend Yield = (Annual Dividends Per Share / (Market Cap / Shares Outstanding)) * 100%',
	},
	{
		id: 'payoutratio',
		title: 'Payout Ratio',
		format: 'percentage',
		tooltip:
			"The payout ratio is the percentage of a company's profits that are paid out as dividends. A high ratio implies that the dividend payments may not be sustainable.",
		formula:
			'Payout Ratio = (Dividends Per Share / Earnings Per Share) * 100%',
	},
	{
		id: 'buybackyield',
		title: 'Buyback Yield / Dilution',
		format: 'percentage',
		tooltip:
			'The buyback yield measures how much cash the company is returning to investors via share buybacks. A positive number indicates that the company is buying back shares. A negative number implies that the company is issuing shares and causing ownership dilution for shareholders.',
		formula:
			'Buyback Yield = - (Share Repurchase or Issuance / Market Cap) * 100%',
	},
	{
		id: 'totalreturn',
		title: 'Total Shareholder Return',
		format: 'percentage',
		tooltip:
			'The total shareholder return is how much the company is returning to shareholders via dividends and share buybacks combined. It is calculated by adding up the dividend yield and buyback yield',
		formula: 'Total Shareholder Return = Dividend Yield + Buyback Yield',
	},
];
