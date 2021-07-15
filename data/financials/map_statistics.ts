export const MAP_STATISTICS = [
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
		id: 'ev',
		title: 'Enterprise Value',
		format: 'reduce_precision',
		tooltip:
			"Enterprise value measures the total value of a company's outstanding shares, adjusted for debt and cash levels.",
		formula:
			'Enterprise Value = Market Cap + Total Debt - Cash & Equivalents',
	},
	{
		id: 'earningsdate',
		title: 'Earnings Date',
		format: 'none',
		tooltip:
			"The earnings date is the day that the company releases its quarterly earnings. Check the company's investor relations page to confirm the date.",
	},
	{
		id: 'exdivdate',
		title: 'Ex-Dividend Date',
		format: 'none',
		tooltip:
			'Only shareholders that buy the stock before the ex-dividend date will receive the dividend payment.',
	},
	{
		id: 'sharesout',
		title: 'Shares Outstanding',
		format: 'none',
		tooltip:
			"The total amount of outstanding common stock currently held by all of the company's shareholders.",
	},
	{
		id: 'sharesgrowthyoy',
		title: 'Shares Change (YoY)',
		format: 'none',
		tooltip:
			'The change in the number of shares outstanding, comparing the most recent quarter to the same quarter a year ago.',
	},
	{
		id: 'sharesgrowthqoq',
		title: 'Shares Change (QoQ)',
		format: 'none',
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
		format: 'ratio',
		tooltip:
			'The price-to-earnings (P/E) ratio is a valuation metric that shows how expensive a stock is relative to earnings.',
		formula: 'PE Ratio = Stock Price / Earnings Per Share',
	},
	{
		id: 'forwardpe',
		title: 'Forward PE',
		format: 'none',
		tooltip:
			'The forward price-to-earnings (P/E) ratio is like the PE ratio, except that it uses the estimated earnings over the next year instead of historical earnings.',
		formula: 'Forward PE = Stock Price / 1Y Forward EPS',
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
		id: 'pegratio',
		title: 'PEG Ratio',
		format: 'none',
		tooltip:
			"The price/earnings to growth (PEG) ratio is calculated by dividing a company's PE ratio by its expected earnings growth.",
		formula: 'PEG Ratio = PE Ratio / Expected Earnings Growth',
	},
	{
		id: 'evearnings',
		title: 'EV/Earnings Ratio',
		format: 'ratio',
		tooltip:
			"The enterprise value to earnings (EV/Sales) ratio measures valuation, but the price is adjusted for the company's levels of cash and debt.",
		formula: 'EV/Earnings Ratio = Enterprise Value / Net Income (ttm)',
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
		id: 'currentratio',
		title: 'Current Ratio',
		format: 'ratio',
		tooltip:
			"The current ratio is used to measure a company's short-term liquidity. A low number can indicate that a company will have trouble paying its upcoming liabilities.",
		formula: 'Current Ratio = Current Assets / Current Liabilities',
		border: true,
	},
	{
		id: 'quickratio',
		title: 'Quick Ratio',
		tooltip:
			"The quick ratio measure a company's short-term liquidity. A low number indicates that the company may have trouble paying its upcoming financial obligations.",
		formula:
			'Quick Ratio = (Cash + Short-Term Investments + Accounts Receivable) / Current Liabilities',
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
		id: 'revenueperemployee',
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
		format: 'ratio',
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
		id: 'taxexp',
		title: 'Income Tax',
		tooltip:
			'Income tax is the amount of corporate income tax that the company has incurred during the fiscal period.',
		indent: true,
	},
	{
		id: 'taxrate',
		title: 'Effective Tax Rate',
		format: 'percentage',
		tooltip:
			'The effective tax rate is the percentage of taxable income paid in corporate income tax.',
		formula: 'Effective Tax Rate = (Income Tax / Pretax Income) * 100%',
		border: true,
	},
	{
		id: 'beta',
		title: 'Beta (1Y)',
		tooltip:
			'Beta measures the price volatility of a stock in comparison to the overall stock market. A value higher than 1 indicates greater volatility, while a value under 1 indicates less volatility.',
	},
	{
		id: 'price1yipo',
		title: 'Total Price Change',
		tooltip:
			'The percentage change in the stock price since the company started trading.',
	},
	{
		id: 'price1y',
		title: '52-Week Price Change',
		tooltip:
			'The percentage change in the stock price compared to 1 year ago.',
	},
	{
		id: 'sma50',
		title: '50-Day Moving Average',
		tooltip: 'The average stock price over the last 50 days.',
	},
	{
		id: 'sma200',
		title: '200-Day Moving Average',
		tooltip: 'The average stock price over the last 200 days.',
	},
	{
		id: 'volumeavg',
		title: 'Average Volume (30 Days)',
		tooltip:
			'The 30-day average of the number of shares traded in a single day.',
	},
	{
		id: 'shortshares',
		title: 'Short Interest',
		tooltip:
			"The total number of the company's shares that have been sold short.",
	},
	{
		id: 'shortsharesout',
		title: 'Short % of Shares Out',
		tooltip:
			'The percentage of the shares outstanding that have been sold short.',
	},
	{
		id: 'shortfloat',
		title: 'Short % of Float',
		tooltip:
			"The percentage of the stock's public float that has been sold short.",
	},
	{
		id: 'shortratio',
		title: 'Short Ratio (days to cover)',
		tooltip:
			"Short ratio is the ratio of shorted shares relative to the stock's average daily trading volume. It estimates how many trading days it would take for all short sellers to cover their position.",
	},
	{
		id: 'revenue',
		title: 'Revenue',
		tooltip:
			'Revenue is the amount of money a company receives from its main business activities, such as sales of products or services. Revenue is also called sales.',
		bold: true,
	},
	{
		id: 'gp',
		title: 'Gross Profit',
		tooltip:
			'Gross profit is a company’s profit after subtracting the costs directly linked to making and delivering its products and services.',
		formula: 'Gross Profit = Revenue - Cost of Revenue',
		border: true,
		bold: true,
	},
	{
		id: 'opinc',
		title: 'Operating Income',
		tooltip:
			'Operating income is the amount of profit in a company after paying for all the expenses related to its core operations.',
		formula:
			'Operating Income = Revenue - Cost of Revenue - Operating Expenses',
		border: true,
		bold: true,
	},
	{
		id: 'pretax',
		title: 'Pretax Income',
		tooltip:
			"Pretax income is a company's profits before accounting for income taxes.",
		formula: 'Pretax Income = Net Income + Income Taxes',
		bold: true,
	},
	{
		id: 'netinc',
		title: 'Net Income',
		tooltip:
			'Net income is a company\'s accounting profits after subtracting all costs and expenses from the revenue. It is also called earnings, profits or "the bottom line"',
		formula: 'Net Income = Revenue - All Expenses',
	},
	{
		id: 'netinccmn',
		title: 'Net Income Common',
		tooltip:
			'Net income available to common shareholders is shown when a stock pays preferred dividends. It subtracts the preferred dividends from the total net income.',
		formula: 'Net Income Common = Net Income - Preferred Dividends',
		bold: true,
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
		id: 'epsdil',
		title: 'EPS (Diluted)',
		format: 'pershare',
		tooltip:
			'Earnings per share is the portion of a company\'s profit that is allocated to each individual stock. Diluted EPS is calculated by dividing net income by "diluted" shares outstanding.',
		formula: 'Diluted EPS = Net Income / Shares Outstanding (Diluted)',
		bold: true,
	},
	{
		id: 'totalcash',
		title: 'Cash & Cash Equivalents',
		tooltip:
			'Cash and cash equivalents is the sum of "Cash & Equivalents" and "Short-Term Investments." This is the amount of money that a company has quick access to, assuming that the cash equivalents and short-term investments can be sold at a short notice.',
		formula:
			'Cash & Cash Equivalents = Cash & Equivalents + Short-Term Investments',
		bold: true,
	},
	{
		id: 'debt',
		title: 'Total Debt',
		tooltip:
			'Total debt is the total amount of liabilities categorized as "debt" on the balance sheet. It includes both current and long-term (non-current) debt.',
		formula: 'Total Debt = Current Debt + Long-Term Debt',
		bold: true,
	},
	{
		id: 'netcash',
		title: 'Net Cash / Debt',
		tooltip:
			'Net Cash / Debt is an indicator of the financial position of a company. It is calculated by taking the total amount of cash and cash equivalents and subtracting the total debt.',
		formula: 'Net Cash / Debt = Total Cash - Total Debt',
	},
	{
		id: 'netcashpershare',
		title: 'Net Cash Per Share',
		format: 'pershare',
		tooltip:
			'Net cash per share shows how much net cash is owned by each outstanding stock.',
		formula: 'Net Cash Per Share = (Net Cash / Debt) / Shares Outstanding',
	},
	{
		id: 'equity',
		title: "Shareholders' Equity",
		tooltip:
			'Shareholders’ equity is also called book value or net worth. It can be seen as the amount of money held by investors inside the company. It is calculated by subtracting all liabilities from all assets.',
		formula: "Shareholders' Equity = Total Assets - Total Liabilities",
		extrabold: true,
		border: true,
	},
	{
		id: 'bvps',
		title: 'Book Value Per Share',
		format: 'pershare',
		tooltip:
			"Book value per share is the total amount of book value attributable to each individual stock. It is calculated by dividing book value (shareholders' equity) by the number of outstanding shares.",
		formula: 'Book Value Per Share = Book Value / Shares Outstanding',
	},
	{
		id: 'workingcapital',
		title: 'Working Capital',
		tooltip:
			'Working capital is the amount of money available to a business to conduct its day-to-day operations. It is calculated by subtracting total current liabilities from total current assets.',
		formula: 'Working Capital = Current Assets - Current Liabilities',
	},
	{
		id: 'ncfo',
		title: 'Operating Cash Flow',
		tooltip:
			'Operating cash flow, also called cash flow from operating activities, measures the amount of cash that a company generates from normal business activities. It is the amount of cash left after all cash income has been received, and all cash expenses have been paid.',
		bold: true,
	},
	{
		id: 'capex',
		title: 'Capital Expenditures',
		tooltip:
			'Capital expenditures are also called payments for property, plants and equipment. It measures cash spent on long-term assets that will be used to run the business, such as manufacturing equipment, real estate and others.',
		indent: true,
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
		format: 'pershare',
		tooltip:
			'Free cash flow per share is the amount of free cash flow attributed to each outstanding stock.',
		formula: 'FCF Per Share = Free Cash Flow / Shares Outstanding',
	},
	{
		id: 'grossmargin',
		data: 'gp',
		title: 'Gross Margin',
		format: 'margin',
		tooltip:
			'Gross margin is the percentage of revenue left as gross profits, after subtracting cost of goods sold from the revenue.',
		formula: 'Gross Margin = (Gross Profit / Revenue) * 100%',
	},
	{
		id: 'operatingmargin',
		data: 'opinc',
		title: 'Operating Margin',
		format: 'margin',
		tooltip:
			'Operating margin is the percentage of revenue left as operating income, after subtracting cost of revenue and all operating expenses from the revenue.',
		formula: 'Operating Margin = (Operating Income / Revenue) * 100%',
	},
	{
		id: 'pretaxmargin',
		title: 'Pretax Margin',
		tooltip:
			'Pretax margin is the percentage of revenue left as profits before subtracting taxes.',
		formula: 'Pretax Margin = (Pretax Income / Revenue) * 100%',
	},
	{
		id: 'netmargin',
		data: 'netinc',
		title: 'Profit Margin',
		format: 'margin',
		tooltip:
			'Profit margin is the percentage of revenue left as net income, or profits, after subtracting all costs and expenses from the revenue.',
		formula: 'Profit Margin = (Net Income / Revenue) * 100%',
	},
	{
		id: 'ebitdamargin',
		data: 'ebitda',
		title: 'EBITDA Margin',
		format: 'margin',
		tooltip:
			'EBITDA margin is the percentage of revenue left as EBITDA, after subtracting all expenses except interest, taxes, depreciation and amortization from revenue.',
		formula: 'EBITDA Margin = (EBITDA / Revenue) * 100%',
		border: true,
		indent: true,
	},
	{
		id: 'ebitmargin',
		data: 'ebit',
		title: 'EBIT Margin',
		format: 'margin',
		tooltip:
			'EBIT Margin is a profitability ratio that measures the percentage of revenue left as EBIT (Earnings Before Interest and Taxes).',
		formula: 'EBIT Margin = (EBIT / Revenue) * 100%',
		indent: true,
	},
	{
		id: 'fcfmargin',
		data: 'fcf',
		title: 'Free Cash Flow Margin',
		format: 'margin',
		tooltip:
			'FCF margin is the percentage of revenue left as free cash flow. FCF is calculated by subtracting capital expenditures (CapEx) from the operating cash flow (OCF). Both CapEx and OCF are shown on the cash flow statement.',
		formula: 'FCF Margin = (Free Cash Flow / Revenue) * 100%',
	},
	{
		id: 'dps',
		title: 'Dividend Per Share',
		format: 'pershare',
		tooltip:
			'Total amount paid to each outstanding share in dividends during the period.',
		bold: true,
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
		id: 'dpsgrowth',
		data: 'dps',
		title: 'Dividend Growth',
		format: 'growth',
		tooltip:
			'The change in dividend payments per share, compared to the previous period.',
		formula:
			'Dividend Growth = ((Current Dividend / Previous Dividend) - 1) * 100%',
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
		id: 'splitdate',
		title: 'Last Split Date',
		tooltip: 'The date when the company last performed a stock split.',
	},
	{
		id: 'splittype',
		title: 'Split Type',
		tooltip:
			'There are two types of stock splits: Forward and Reverse. Forward means that the share count increases and the stock price goes down. Reverse means that the stock count decreases and the stock price goes up.',
	},
	{
		id: 'splitratio',
		title: 'Split Ratio',
		tooltip:
			'The split ratio, also called the split factor, is the ratio in which the amount of shares changes because of the stock split.',
	},
];
