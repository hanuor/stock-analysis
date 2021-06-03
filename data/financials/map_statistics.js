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
			format: 'none',
			tooltip:
				"The percentage of shares outstanding that are held by the company's insiders, such as company executives and major shareholders.",
		},
		{
			id: 'sharesInstitutions',
			title: 'Owned by Institutions (%)',
			format: 'none',
			tooltip:
				'The percentage of shares outstanding held by institutions, such as fund companies, pensions and others.',
		},
		{
			id: 'float',
			title: 'Float',
			format: 'none',
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
	];

	return MAP;
}
