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
			<LatestNews news={props.data.news} />
			<IPOwidgets
				recent={props.data.recentIpos}
				upcoming={props.data.ipoCalendar}
			/>
		</LayoutFullWidth>
	);
}

export async function getStaticProps() {
	const data = await getHomePageData();

	return {
		props: {
			data,
		},
		revalidate: 180,
	};
}
