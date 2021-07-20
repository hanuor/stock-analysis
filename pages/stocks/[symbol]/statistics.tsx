import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Info } from 'types/Info';
import { Statistics } from 'types/Statistics';
import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { getPageData } from 'functions/callBackEnd';
import { StatsWidget } from 'components/StatsWidget/_StatsWidget';
import { Button } from 'components/Button';
import { MAP_STATISTICS } from 'data/financials/map_statistics';

interface Props {
	info: Info;
	data: Statistics;
}

const StatisticsPage = ({ info, data }: Props) => {
	console.log(data);
	return (
		<Stock info={info}>
			<SEO
				title={`${info.name} (${info.ticker}) Stock Statistics & Valuation Metrics`}
				description={`Detailed statistics for ${info.name} (${info.ticker}) stock, including valuation metrics, financial numbers, share information and more.`}
				canonical={`stocks/${info.symbol}/statistics/`}
			/>
			<div className="contain pt-1 xs:pt-1.5 lg:pt-1 pb-10 space-y-5 xs:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-10 mt-5">
				<div className="flex flex-col space-y-5 xs:space-y-6 lg:space-y-8">
					<div>
						<StatsWidget
							title="Total Valuation"
							data={data.valuation}
							map={MAP_STATISTICS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Important Dates"
							data={data.dates}
							map={MAP_STATISTICS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Share Statistics"
							data={data.shares}
							map={MAP_STATISTICS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Valuation Ratios"
							data={data.ratios}
							map={MAP_STATISTICS}
						/>

						<Button
							text="Financial Ratio History"
							url={`/stocks/${info.symbol}/financials/ratios/`}
						/>
					</div>

					<div>
						<StatsWidget
							title="Enterprise Valuation"
							data={data.evratios}
							map={MAP_STATISTICS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Financial Position"
							data={data.financialPosition}
							map={MAP_STATISTICS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Financial Efficiency"
							data={data.financialEfficiency}
							map={MAP_STATISTICS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Taxes"
							data={data.taxes}
							map={MAP_STATISTICS}
						/>
					</div>
				</div>

				<div className="flex flex-col space-y-5 xs:space-y-6 lg:space-y-8">
					<div>
						<StatsWidget
							title="Stock Price Statistics"
							data={data.stockprice}
							map={MAP_STATISTICS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Short Selling Information"
							data={data.short}
							map={MAP_STATISTICS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Income Statement"
							data={data.income}
							map={MAP_STATISTICS}
						/>

						<Button
							text="Full Income Statement"
							url={`/stocks/${info.symbol}/financials/`}
						/>
					</div>

					<div>
						<StatsWidget
							title="Balance Sheet"
							data={data.balance}
							map={MAP_STATISTICS}
						/>

						<Button
							text="Full Balance Sheet"
							url={`/stocks/${info.symbol}/financials/balance-sheet/`}
						/>
					</div>

					<div>
						<StatsWidget
							title="Cash Flow"
							data={data.cashflow}
							map={MAP_STATISTICS}
						/>

						<Button
							text="Full Cash Flow Statement"
							url={`/stocks/${info.symbol}/financials/cash-flow-statement/`}
						/>
					</div>

					<div>
						<StatsWidget
							title="Margins"
							data={data.margins}
							map={MAP_STATISTICS}
						/>
					</div>
				</div>

				<div className="flex flex-col space-y-5 xs:space-y-6 lg:space-y-8">
					<div>
						<StatsWidget
							title="Dividends & Yields"
							data={data.dividends}
							map={MAP_STATISTICS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Stock Splits"
							data={data.splits}
							map={MAP_STATISTICS}
						/>
					</div>
				</div>
			</div>
		</Stock>
	);
};
export default StatisticsPage;

interface IParams extends ParsedUrlQuery {
	symbol: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams;
	const { info, data } = await getPageData('statistics', symbol);

	return {
		props: {
			key: symbol,
			info,
			data,
		},
		revalidate: 3600,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' };
};
