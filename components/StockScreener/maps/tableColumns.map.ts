import { FilterId } from '../screener.types';
import {
	priceSort,
	dateSort,
} from 'components/StockScreener/functions/sort/sortFunctions';

type Column = {
	Header: string;
	accessor: FilterId;
	format?:
		| 'string'
		| 'linkSymbol'
		| 'amount'
		| 'align'
		| 'abbreviate'
		| 'format0dec'
		| 'format2dec'
		| 'changePcColor'
		| 'percentage'
		| 'date'
		| 'marketcap'
		| 'padleft';
	sortType?: any;
	sortInverted?: boolean;
};

export const COLUMNS_MAP: Column[] = [
	{
		Header: 'Symbol',
		accessor: 's',
		format: 'linkSymbol',
	},
	{
		Header: 'Company Name',
		accessor: 'n',
		format: 'string',
	},
	{
		Header: 'Market Cap',
		accessor: 'm',
		format: 'marketcap',
	},
	{
		Header: 'Sector',
		accessor: 'se',
		format: 'padleft',
	},
	{
		Header: 'Industry',
		accessor: 'i',
	},
	{
		Header: 'Enterprise Value',
		accessor: 'ev',
		format: 'abbreviate',
	},
	{
		Header: 'Exchange',
		accessor: 'exchange',
	},
	{
		Header: 'Analyst Ratings',
		accessor: 'ar',
		format: 'align',
	},
	{
		Header: 'Count',
		accessor: 'ac',
		format: 'align',
	},
	{
		Header: 'Price',
		accessor: 'p',
		format: 'amount',
	},
	{
		Header: 'Change 1D',
		accessor: 'c',
		format: 'changePcColor',
	},
	{
		Header: 'Volume',
		accessor: 'v',
		format: 'format0dec',
	},
	{
		Header: 'PE Ratio',
		accessor: 'pe',
		format: 'format2dec',
	},
	{
		Header: 'Country',
		accessor: 'country',
	},
	{
		Header: 'Employees',
		accessor: 'employees',
		format: 'format0dec',
	},
	{
		Header: 'Founded',
		accessor: 'founded',
		format: 'align',
	},
	{
		Header: 'IPO Date',
		accessor: 'ipoDate',
		format: 'date',
		sortType: dateSort,
	},
	{
		Header: 'Revenue',
		accessor: 'revenue',
		format: 'abbreviate',
	},
	{
		Header: 'Forward PE',
		accessor: 'fpe',
		format: 'format2dec',
	},
	{
		Header: 'P/S',
		accessor: 'ps',
		format: 'format2dec',
	},
	{
		Header: 'P/B',
		accessor: 'pb',
		format: 'format2dec',
	},
	{
		Header: 'P/FCF',
		accessor: 'pfcf',
		format: 'format2dec',
	},
	{
		Header: 'Target',
		accessor: 'pt',
		format: 'amount',
	},
	{
		Header: 'Target (%)',
		accessor: 'ptc',
		format: 'changePcColor',
	},
	{
		Header: 'Dividend',
		accessor: 'dps',
		format: 'format2dec',
	},
	{
		Header: 'Yield (%)',
		accessor: 'dy',
		format: 'percentage',
	},
	{
		Header: 'Payout Ratio',
		accessor: 'pr',
		format: 'percentage',
	},
	{
		Header: 'Div. Growth',
		accessor: 'dg',
		format: 'percentage',
	},
	{
		Header: 'Rev. Growth (1Y)',
		accessor: 'revenueGrowth',
		format: 'percentage',
	},
	{
		Header: 'Gross Profit',
		accessor: 'grossProfit',
		format: 'abbreviate',
	},
	{
		Header: 'Op. Income',
		accessor: 'operatingIncome',
		format: 'abbreviate',
	},
	{
		Header: 'Net Income',
		accessor: 'netIncome',
		format: 'abbreviate',
	},
	{
		Header: 'Net Income Growth',
		accessor: 'netIncomeGrowth',
		format: 'percentage',
	},
	{
		Header: 'EPS',
		accessor: 'eps',
		format: 'format2dec',
	},
	{
		Header: 'EPS Growth',
		accessor: 'epsGrowth',
		format: 'percentage',
	},
	{
		Header: 'EBIT',
		accessor: 'ebit',
		format: 'abbreviate',
	},
	{
		Header: 'EBITDA',
		accessor: 'ebitda',
		format: 'abbreviate',
	},
	{
		Header: 'Op. Cash Flow',
		accessor: 'ocf',
		format: 'abbreviate',
	},
	{
		Header: 'Free Cash Flow',
		accessor: 'fcf',
		format: 'abbreviate',
	},
	{
		Header: 'FCF Growth',
		accessor: 'fcfGrowth',
		format: 'percentage',
	},
	{
		Header: 'FCF / Share',
		accessor: 'fcfps',
		format: 'format2dec',
	},
	{
		Header: 'Total Cash',
		accessor: 'cash',
		format: 'abbreviate',
	},
	{
		Header: 'Total Debt',
		accessor: 'debt',
		format: 'abbreviate',
	},
	{
		Header: 'Net Cash / Debt',
		accessor: 'netCash',
		format: 'abbreviate',
	},
	{
		Header: 'Net Cash Growth',
		accessor: 'netCashGrowth',
		format: 'percentage',
	},
	{
		Header: 'Gross Mrg.',
		accessor: 'grossMargin',
		format: 'percentage',
	},
	{
		Header: 'Oper. Mrg.',
		accessor: 'operatingMargin',
		format: 'percentage',
	},
	{
		Header: 'Profit Mrg.',
		accessor: 'profitMargin',
		format: 'percentage',
	},
	{
		Header: 'FCF Mrg.',
		accessor: 'fcfMargin',
		format: 'percentage',
	},
	{
		Header: 'EBITDA Mrg.',
		accessor: 'ebitdaMargin',
		format: 'percentage',
	},
	{
		Header: 'EBIT Mrg.',
		accessor: 'ebitMargin',
		format: 'percentage',
	},
	{
		Header: 'PEG Ratio',
		accessor: 'peg',
		format: 'format2dec',
	},
	{
		Header: 'EV/Sales',
		accessor: 'evSales',
		format: 'format2dec',
	},
	{
		Header: 'EV/Earnings',
		accessor: 'evEarnings',
		format: 'format2dec',
	},
	{
		Header: 'EV/EBITDA',
		accessor: 'evEbitda',
		format: 'format2dec',
	},
	{
		Header: 'EV/EBIT',
		accessor: 'evEbit',
		format: 'format2dec',
	},
	{
		Header: 'EV/FCF',
		accessor: 'evFcf',
		format: 'format2dec',
	},
	{
		Header: 'Earn. Yield',
		accessor: 'earningsYield',
		format: 'percentage',
	},
	{
		Header: 'FCF Yield',
		accessor: 'fcfYield',
		format: 'percentage',
	},
	{
		Header: 'Buyback Yield',
		accessor: 'buybackYield',
		format: 'percentage',
	},
	{
		Header: 'Total Return',
		accessor: 'totalReturn',
		format: 'percentage',
	},
	{
		Header: 'Av. Volume',
		accessor: 'averageVolume',
		format: 'format0dec',
	},
	{
		Header: 'Chg. 1M',
		accessor: 'ch1m',
		format: 'changePcColor',
	},
	{
		Header: 'Chg. 6M',
		accessor: 'ch6m',
		format: 'changePcColor',
	},
	{
		Header: 'Chg. YTD',
		accessor: 'chYTD',
		format: 'changePcColor',
	},
	{
		Header: 'Chg. 1Y',
		accessor: 'ch1y',
		format: 'changePcColor',
	},
	{
		Header: 'Chg. 3Y',
		accessor: 'ch3y',
		format: 'changePcColor',
	},
	{
		Header: 'Chg. 5Y',
		accessor: 'ch5y',
		format: 'changePcColor',
	},
	{
		Header: 'Short/Float',
		accessor: 'shortFloat',
		format: 'percentage',
	},
	{
		Header: 'Short/Shares',
		accessor: 'shortShares',
		format: 'percentage',
	},
	{
		Header: 'Sh. Ratio',
		accessor: 'shortRatio',
		format: 'format2dec',
	},
	{
		Header: 'Beta',
		accessor: 'beta',
		format: 'format2dec',
	},
	{
		Header: 'Shares Out',
		accessor: 'sharesOut',
		format: 'abbreviate',
	},
	{
		Header: 'Float',
		accessor: 'float',
		format: 'abbreviate',
	},
	{
		Header: 'Shares Change (YoY)',
		accessor: 'sharesYoY',
		format: 'percentage',
	},
	{
		Header: 'Shares Change (QoQ)',
		accessor: 'sharesQoQ',
		format: 'percentage',
	},
	{
		Header: 'Owned Insiders',
		accessor: 'sharesInsiders',
		format: 'percentage',
	},
	{
		Header: 'Owned Institutions',
		accessor: 'sharesInstitutions',
		format: 'percentage',
	},
	{
		Header: 'Earnings Date',
		accessor: 'earningsDate',
		format: 'date',
	},
	{
		Header: 'Ex-Div Date',
		accessor: 'exDivDate',
		format: 'date',
	},
	{
		Header: 'Next Ex-Div',
		accessor: 'nextDivDate',
		format: 'date',
	},
	{
		Header: 'ROE',
		accessor: 'roe',
		format: 'percentage',
	},
	{
		Header: 'ROA',
		accessor: 'roa',
		format: 'percentage',
	},
	{
		Header: 'ROIC',
		accessor: 'roic',
		format: 'percentage',
	},
	{
		Header: 'Rev / Employee',
		accessor: 'revPerEmployee',
		format: 'format0dec',
	},
	{
		Header: 'Prof / Employee',
		accessor: 'profitPerEmployee',
		format: 'format0dec',
	},
	{
		Header: 'Asset Turn.',
		accessor: 'assetTurnover',
		format: 'format2dec',
	},
	{
		Header: 'Inv. Turn.',
		accessor: 'inventoryTurnover',
		format: 'format2dec',
	},
	{
		Header: 'Current Ratio',
		accessor: 'currentRatio',
		format: 'format2dec',
	},
	{
		Header: 'Quick Ratio',
		accessor: 'quickRatio',
		format: 'format2dec',
	},
	{
		Header: 'Debt / Equity',
		accessor: 'debtEquity',
		format: 'format2dec',
	},
	{
		Header: 'Debt / EBITDA',
		accessor: 'debtEbitda',
		format: 'format2dec',
	},
	{
		Header: 'Debt / FCF',
		accessor: 'debtFcf',
		format: 'format2dec',
	},
	{
		Header: 'Tax Rate',
		accessor: 'taxRate',
		format: 'percentage',
	},
	{
		Header: 'Tax / Revenue',
		accessor: 'taxByRevenue',
		format: 'percentage',
	},
	{
		Header: 'Equity',
		accessor: 'equity',
		format: 'abbreviate',
	},
	{
		Header: 'Working Capital',
		accessor: 'workingCapital',
		format: 'abbreviate',
	},
	{
		Header: 'Last Split',
		accessor: 'ls',
		format: 'align',
	},
	{
		Header: 'Split Date',
		accessor: 'splitDate',
		format: 'date',
	},
	{
		Header: 'Liabilities',
		accessor: 'liabilities',
		format: 'abbreviate',
	},
	{
		Header: 'Inv. Cash Flow',
		accessor: 'icf',
		format: 'abbreviate',
	},
	{
		Header: 'Fin. Cash Flow',
		accessor: 'cff',
		format: 'abbreviate',
	},
	{
		Header: 'Net Cash Flow',
		accessor: 'ncf',
		format: 'abbreviate',
	},
	{
		Header: 'Capital Exp.',
		accessor: 'capex',
		format: 'abbreviate',
	},
	{
		Header: 'IPO Price',
		accessor: 'ipoPriceRange',
		format: 'string',
		sortType: priceSort,
	},
	{
		Header: 'Is SPAC',
		accessor: 'spac',
		format: 'string',
	},
	{
		Header: 'Exchange',
		accessor: 'etfExchange',
		format: 'string',
	},
	{
		Header: 'Shares Out',
		accessor: 'etfSharesOut',
		format: 'abbreviate',
	},
	{
		Header: 'Assets',
		accessor: 'assets',
		format: 'abbreviate',
	},
	{
		Header: 'Asset Class',
		accessor: 'assetClass',
		format: 'string',
	},
	{
		Header: 'Expense Ratio',
		accessor: 'etfExpenseRatio',
		format: 'format2dec',
	},
	{
		Header: 'PE Ratio',
		accessor: 'etfPeRatio',
		format: 'format2dec',
	},
	{
		Header: 'Holdings',
		accessor: 'etfHoldings',
		format: 'format0dec',
	},
	{
		Header: 'Yield (%)',
		accessor: 'etfDividendYield',
		format: 'percentage',
	},
	{
		Header: 'Beta',
		accessor: 'etfBeta',
		format: 'format2dec',
	},
	{
		Header: 'Ex Div. Date',
		accessor: 'etfExDividendDate',
		format: 'date',
	},
	{
		Header: 'Inception Date',
		accessor: 'etfInceptionDate',
		format: 'date',
	},
	{
		Header: 'Sector',
		accessor: 'etfSector',
		format: 'padleft',
	},
	{
		Header: 'Region',
		accessor: 'etfRegion',
		format: 'string',
	},
];
