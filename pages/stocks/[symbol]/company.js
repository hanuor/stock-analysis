import Stock from '@/components/Layout/StockLayout';
import { getPageData, getStockInfo } from '@/Functions/fetchStockInfo';
import { stockState } from '@State/stockState';
import { useEffect } from 'react';
import ProfileDescription from '@/components/ProfilePage/ProfileDescription';

export default function SymbolStatistics({ info, data }) {
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);

	console.log(data);

	return (
		<Stock>
			<div className="contain">
				<h2 className="text-2xl font-bold">Company Description</h2>
				<ProfileDescription text={data.description} />
			</div>
		</Stock>
	);
}

export async function getStaticProps({ params }) {
	const info = await getStockInfo({ params });
	const data = await getPageData(info.id, 'profile');

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
