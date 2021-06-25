import Meta from '@/components/Meta';
import Header from '@/components/Layout/Header/_Header';
import Footer from '@/components/Layout/Footer/_Footer';
import { getIpoData } from '@/Functions/callBackEnd';
import IPONavigation from '@/components/IPOs/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';
import NewsFeed from '@/components/News/_NewsFeed';
import CalendarTableMin from '@/components/IPOs/CalendarTableMin';
import RecentTableMin from '@/components/IPOs/RecentTableMin';

const RecentIpos = ({ data }) => {
	return (
		<>
			<Meta title="IPO News" />
			<Header />
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
			<Footer />
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
		revalidate: 300,
	};
}
