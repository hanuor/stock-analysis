import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Info } from 'types/Info';
import { FinancialsType } from 'types/Financials';
import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { SubNavigation } from 'components/FinancialTable/SubNavigation';
import { FinancialTable } from 'components/FinancialTable/_FinancialTable';
import { getStockFinancials } from 'functions/callBackEnd';
import { MAP_INCOME_STATEMENT } from 'data/financials/map_income_statement';

interface Props {
	info: Info;
	data: FinancialsType;
	counts: {
		annual: number;
		quarterly: number;
		trailing: number;
	};
}

export default function IncomeStatement({ info, data, counts }: Props) {
	return (
		<Stock info={info}>
			<SEO
				title={`${info.name} (${info.ticker}) Financial Statements: Income`}
				description={`Detailed financial statements for ${info.name} stock (${info.ticker}), including the income statement, balance sheet, and cash flow statement.`}
				canonical={`stocks/${info.symbol}/financials/`}
			/>
			<div className="px-4 lg:px-6 mx-auto">
				<SubNavigation info={info} statement="income_statement" />
				<FinancialTable
					statement="income_statement"
					financials={data}
					map={MAP_INCOME_STATEMENT}
					info={info}
					counts={counts}
				/>
			</div>
		</Stock>
	);
}

interface IParams extends ParsedUrlQuery {
	symbol: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams;
	return await getStockFinancials('income_statement', symbol, 3600);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' };
};
