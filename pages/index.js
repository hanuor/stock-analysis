import LayoutFullWidth from '@/Layout/LayoutFullWidth';
import Hero from '@/components/HomePage/Hero';
import Movers from '@/components/HomePage/Movers';
import LatestNews from '@/components/HomePage/LatestNews';
import IPOwidgets from '@/components/HomePage/IPOwidgets';
import { getHomePageData } from '@/Functions/fetchStockInfo';

export default function FrontPage(props) {
	return (
		<LayoutFullWidth title="Home Page">
			<Hero />
			<Movers data={props.data} />
			<div className="mx-auto flex flex-col space-y-6 pb-12 lg:grid lg:grid-cols-3 lg:justify-evenly lg:gap-4 lg:max-w-[1200px]">
				<LatestNews news={props.data.news} />
				<IPOwidgets
					recent={props.data.recentIpos}
					upcoming={props.data.ipoCalendar}
				/>
			</div>
		</LayoutFullWidth>
	);
}

export async function getStaticProps() {
	const data = await getHomePageData();

	return {
		props: {
			data,
		},
		revalidate: 300,
	};
}
