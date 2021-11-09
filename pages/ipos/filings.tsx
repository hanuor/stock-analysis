import { GetStaticProps } from 'next';
import { News } from 'types/News';
import { IpoRecent, IpoUpcoming } from 'types/Ipos';
import { SEO } from 'components/SEO';
import { getIpoData } from 'functions/callBackEnd';
import { CalendarTable } from 'components/IPOs/CalendarTable';
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { RecentTableMin } from 'components/IPOs/RecentTableMin';
import { NewsWidget } from 'components/News/NewsWidget';
import { Sidebar1 } from 'components/Ads/Snigel/Sidebar1';
import { Sidebar2 } from 'components/Ads/Snigel/Sidebar2';
import { CalendarNavigation } from 'components/IPOs/IPONavigation/CalendarNavigation';

interface Props {
	data: IpoUpcoming[];
	news: News[];
	recent: IpoRecent[];
}

export const IpoFilings = ({ data, news, recent }: Props) => {
	const count = data.length;

	return (
		<>
			<SEO
				title="IPO Filings"
				description="A list of all stocks that have filed for an initial public offering (IPO) on the US stock market, but have not set an estimated IPO date yet."
				canonical="/ipos/filings/"
			/>
			<div className="contain">
				<main className="w-full pt-5 xs:pt-6">
					<Breadcrumbs url="/ipos/calendar/" />
					<h1 className="hh1">IPO Filings</h1>
					<IPONavigation path="calendar" />
					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div>
							<CalendarNavigation path="filings" />
							<div className="flex flex-col space-y-4 sm:space-y-7 py-2 lg:py-4">
								<CalendarTable
									title={`${count} IPOs`}
									data={data}
									tableId="filings"
									border={true}
									filter={true}
								/>
							</div>
						</div>
						<div className="flex flex-col lg:pt-4">
							<aside className="space-y-8 lg:space-y-10 pt-1">
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

export default IpoFilings;

export const getStaticProps: GetStaticProps = async () => {
	const { data, news, recent } = await getIpoData('filings');

	return {
		props: {
			data,
			news,
			recent,
		},
		revalidate: 5 * 60,
	};
};
