import Stock from '@/components/Layout/StockLayout';
import { getPageData, getStockInfo } from '@/Functions/fetchStockInfo';
import { stockState } from '@State/stockState';
import { useEffect } from 'react';
import ProfileDescription from '@/components/ProfilePage/ProfileDescription';
import ProfileInfo from '@/components/ProfilePage/ProfileInfo';
import ProfileContact from '@/components/ProfilePage/ProfileContact';
import ProfileDetails from '@/components/ProfilePage/ProfileDetails';

export default function SymbolStatistics({ info, data }) {
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);

	return (
		<Stock>
			<div className="contain">
				<div className="flex flex-col space-y-6 lg:space-y-0 lg:grid lg:grid-cols-sidebar lg:gap-10">
					<div className="">
						<ProfileDescription text={data.description} />
					</div>

					<div className="">
						<ProfileInfo info={data.info} logo={data.logo} />
					</div>

					<div className="">
						<ProfileContact contact={data.contact} />
					</div>

					<div className="">
						<ProfileDetails details={data.stockDetails} />
					</div>
				</div>
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
