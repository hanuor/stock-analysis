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

export const IposWithdrawn = ({ data, news, recent }: Props) => {
	const count = data.length;

	return (
		<>
			<SEO
				title="Withdrawn IPOs"
				description="A list of companies that have withdrawn their U.S. stock market IPO within the last year."
				canonical="/ipos/withdrawn/"
			/>
			<div className="contain">
				<main className="w-full pt-5 xs:pt-6">
					<Breadcrumbs url="/ipos/withdrawn/" />
					<h1 className="hh1">Withdrawn IPOs</h1>
					<IPONavigation path="calendar" />
					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div>
							<CalendarNavigation path="withdrawn" />
							<div className="py-2 lg:py-4">
								<CalendarTable
									title={`${count} IPOs`}
									data={data}
									tableId="withdrawn"
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

export default IposWithdrawn;

export const getStaticProps: GetStaticProps = async () => {
	const { data, news, recent } = await getIpoData('withdrawn');

	return {
		props: {
			data,
			news,
			recent,
		},
		revalidate: 5 * 60,
	};
};
