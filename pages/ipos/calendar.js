import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import { getIpoData } from '@/Functions/fetchStockInfo';
import CalendarTable from '@/components/IPOs/CalendarTable';
import IPONavigation from '@/components/IPOs/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';
import RecentTableMin from '@/components/IPOs/RecentTableMin';
import NewsWidget from '@/components/News/NewsWidget';

const IpoCalendar = ({ data }) => {
	return (
		<>
			<Meta title="IPO Calendar" />
			<Header />
			<div className="contain">
				<main className="w-full py-6">
					<Breadcrumbs />
					<h1 className="hh1">IPO Calendar</h1>
					<IPONavigation />
					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="flex flex-col space-y-5 sm:space-y-7 py-4">
							<CalendarTable
								title="This Week"
								data={data.data.thisweek}
							/>
							<CalendarTable
								title="Next Week or Later"
								data={data.data.nextweek}
							/>
							<CalendarTable
								title="Upcoming High-Profile IPOs"
								data={data.data.highprofile}
							/>
							<CalendarTable
								title="More Upcoming IPOs"
								data={data.data.unknown}
							/>
						</div>
						<aside className="flex flex-col space-y-10 pt-4 pb-6 lg:py-6">
							<RecentTableMin recent={data.recent} />
							<NewsWidget
								title="IPO News"
								news={data.news}
								button={{
									text: 'More IPO News',
									url: '/ipos/news/',
								}}
							/>
						</aside>
					</div>
				</main>
			</div>
			<Footer />
		</>
	);
};

export default IpoCalendar;

export async function getStaticProps() {
	const data = await getIpoData('calendar');

	return {
		props: {
			data,
		},
		revalidate: 300,
	};
}