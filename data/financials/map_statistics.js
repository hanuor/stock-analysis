export default function statistics() {
	const MAP = [
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
			id: 'forwardpe',
			title: 'Forward PE',
			format: 'none',
			tooltip:
				'The forward price-to-earnings (P/E) ratio is like the PE ratio, except that it uses the estimated earnings over the next year instead of historical earnings.',
			formula: 'Forward PE = Stock Price / 1Y Forward EPS',
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
			id: 'quickratio',
			title: 'Quick Ratio',
			tooltip:
				"The quick ratio measure a company's short-term liquidity. A low number indicates that the company may have trouble paying its upcoming financial obligations.",
			formula:
				'Quick Ratio = (Cash + Short-Term Investments + Accounts Receivable) / Current Liabilities',
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
			id: 'inventoryturnover',
			title: 'Inventory Turnover',
			tooltip:
				'The inventory turnover ratio measures how many times inventory has been sold and replaced during a time period.',
			formula:
				'Inventory Turnover Ratio = Cost of Revenue / Average Inventory',
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
			id: 'pretaxmargin',
			title: 'Pretax Margin',
			tooltip:
				'Pretax margin is the percentage of revenue left as profits before subtracting taxes.',
			formula: 'Pretax Margin = (Pretax Income / Revenue) * 100%',
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

	return MAP;
}
