export default function balanceSheet() {
	const MAP = [
		{
			id: 'cashneq',
			title: 'Cash & Equivalents',
			tooltip:
				"Cash and equivalents is the amount of money on the company's accounts held as straight cash, or very liquid assets that can be sold for cash at a very short notice.",
		},
		{
			id: 'investmentsc',
			title: 'Short-Term Investments',
			tooltip:
				'Short-term investments are liquid assets like treasury bills, short-term bonds, money-market funds, marketable securities and other investments that can be sold for cash with a short notice.',
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
			id: 'cashgrowth',
			data: 'totalcash',
			title: 'Cash Growth',
			format: 'growth',
			tooltip:
				"Cash growth is how much a company's cash and cash equivalents have increased compared to a previous time period, expressed as a percentage.",
			formula: 'Cash Growth = ((Current Cash / Previous Cash) - 1) * 100%',
		},
		{
			id: 'receivables',
			title: 'Receivables',
			tooltip:
				'Receivables is the amount of money owed to the company for products or services that have been delivered, but not paid for yet. If a customer buys something on credit, it is listed under receivables (a current asset) on the balance sheet.',
		},
		{
			id: 'inventory',
			title: 'Inventory',
			tooltip:
				'Inventory is the value of product that is available for sale, as well as the value of purchased raw materials for making goods that will be sold. It also includes goods that are currently being produced from raw materials.',
		},
		{
			id: 'othercurrent',
			title: 'Other Current Assets',
			tooltip:
				'Other current assets includes all current assets that do not fit into any of the above categories.',
		},
		{
			id: 'assetsc',
			title: 'Total Current Assets',
			tooltip:
				'Total current assets includes all current assets, including cash and equivalents, short-term investments, receivables, inventory and others. Current assets are things that easily be sold for cash or will be used within one year.',
			bold: true,
			border: true,
		},
		{
			id: 'ppnenet',
			title: 'Property, Plant & Equipment',
			tooltip:
				'Property, Plant & Equipment (PP&E) are all long-term tangible or physical assets that are needed for business operations. It includes buildings, factories, machinery, furniture and others.',
		},
		{
			id: 'investmentsnc',
			title: 'Long-Term Investments',
			tooltip:
				'Long-term investments are investments that the company plans to hold for more than one year. It can include stocks, bonds, real estate and others.',
		},
		{
			id: 'intangibles',
			title: 'Goodwill and Intangibles',
			tooltip:
				'Includes goodwill and other assets that are intangible. Intangible assets are assets that provide some benefit for the company, but they are not physical assets that can be measured or counted. Examples include patents, intellectual property and copyrights.',
		},
		{
			id: 'othernoncurrent',
			title: 'Other Long-Term Assets',
			tooltip:
				'Other long-term assets include all long-term assets that do not fit into any of the categories above.',
		},
		{
			id: 'assetsnc',
			title: 'Total Long-Term Assets',
			tooltip:
				'Total long-term assets includes all long-term assets, including PP&E, goodwill, intangibles and others. Long-term (non-current) assets are things that can not be sold for cash easily or are considered to last for more than one year.',
			bold: true,
		},
		{
			id: 'assets',
			title: 'Total Assets',
			tooltip:
				'Total assets is the sum of all current and non-current assets on the balance sheet. Assets are everything that the company owns.',
			extrabold: true,
			border: true,
		},
		{
			id: 'payables',
			title: 'Accounts Payable',
			tooltip:
				'Accounts payable is the amount that the company owes to vendors and suppliers. The company has purchased products or services on credit, but has not paid for them yet.',
		},
		{
			id: 'deferredrev',
			title: 'Deferred Revenue',
			tooltip:
				"Deferred revenue includes payments that have been received in advance for products and services that have not yet been delivered. These revenues are listed as a liability on the company's balance sheet.",
		},
		{
			id: 'debtc',
			title: 'Current Debt',
			tooltip:
				'Current debt is company debt that needs to be paid within one year. It also includes the portion of long-term debt that is due within a year.',
		},
		{
			id: 'otherliabilitiescurrent',
			title: 'Other Current Liabilities',
			tooltip:
				'Other current liabilities are all current liabilities that do not fit into the categories above.',
		},
		{
			id: 'liabilitiesc',
			title: 'Total Current Liabilities',
			tooltip:
				'Total current liabilities are all financial obligations that the company owes and are due within one year. This includes accounts payable, deferred revenue, current debt and others.',
			bold: true,
			border: true,
		},
		{
			id: 'debtnc',
			title: 'Long-Term Debt',
			tooltip:
				'Long-term debt is debt that the company does not need to pay until after one year or more. It includes bank loans and bonds issued by the company.',
		},
		{
			id: 'otherliabilitiesnoncurrent',
			title: 'Other Long-Term Liabilities',
			tooltip:
				'Other long-term liabilities are all long-term (non-current) liabilities that are not categorized as long-term debt.',
		},
		{
			id: 'liabilitiesnc',
			title: 'Total Long-Term Liabilities',
			tooltip:
				'Total long-term liabilities are all long-term (non-current) financial obligations of the company, including long-term debt and others.',
			bold: true,
		},
		{
			id: 'liabilities',
			title: 'Total Liabilities',
			tooltip:
				'Total liabilities are all financial obligations of the company, including both current and long-term (non-current) liabilities. Liabilities are everything that the company owes.',
			formula:
				'Total Liabilities = Current Liabilities + Long-Term Liabilities',
			extrabold: true,
			border: true,
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
			id: 'debtgrowth',
			data: 'debt',
			title: 'Debt Growth',
			format: 'growth',
			tooltip:
				'Debt growth is the change in total debt compared to a previous period.',
			formula: 'Debt Growth = ((Current Debt / Previous Debt) - 1) * 100%',
		},
		{
			id: 'commonstocknet',
			data: 'commonstocknet',
			title: 'Common Stock',
			tooltip:
				"Common stock is the par value of the company's outstanding common stock, multiplied by the par value. This information is not very useful as the par value is usually set as an arbitrary amount of one cent.",
		},
		{
			id: 'retearn',
			title: 'Retained Earnings',
			tooltip:
				'Retained earnings are net income previously earned that has not been paid out to shareholders as dividends. If retained earnings are negative, they can be listed as "Accumulated Deficit" instead.',
		},
		{
			id: 'accoci',
			title: 'Comprehensive Income',
			tooltip:
				'Comprehensive income includes unrealized gains and losses that do not fall under retained earnings.',
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
			id: 'liabilitiesequity',
			title: 'Total Liabilities and Equity',
			tooltip:
				"Total liabilities and equity are calculated by adding up total liabilities and shareholders' equity. This number is identical to total assets.",
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
			id: 'netcashgrowth',
			data: 'netcash',
			title: 'Net Cash / Debt Growth',
			format: 'growth',
			tooltip:
				'The change in the net cash / debt position compared to a previous time period.',
			formula: 'Net Cash / Debt Growth = ((Current / Previous) - 1) * 100%',
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
			id: 'workingcapital',
			title: 'Working Capital',
			tooltip:
				'Working capital is the amount of money available to a business to conduct its day-to-day operations. It is calculated by subtracting total current liabilities from total current assets.',
			formula: 'Working Capital = Current Assets - Current Liabilities',
		},
		{
			id: 'bvps',
			title: 'Book Value Per Share',
			format: 'pershare',
			tooltip:
				"Book value per share is the total amount of book value attributable to each individual stock. It is calculated by dividing book value (shareholders' equity) by the number of outstanding shares.",
			formula: 'Book Value Per Share = Book Value / Shares Outstanding',
		},
	];

	return MAP;
}
