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
			<div className="px-4 lg:px-6 mx-auto md:grid md:grid-cols-3">
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
