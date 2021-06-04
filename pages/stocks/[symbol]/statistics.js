import Stock from '@/components/Layout/StockLayout';
import { getPageData, getStockInfo } from '@/Functions/fetchStockInfo';
import { stockState } from '@State/stockState';
import { useEffect } from 'react';
import StatsWidget from '@/components/StatsWidget/_StatsWidget';
import { fullMap } from '@Data/financials_data_map';

const indicator_map = fullMap();

export default function SymbolStatistics({ info, data }) {
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);

	return (
		<Stock>
			<div className="px-4 lg:px-6 mx-auto md:grid md:grid-cols-3 md:gap-8">
				<div>
					<StatsWidget
						title="Total Valuation"
						text={data.valuation.text}
						data={data.valuation.data}
						map={indicator_map}
					/>

					<StatsWidget
						title="Important Dates"
						text={data.dates.text}
						data={data.dates.data}
						map={indicator_map}
					/>

					<StatsWidget
						title="Share Statistics"
						text={data.shares.text}
						data={data.shares.data}
						map={indicator_map}
					/>

					<StatsWidget
						title="Valuation Ratios"
						text={data.ratios.text}
						data={data.ratios.data}
						map={indicator_map}
					/>

					<StatsWidget
						title="Enterprise Valuation"
						text={data.evratios.text}
						data={data.evratios.data}
						map={indicator_map}
					/>

					<StatsWidget
						title="Financial Position"
						text={data.financialPosition.text}
						data={data.financialPosition.data}
						map={indicator_map}
					/>

					<StatsWidget
						title="Financial Efficiency"
						text={data.financialEfficiency.text}
						data={data.financialEfficiency.data}
						map={indicator_map}
					/>

					<StatsWidget
						title="Taxes"
						text={data.taxes.text}
						data={data.taxes.data}
						map={indicator_map}
					/>
				</div>

				<div>
					<StatsWidget
						title="Stock Price Statistics"
						text={data.stockprice.text}
						data={data.stockprice.data}
						map={indicator_map}
					/>

					<StatsWidget
						title="Short Selling Information"
						text={data.short.text}
						data={data.short.data}
						map={indicator_map}
					/>

					<StatsWidget
						title="Income Statement"
						text={data.income.text}
						data={data.income.data}
						map={indicator_map}
					/>

					<StatsWidget
						title="Balance Sheet"
						text={data.balance.text}
						data={data.balance.data}
						map={indicator_map}
					/>

					<StatsWidget
						title="Cash Flow"
						text={data.cashflow.text}
						data={data.cashflow.data}
						map={indicator_map}
					/>

					<StatsWidget
						title="Margins"
						text={data.margins.text}
						data={data.margins.data}
						map={indicator_map}
					/>
				</div>

				<div>
					<StatsWidget
						title="Dividends & Yields"
						text={data.dividends.text}
						data={data.dividends.data}
						map={indicator_map}
					/>

					<StatsWidget
						title="Stock Splits"
						text={data.splits.text}
						data={data.splits.data}
						map={indicator_map}
					/>
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
