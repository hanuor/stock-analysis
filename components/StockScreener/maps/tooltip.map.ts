export const TOOLTIP_MAP = [
	{
		id: 'm',
		title: 'Market Capitalization',
		tooltip:
			"Market capitalization, or market cap, is the total value of all of a company's outstanding shares.",
		formula: 'Market Cap = Shares Outstanding * Stock Price',
	},
	{
		id: 'ev',
		title: 'Enterprise Value',
		tooltip:
			"Enterprise value measures the total value of a company's outstanding shares, adjusted for debt and cash levels.",
		formula:
			'Enterprise Value = Market Cap + Total Debt - Cash & Equivalents',
	},
	{
		id: 'earningsDate',
		title: 'Earnings Date',
		tooltip:
			"The earnings date is the day that the company releases its quarterly earnings. Check the company's investor relations page to confirm the date.",
	},
	{
		id: 'exDivDate',
		title: 'Ex-Dividend Date',
		tooltip:
			'Only shareholders that buy the stock before the ex-dividend date will receive the dividend payment.',
	},
	{
		id: 'sharesOut',
		title: 'Shares Outstanding',
		tooltip:
			"The total amount of outstanding common stock currently held by all of the company's shareholders.",
	},
	{
		id: 'sharesYoY',
		title: 'Shares Change (YoY)',
		tooltip:
			'The change in the number of shares outstanding, comparing the most recent quarter to the same quarter a year ago.',
	},
	{
		id: 'sharesQoQ',
		title: 'Shares Change (QoQ)',
		tooltip:
			'The change in the number of shares outstanding, comparing the most recent quarter to the previous quarter.',
	},
	{
		id: 'sharesInsiders',
		title: 'Owned by Insiders (%)',
		tooltip:
			"The percentage of shares outstanding that are held by the company's insiders, such as company executives and major shareholders.",
	},
	{
		id: 'sharesInstitutions',
		title: 'Owned by Institutions (%)',
		tooltip:
			'The percentage of shares outstanding held by institutions, such as fund companies, pensions and others.',
	},
	{
		id: 'float',
		title: 'Float',
		tooltip:
			'Float is the amount of shares that are considered available for trading. It subtracts closely held shares by insiders and restricted stock from the total number of shares outstanding.',
	},
	{
		id: 'pe',
		title: 'PE Ratio',
		tooltip:
			'The price-to-earnings (P/E) ratio is a valuation metric that shows how expensive a stock is relative to earnings.',
		formula: 'PE Ratio = Stock Price / Earnings Per Share',
	},
	{
		id: 'fpe',
		title: 'Forward PE',
		tooltip:
			'The forward price-to-earnings (P/E) ratio is like the PE ratio, except that it uses the estimated earnings over the next year instead of historical earnings.',
		formula: 'Forward PE = Stock Price / 1Y Forward EPS',
	},
	{
		id: 'ps',
		title: 'PS Ratio',
		tooltip:
			'The price-to-sales (P/S) ratio is a commonly used valuation metric. It shows how expensive a stock is compared to revenue.',
		formula: 'PS Ratio = Market Capitalization / Revenue',
	},
	{
		id: 'pb',
		title: 'PB Ratio',
		tooltip:
			"The price-to-book (P/B) ratio measures a stock's price relative to book value. Book value is also called Shareholders' equity.",
		formula: "PB Ratio = Market Capitalization / Shareholders' Equity",
	},
	{
		id: 'pfcf',
		title: 'P/FCF Ratio',

		tooltip:
			'The price to free cash flow (P/FCF) ratio is similar to the P/E ratio, except it uses free cash flow instead of accounting earnings.',
		formula: 'P/FCF Ratio = Market Capitalization / Free Cash Flow',
	},
	{
		id: 'peg',
		title: 'PEG Ratio',
		tooltip:
			"The price/earnings to growth (PEG) ratio is calculated by dividing a company's PE ratio by its expected earnings growth.",
		formula: 'PEG Ratio = PE Ratio / Expected Earnings Growth',
	},
	{
		id: 'evEarnings',
		title: 'EV/Earnings Ratio',
		tooltip:
			"The enterprise value to earnings (EV/Sales) ratio measures valuation, but the price is adjusted for the company's levels of cash and debt.",
		formula: 'EV/Earnings Ratio = Enterprise Value / Net Income (ttm)',
	},
	{
		id: 'evSales',
		title: 'EV/Sales Ratio',
		tooltip:
			"The enterprise value to sales (EV/Sales) ratio is similar to the price-to-sales ratio, but the price is adjusted for the company's debt and cash levels.",
		formula: 'EV/Sales Ratio = Enterprise Value / Revenue',
	},
	{
		id: 'evEbitda',
		title: 'EV/EBITDA Ratio',
		tooltip:
			"The EV/EBITDA ratio measures a company's valuation relative to its EBITDA, or Earnings Before Interest, Taxes, Depreciation, and Amortization.",
		formula: 'EV/EBITDA Ratio = Enterprise Value / EBITDA',
	},
	{
		id: 'evEbit',
		title: 'EV/EBIT Ratio',
		tooltip:
			"The EV/EBIT is a valuation metric that measures a company's price relative to EBIT, or Earnings Before Interest and Taxes.",
		formula: 'EV/EBIT Ratio = Enterprise Value / EBIT',
	},
	{
		id: 'evFcf',
		title: 'EV/FCF Ratio',
		tooltip:
			"The enterprise value to free cash flow (EV/FCF) ratio is similar to the price to free cash flow ratio, except the price is adjusted for the company's cash and debt.",
		formula: 'EV/FCF Ratio = Enterprise Value / Free Cash Flow',
	},
	{
		id: 'currentRatio',
		title: 'Current Ratio',
		tooltip:
			"The current ratio is used to measure a company's short-term liquidity. A low number can indicate that a company will have trouble paying its upcoming liabilities.",
		formula: 'Current Ratio = Current Assets / Current Liabilities',
	},
	{
		id: 'quickRatio',
		title: 'Quick Ratio',
		tooltip:
			"The quick ratio measure a company's short-term liquidity. A low number indicates that the company may have trouble paying its upcoming financial obligations.",
		formula:
			'Quick Ratio = (Cash + Short-Term Investments + Accounts Receivable) / Current Liabilities',
	},
	{
		id: 'debtEquity',
		title: 'Debt / Equity Ratio',
		tooltip:
			"The debt-to-equity ratio measures a company's debt levels relative to its shareholders' equity or book value. A high ratio implies that a company has a lot of debt.",
		formula: "Debt / Equity Ratio = Total Debt / Shareholders' Equity",
	},
	{
		id: 'debtEbitda',
		title: 'Debt / EBITDA Ratio',
		tooltip:
			"The debt-to-EBITDA ratio is a company's debt levels relative to its trailing twelve-month EBITDA. A high ratio implies that debt is high relative to the company's earnings.",
		formula: 'Debt / EBITDA Ratio = Total Debt / EBITDA (ttm)',
	},
	{
		id: 'debtFcf',
		title: 'Debt / FCF Ratio',
		tooltip:
			"The debt-to-FCF ratio measures the debt levels relative to a company's free cash flow over the previous twelve months. If the ratio is high, it means that the company will need to spend a lot of the cash it generates on paying back debt.",
		formula: 'Debt / FCF Ratio = Total Debt / Free Cash Flow (ttm)',
	},
	{
		id: 'roe',
		title: 'Return on Equity (ROE)',
		tooltip:
			'Return on equity (ROE) is a profitability metric that shows how efficient a company is at using its equity (or "net" assets) to generate profits.',
		formula: "ROE = (Net Income / Shareholders' Equity) * 100%",
	},
	{
		id: 'roa',
		title: 'Return on Assets (ROA)',
		tooltip:
			'Return on assets (ROA) is a metric that measures how much profit a company is able to generate using its assets.',
		formula: 'ROA = (Net Income / Total Assets) * 100%',
	},
	{
		id: 'roic',
		title: 'Return on Capital (ROIC)',
		tooltip:
			'Return on invested capital (ROIC) measures how effective a company is at investing its capital in order to increase profits. It is calculated by dividing the NOPAT (Net Operating Income After Tax) by the average invested capital in the previous year.',
		formula: 'ROIC = (NOPAT / Average Invested Capital) * 100%',
	},
	{
		id: 'revPerEmployee',
		title: 'Revenue Per Employee',
		tooltip:
			'The amount of revenue that the company generates per each employee.',
		formula: 'Revenue Per Employee = Total Revenue / Employee Count',
	},
	{
		id: 'profitsperemployee',
		title: 'Profits Per Employee',
		tooltip: 'The amount of net income generated per each employee.',
		formula: 'Profits Per Employee = Total Net Income / Employee Count',
	},
	{
		id: 'employees',
		title: 'Employees',
		tooltip:
			"The company's number of employees as of the latest quarterly report.",
	},
	{
		id: 'assetturnover',
		title: 'Asset Turnover',
		tooltip:
			"The asset turnover ratio measures the amount of sales relative to a company's assets. It indicates how efficiently the company uses its assets to generate revenue.",
		formula: 'Asset Turnover Ratio = Revenue / Average Assets',
	},
	{
		id: 'inventoryturnover',
		title: 'Inventory Turnover',
		tooltip:
			'The inventory turnover ratio measures how many times inventory has been sold and replaced during a time period.',
		formula: 'Inventory Turnover Ratio = Cost of Revenue / Average Inventory',
	},
	{
		id: 'taxRate',
		title: 'Effective Tax Rate',
		tooltip:
			'The effective tax rate is the percentage of taxable income paid in corporate income tax.',
		formula: 'Effective Tax Rate = (Income Tax / Pretax Income) * 100%',
	},
	{
		id: 'beta',
		title: 'Beta (1Y)',
		tooltip:
			'Beta measures the price volatility of a stock in comparison to the overall stock market. A value higher than 1 indicates greater volatility, while a value under 1 indicates less volatility.',
	},
	{
		id: 'ch1y',
		title: '52-Week Price Change',
		tooltip:
			'The percentage change in the stock price compared to 1 year ago.',
	},
	{
		id: 'v',
		title: 'Current Volume',
		tooltip:
			'The number of shares traded during the current or latest trading day.',
	},
	{
		id: 'averageVolume',
		title: 'Average Volume (30 Days)',
		tooltip:
			'The 30-day average of the number of shares traded in a single day.',
	},
	{
		id: 'shortShares',
		title: 'Short % of Shares Out',
		tooltip:
			'The percentage of the shares outstanding that have been sold short.',
	},
	{
		id: 'shortFloat',
		title: 'Short % of Float',
		tooltip:
			"The percentage of the stock's public float that has been sold short.",
	},
	{
		id: 'shortRatio',
		title: 'Short Ratio (days to cover)',
		tooltip:
			"Short ratio is the ratio of shorted shares relative to the stock's average daily trading volume. It estimates how many trading days it would take for all short sellers to cover their position.",
	},
	{
		id: 'revenue',
		title: 'Revenue',
		tooltip:
			'Revenue is the amount of money a company receives from its main business activities, such as sales of products or services. Revenue is also called sales.',
	},
	{
		id: 'grossProfit',
		title: 'Gross Profit',
		tooltip:
			'Gross profit is a company’s profit after subtracting the costs directly linked to making and delivering its products and services.',
		formula: 'Gross Profit = Revenue - Cost of Revenue',
	},
	{
		id: 'operatingIncome',
		title: 'Operating Income',
		tooltip:
			'Operating income is the amount of profit in a company after paying for all the expenses related to its core operations.',
		formula:
			'Operating Income = Revenue - Cost of Revenue - Operating Expenses',
	},
	{
		id: 'netIncome',
		title: 'Net Income',
		tooltip:
			'Net income is a company\'s accounting profits after subtracting all costs and expenses from the revenue. It is also called earnings, profits or "the bottom line"',
		formula: 'Net Income = Revenue - All Expenses',
	},
	{
		id: 'ebitda',
		title: 'EBITDA',
		tooltip:
			'EBITDA stands for "Earnings Before Interest, Taxes, Depreciation and Amortization." It is a commonly used measure of profitability.',
		formula:
			'EBITDA = Net Income + Interest + Taxes + Depreciation and Amortization',
	},
	{
		id: 'ebit',
		title: 'EBIT',
		tooltip:
			'EBIT stands for "Earnings Before Interest and Taxes" and is a commonly used measure of earnings or profits. It is similar to operating income.',
		formula: 'EBIT = Net Income + Interest + Taxes',
	},
	{
		id: 'eps',
		title: 'EPS (Diluted)',
		tooltip:
			'Earnings per share is the portion of a company\'s profit that is allocated to each individual stock. Diluted EPS is calculated by dividing net income by "diluted" shares outstanding.',
		formula: 'Diluted EPS = Net Income / Shares Outstanding (Diluted)',
	},
	{
		id: 'cash',
		title: 'Cash & Cash Equivalents',
		tooltip:
			'Cash and cash equivalents is the sum of "Cash & Equivalents" and "Short-Term Investments." This is the amount of money that a company has quick access to, assuming that the cash equivalents and short-term investments can be sold at a short notice.',
		formula:
			'Cash & Cash Equivalents = Cash & Equivalents + Short-Term Investments',
	},
	{
		id: 'debt',
		title: 'Total Debt',
		tooltip:
			'Total debt is the total amount of liabilities categorized as "debt" on the balance sheet. It includes both current and long-term (non-current) debt.',
		formula: 'Total Debt = Current Debt + Long-Term Debt',
	},
	{
		id: 'netCash',
		title: 'Net Cash / Debt',
		tooltip:
			'Net Cash / Debt is an indicator of the financial position of a company. It is calculated by taking the total amount of cash and cash equivalents and subtracting the total debt.',
		formula: 'Net Cash / Debt = Total Cash - Total Debt',
	},
	{
		id: 'equity',
		title: "Shareholders' Equity",
		tooltip:
			'Shareholders’ equity is also called book value or net worth. It can be seen as the amount of money held by investors inside the company. It is calculated by subtracting all liabilities from all assets.',
		formula: "Shareholders' Equity = Total Assets - Total Liabilities",
	},
	{
		id: 'workingCapital',
		title: 'Working Capital',
		tooltip:
			'Working capital is the amount of money available to a business to conduct its day-to-day operations. It is calculated by subtracting total current liabilities from total current assets.',
		formula: 'Working Capital = Current Assets - Current Liabilities',
	},
	{
		id: 'ocf',
		title: 'Operating Cash Flow',
		tooltip:
			'Operating cash flow, also called cash flow from operating activities, measures the amount of cash that a company generates from normal business activities. It is the amount of cash left after all cash income has been received, and all cash expenses have been paid.',
	},
	{
		id: 'fcf',
		title: 'Free Cash Flow',
		tooltip:
			'Free cash flow is the cash remaining after the company spends on everything required to maintain and grow the business. It is calculated by subtracting capital expenditures from operating cash flow.',
		formula: 'Free Cash Flow = Operating Cash Flow - Capital Expenditures',
	},
	{
		id: 'fcfps',
		title: 'Free Cash Flow Per Share',
		tooltip:
			'Free cash flow per share is the amount of free cash flow attributed to each outstanding stock.',
		formula: 'FCF Per Share = Free Cash Flow / Shares Outstanding',
	},
	{
		id: 'grossMargin',
		title: 'Gross Margin',
		tooltip:
			'Gross margin is the percentage of revenue left as gross profits, after subtracting cost of goods sold from the revenue.',
		formula: 'Gross Margin = (Gross Profit / Revenue) * 100%',
	},
	{
		id: 'operatingMargin',
		title: 'Operating Margin',
		tooltip:
			'Operating margin is the percentage of revenue left as operating income, after subtracting cost of revenue and all operating expenses from the revenue.',
		formula: 'Operating Margin = (Operating Income / Revenue) * 100%',
	},
	{
		id: 'profitMargin',
		title: 'Profit Margin',
		tooltip:
			'Profit margin is the percentage of revenue left as net income, or profits, after subtracting all costs and expenses from the revenue.',
		formula: 'Profit Margin = (Net Income / Revenue) * 100%',
	},
	{
		id: 'ebitdaMargin',
		title: 'EBITDA Margin',
		tooltip:
			'EBITDA margin is the percentage of revenue left as EBITDA, after subtracting all expenses except interest, taxes, depreciation and amortization from revenue.',
		formula: 'EBITDA Margin = (EBITDA / Revenue) * 100%',
	},
	{
		id: 'ebitMargin',
		title: 'EBIT Margin',
		tooltip:
			'EBIT Margin is a profitability ratio that measures the percentage of revenue left as EBIT (Earnings Before Interest and Taxes).',
		formula: 'EBIT Margin = (EBIT / Revenue) * 100%',
	},
	{
		id: 'fcfMargin',
		title: 'Free Cash Flow Margin',
		tooltip:
			'FCF margin is the percentage of revenue left as free cash flow. FCF is calculated by subtracting capital expenditures (CapEx) from the operating cash flow (OCF). Both CapEx and OCF are shown on the cash flow statement.',
		formula: 'FCF Margin = (Free Cash Flow / Revenue) * 100%',
	},
	{
		id: 'dps',
		title: 'Dividend Per Share',
		tooltip:
			'Total amount paid to each outstanding share in dividends during the period.',
	},
	{
		id: 'dy',
		title: 'Dividend Yield',
		tooltip:
			'The dividend yield is how much a stock pays in dividends each year, as a percentage of the stock price.',
		formula:
			'Dividend Yield = (Annual Dividends Per Share / (Market Cap / Shares Outstanding)) * 100%',
	},
	{
		id: 'earningsYield',
		title: 'Earnings Yield',
		tooltip:
			"The earnings yield is a valuation metric that measures a company's profits relative to stock price, expressed as a percentage yield. It is the inverse of the P/E ratio.",
		formula: 'Earnings Yield = (Earnings Per Share / Stock Price) * 100%',
	},
	{
		id: 'fcfYield',
		title: 'FCF Yield',
		tooltip:
			"The free cash flow (FCF) yield measures a company's free cash flow relative to its price, shown as a percentage. It is the inverse of the P/FCF ratio.",
		formula: 'FCF Yield = (Free Cash Flow / Market Cap) * 100%',
	},
	{
		id: 'dg',
		title: 'Dividend Growth',
		tooltip:
			'The change in dividend payments per share, compared to the previous period.',
		formula:
			'Dividend Growth = ((Current Dividend / Previous Dividend) - 1) * 100%',
	},
	{
		id: 'pr',
		title: 'Payout Ratio',
		tooltip:
			"The payout ratio is the percentage of a company's profits that are paid out as dividends. A high ratio implies that the dividend payments may not be sustainable.",
		formula:
			'Payout Ratio = (Dividends Per Share / Earnings Per Share) * 100%',
	},
	{
		id: 'splitDate',
		title: 'Last Split Date',
		tooltip: 'The date when the company last performed a stock split.',
	},
	{
		id: 'lastSplit',
		title: 'Split Type',
		tooltip:
			'There are two types of stock splits: Forward and Reverse. Forward means that the share count increases and the stock price goes down. Reverse means that the stock count decreases and the stock price goes up.',
	},
];
