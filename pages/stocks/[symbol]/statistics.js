import Stock from 'components/Layout/StockLayout';
import { getPageData, getStockInfo } from 'functions/callBackEnd';
import { stockState } from 'state/stockState';
import { useEffect } from 'react';
import StatsWidget from 'components/StatsWidget/_StatsWidget';
import { fullMap } from 'data/financials_data_map';
import Button from 'components/Button';

const indicator_map = fullMap();

export default function Statistics({ info, data }) {
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);

	return (
		<Stock>
			<div className="contain pt-1 xs:pt-1.5 lg:pt-1 pb-10 space-y-5 xs:space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-10">
				<div className="flex flex-col space-y-5 xs:space-y-6 lg:space-y-8">
					<div>
						<StatsWidget
							title="Total Valuation"
							data={data.valuation}
							map={indicator_map}
						/>
					</div>

					<div>
						<StatsWidget
							title="Important Dates"
							data={data.dates}
							map={indicator_map}
						/>
					</div>

					<div>
						<StatsWidget
							title="Share Statistics"
							data={data.shares}
							map={indicator_map}
						/>
					</div>

					<div>
						<StatsWidget
							title="Valuation Ratios"
							data={data.ratios}
							map={indicator_map}
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
							map={indicator_map}
						/>
					</div>

					<div>
						<StatsWidget
							title="Financial Position"
							data={data.financialPosition}
							map={indicator_map}
						/>
					</div>

					<div>
						<StatsWidget
							title="Financial Efficiency"
							data={data.financialEfficiency}
							map={indicator_map}
						/>
					</div>

					<div>
						<StatsWidget
							title="Taxes"
							data={data.taxes}
							map={indicator_map}
						/>
					</div>
				</div>

				<div className="flex flex-col space-y-5 xs:space-y-6 lg:space-y-8">
					<div>
						<StatsWidget
							title="Stock Price Statistics"
							data={data.stockprice}
							map={indicator_map}
						/>
					</div>

					<div>
						<StatsWidget
							title="Short Selling Information"
							data={data.short}
							map={indicator_map}
						/>
					</div>

					<div>
						<StatsWidget
							title="Income Statement"
							data={data.income}
							map={indicator_map}
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
							map={indicator_map}
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
							map={indicator_map}
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
							map={indicator_map}
						/>
					</div>
				</div>

				<div className="flex flex-col space-y-5 xs:space-y-6 lg:space-y-8">
					<div>
						<StatsWidget
							title="Dividends & Yields"
							data={data.dividends}
							map={indicator_map}
						/>
					</div>

					<div>
						<StatsWidget
							title="Stock Splits"
							data={data.splits}
							map={indicator_map}
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
	const info = await getStockInfo({ params });
	const data = await getPageData(info.id, 'statistics');

	return {
		props: {
			info,
			data,
		},
	};
}
