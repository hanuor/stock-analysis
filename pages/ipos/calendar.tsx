import { GetStaticProps } from 'next';
import { CalendarData, IpoRecent, FilingMin } from 'types/Ipos';
import { SEO } from 'components/SEO';
import { getIpoData } from 'functions/callBackEnd';
import { CalendarStats } from 'components/IPOs/CalendarStats';
import { CalendarTable } from 'components/IPOs/CalendarTable';
import { LaterExplanation } from 'components/IPOs/LaterExplanation';
import { IPOSources } from 'components/IPOs/IPOSources';
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { RecentTableMin } from 'components/IPOs/RecentTableMin';
import { Sidebar1 } from 'components/Ads/Snigel/Sidebar1';
import { Mobile1 } from 'components/Ads/Snigel/Mobile1';
import { FilingTableMin } from 'components/IPOs/FilingTableMin';
import { CalendarNavigation } from 'components/IPOs/IPONavigation/CalendarNavigation';

interface Props {
	data: CalendarData;
	recent: IpoRecent[];
	filings: FilingMin[];
}

export const IpoCalendar = ({ data, recent, filings }: Props) => {
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
					<IPONavigation path="calendar" />
					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div>
							<CalendarNavigation path="calendar" />
							<div className="flex flex-col space-y-4 xs:space-y-5 sm:space-y-7 py-2 lg:py-4">
								<CalendarTable
									title="IPOs This Week"
									data={data.thisweek}
									tableId="this-week"
									border={true}
								/>
								<Mobile1 />
								<CalendarTable
									title="Next Week"
									data={data.nextweek}
									tableId="next-week"
								/>
								{data.later.length ? (
									<CalendarTable
										title="After Next Week"
										data={data.later}
										tableId="later"
									/>
								) : (
									<LaterExplanation />
								)}
								<IPOSources />
							</div>
						</div>
						<div className="flex flex-col pt-3 lg:pt-4">
							<aside className="space-y-8 lg:space-y-10">
								<CalendarStats counts={data.counts} />
								<RecentTableMin recent={recent} />
								<Sidebar1 />
								<FilingTableMin
									filings={filings}
									count={data.counts.unscheduled}
								/>
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
	const { data, recent, filings } = await getIpoData('calendar');

	return {
		props: {
			data,
			recent,
			filings,
		},
		revalidate: 5 * 60,
	};
};
