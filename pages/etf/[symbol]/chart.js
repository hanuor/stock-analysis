import Stock from '@/components/Layout/StockLayout';
import { getPageData, getEtfInfo } from '@/Functions/callBackEnd';
import { stockState } from '@State/stockState';
import { useEffect } from 'react';

export default function SymbolStatistics({ info, data }) {
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);

	return (
		<Stock>
			<h2 className="text-2xl font-bold my-8">
				This is the chart page for {info.ticker}
			</h2>
		</Stock>
	);
}

export async function getStaticProps({ params }) {
	const info = await getEtfInfo({ params });
	const data = await getPageData(info.id, 'overview');

	return {
		props: {
			info,
			data,
		},
		revalidate: 300,
	};
}

export async function getStaticPaths() {
	return { paths: [], fallback: 'blocking' };
}
