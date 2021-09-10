import { GetStaticProps } from 'next';
import { News } from 'types/News';
import { IpoUpcoming } from 'types/IpoUpcoming';
import { IpoRecent } from 'types/IpoRecent';
import { SEO } from 'components/SEO';
import { getIpoData } from 'functions/callBackEnd';
import { CalendarTable } from 'components/IPOs/CalendarTable';
import { IPONavigation } from 'components/IPOs/IPONavigation';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { RecentTableMin } from 'components/IPOs/RecentTableMin';
import { NewsWidget } from 'components/News/NewsWidget';
import { NewsletterWidget } from 'components/Layout/Sidebar/Newsletter';

interface Props {
	data: {
		thisweek: IpoUpcoming[];
		nextweek: IpoUpcoming[];
		highprofile: IpoUpcoming[];
		unknown: IpoUpcoming[];
	};
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
								title="Next Week or Later"
								data={data.nextweek}
								tableId="next-week"
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
						<aside className="flex flex-col space-y-10 pt-4 pb-6">
							<RecentTableMin recent={recent} />
							<NewsletterWidget />
							<NewsWidget
								title="IPO News"
								news={news}
								button={{
									text: 'More IPO News',
									url: '/ipos/news/',
								}}
							/>
						</aside>
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
