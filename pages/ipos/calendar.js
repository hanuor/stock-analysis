import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import Sidebar from '@/components/Layout/Sidebar/_Sidebar';
import { getIpoData } from '@/Functions/fetchStockInfo';
import CalendarTable from '@/components/IPOTable/CalendarTable';
import IPONavigation from '@/components/IPONavigation/_IPONavigation';
import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';

const IpoCalendar = ({ data }) => {
	return (
		<>
			<Meta title="IPO Calendar" />
			<Header />
			<div className="contain lg:grid lg:grid-cols-sidebar gap-x-10">
				<main className="w-full py-6">
					<Breadcrumbs />
					<h1 className="hh1">IPO Calendar</h1>
					<IPONavigation />
					<div className="flex flex-col space-y-7">
						<CalendarTable title="This Week" data={data.thisweek} />
						<CalendarTable
							title="Next Week or Later"
							data={data.nextweek}
						/>
						<CalendarTable
							title="Upcoming High-Profile IPOs"
							data={data.highprofile}
						/>
						<CalendarTable
							title="More Upcoming IPOs"
							data={data.unknown}
						/>
					</div>
				</main>
				<div className="py-6">
					<Sidebar />
				</div>
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
