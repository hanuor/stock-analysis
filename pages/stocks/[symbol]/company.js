import Stock from '@/components/Layout/StockLayout';
import { getPageData, getStockInfo } from '@/Functions/fetchStockInfo';
import { stockState } from '@State/stockState';
import { useEffect } from 'react';
import ProfileDescription from '@/components/ProfilePage/ProfileDescription';
import ProfileInfo from '@/components/ProfilePage/ProfileInfo';
import ProfileContact from '@/components/ProfilePage/ProfileContact';
import ProfileDetails from '@/components/ProfilePage/ProfileDetails';
import ProfileExecutives from '@/components/ProfilePage/ProfileExecutives';
import ProfileSECfilings from '@/components/ProfilePage/ProfileSECfilings';

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
				<div className="float-none lg:float-left lg:profilewrap">
					<ProfileDescription text={data.description} />
				</div>

				<div className="float-none lg:float-right lg:max-w-[336px]">
					<ProfileInfo info={data.info} logo={data.logo} />
					<ProfileContact contact={data.contact} />
					<ProfileDetails details={data.stockDetails} />
				</div>

				<div className="float-none lg:float-left lg:profilewrap">
					<ProfileExecutives executives={data.executives} />
					<ProfileSECfilings
						filings={data.secFilings}
						cik={data.stockDetails.cik}
					/>
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
