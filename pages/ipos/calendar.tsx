import { GetStaticProps } from 'next';
import { News } from 'types/News';
import { CalendarData, IpoRecent } from 'types/Ipos';
import { SEO } from 'components/SEO';
import { getIpoData } from 'functions/callBackEnd';
import { CalendarStats } from 'components/IPOs/CalendarStats';
import { CalendarTable } from 'components/IPOs/CalendarTable';
import { IPONavigation } from 'components/IPOs/IPONavigation';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { RecentTableMin } from 'components/IPOs/RecentTableMin';
import { NewsWidget } from 'components/News/NewsWidget';
import { Sidebar1 } from 'components/Ads/Snigel/Sidebar1';
import { Sidebar2 } from 'components/Ads/Snigel/Sidebar2';

interface Props {
	data: CalendarData;
	news: News[];
	recent: IpoRecent[];
}

export const IpoCalendar = ({ data, news, recent }: Props) => {
	return (
		<>
			<SEO
				title="IPO Calendar - All Upcoming IPOs"
				description="An IPO calendar with all upcoming initial public offerings (IPOs) on the stock market. Includes IPO dates, prices, how many shares are offered and more."
				canonical="/ipos/calendar/"
			/>
			<div className="contain">
				<main className="w-full pt-5 xs:pt-6">
					<Breadcrumbs url="/ipos/calendar/" />
					<h1 className="hh1">IPO Calendar</h1>
					<IPONavigation />
					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="flex flex-col space-y-5 sm:space-y-7 py-4">
							<CalendarTable
								title="IPOs This Week"
								data={data.thisweek}
								tableId="this-week"
							/>
							<CalendarTable
								title="Next Week"
								data={data.nextweek}
								tableId="next-week"
							/>
							<CalendarTable
								title="Scheduled for Later"
								data={data.later}
								tableId="later"
							/>
							<CalendarTable
								title="Upcoming High-Profile IPOs"
								data={data.highprofile}
								tableId="high-profile"
							/>
							<CalendarTable
								title="More Upcoming IPOs"
								data={data.unknown}
								tableId="more-upcoming"
							/>
						</div>
						<div className="flex flex-col lg:pt-4">
							<CalendarStats data={data} />
							<aside className="space-y-8 lg:space-y-10 pt-6">
								<RecentTableMin recent={recent} />
								<Sidebar1 />
								<NewsWidget
									title="IPO News"
									news={news}
									button={{
										text: 'More IPO News',
										url: '/ipos/news/',
									}}
								/>
								<Sidebar2 />
							</aside>
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default IpoCalendar;

export const getStaticProps: GetStaticProps = async () => {
	const { data, news, recent } = await getIpoData('calendar');

	return {
		props: {
			data,
			news,
			recent,
		},
		revalidate: 5 * 60,
	};
};
