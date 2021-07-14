import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { getPageData } from 'functions/callBackEnd';
import { stockState } from 'state/stockState';
import { useEffect } from 'react';
import StatsWidget from 'components/StatsWidget/_StatsWidget';
import { fullMap } from 'data/financials_map';
import Button from 'components/Button';

const INDICATORS = fullMap();

export default function Statistics({ info, data }) {
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);

	return (
		<Stock>
			<SEO
				title={`${info.name} (${info.ticker}) Stock Statistics & Valuation Metrics`}
				description={`Detailed statistics for ${info.name} (${info.ticker}) stock, including valuation metrics, financial numbers, share information and more.`}
				canonical={`stocks/${info.symbol}/statistics/`}
			/>
			<div className="contain pt-1 xs:pt-1.5 lg:pt-1 pb-10 space-y-5 xs:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-10">
				<div className="flex flex-col space-y-5 xs:space-y-6 lg:space-y-8">
					<div>
						<StatsWidget
							title="Total Valuation"
							data={data.valuation}
							map={INDICATORS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Important Dates"
							data={data.dates}
							map={INDICATORS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Share Statistics"
							data={data.shares}
							map={INDICATORS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Valuation Ratios"
							data={data.ratios}
							map={INDICATORS}
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
							map={INDICATORS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Financial Position"
							data={data.financialPosition}
							map={INDICATORS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Financial Efficiency"
							data={data.financialEfficiency}
							map={INDICATORS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Taxes"
							data={data.taxes}
							map={INDICATORS}
						/>
					</div>
				</div>

				<div className="flex flex-col space-y-5 xs:space-y-6 lg:space-y-8">
					<div>
						<StatsWidget
							title="Stock Price Statistics"
							data={data.stockprice}
							map={INDICATORS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Short Selling Information"
							data={data.short}
							map={INDICATORS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Income Statement"
							data={data.income}
							map={INDICATORS}
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
							map={INDICATORS}
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
							map={INDICATORS}
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
							map={INDICATORS}
						/>
					</div>
				</div>

				<div className="flex flex-col space-y-5 xs:space-y-6 lg:space-y-8">
					<div>
						<StatsWidget
							title="Dividends & Yields"
							data={data.dividends}
							map={INDICATORS}
						/>
					</div>

					<div>
						<StatsWidget
							title="Stock Splits"
							data={data.splits}
							map={INDICATORS}
						/>
					</div>
				</div>
			</div>
		</Stock>
	);
}

export async function getStaticPaths() {
	return { paths: [], fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
	const { info, data } = await getPageData('statistics', params.symbol);

	return {
		props: {
			info,
			data,
		},
		revalidate: 3600,
	};
}
