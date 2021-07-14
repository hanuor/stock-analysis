import { SEO } from 'components/SEO';
import { getIpoData } from 'functions/callBackEnd';
import IPONavigation from 'components/IPOs/Navigation';
import Breadcrumbs from 'components/Breadcrumbs/_Breadcrumbs';
import NewsFeed from 'components/News/_NewsFeed';
import CalendarTableMin from 'components/IPOs/CalendarTableMin';
import RecentTableMin from 'components/IPOs/RecentTableMin';

const RecentIpos = ({ data }) => {
	return (
		<>
			<SEO
				title="Latest IPO News"
				description="The latest news about initial public offerings (IPOs) on the stock market, including both recent and upcoming IPOs."
				canonical="ipos/news/"
			/>
			<div className="">
				<main className="w-full py-5 xs:py-6">
					<div className="contain">
						<Breadcrumbs />
						<h1 className="hh1">IPO News</h1>
						<IPONavigation />
					</div>

					<div className="sm:contain lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-1">
							<NewsFeed data={data.data} related="Stocks" />
						</div>
						<aside className="contain sm:uncontain flex flex-col space-y-7 lg:space-y-10 py-6">
							<CalendarTableMin upcoming={data.upcoming} />
							<RecentTableMin recent={data.recent} />
						</aside>
					</div>
				</main>
			</div>
		</>
	);
};

export default RecentIpos;

export async function getStaticProps() {
	const data = await getIpoData('news');

	return {
		props: {
			data,
		},
		revalidate: 10 * 60,
	};
}
