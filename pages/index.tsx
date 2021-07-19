import { GetStaticProps } from 'next';
import { LayoutFullWidth } from 'components/Layout/LayoutFullWidth';
import { SEO } from 'components/SEO';
import Hero from 'components/HomePage/Hero';
import Movers from 'components/HomePage/Movers';
import LatestNews from 'components/HomePage/LatestNews';
import IPOwidgets from 'components/HomePage/IPOwidgets';
import { getHomePageData } from 'functions/callBackEnd';

interface FrontPageProps {
	data: {
		date: string;
		marketStatus: string;
		gainers: Array<object>;
		losers: Array<object>;
		ipoCalendar: Array<object>;
		recentIpos: Array<object>;
		news: Array<object>;
	};
}

export default function FrontPage({ data }: FrontPageProps) {
	return (
		<>
			<SEO
				title="Stock Analysis | Free Online Stock Information for Investors"
				description="Stock Analysis has everything you need to analyze stocks, including detailed financial data, news, charts and information on new and upcoming IPOs."
				canonical=""
			/>
			<LayoutFullWidth>
				<Hero />
				<Movers data={data} />
				<div className="mx-auto flex flex-col space-y-6 pb-12 lg:grid lg:grid-cols-3 lg:justify-evenly lg:gap-4 lg:max-w-[1200px]">
					<LatestNews news={data.news} />
					<IPOwidgets
						recent={data.recentIpos}
						upcoming={data.ipoCalendar}
					/>
				</div>
			</LayoutFullWidth>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const data = await getHomePageData();

	return {
		props: {
			data,
		},
		revalidate: 5 * 60,
	};
};
