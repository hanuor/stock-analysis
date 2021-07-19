import { GetStaticProps } from 'next';
import { IpoRecent } from 'types/IpoRecent';
import { IpoUpcoming } from 'types/IpoUpcoming';
import { News } from 'types/News';
import { getIpoData } from 'functions/callBackEnd';
import { SEO } from 'components/SEO';
import { RecentTable } from 'components/IPOs/RecentTable';
import { IPONavigation } from 'components/IPOs/IPONavigation';
import { SubNavigation } from 'components/IPOs/SubNavigation';
import Breadcrumbs from 'components/Breadcrumbs/_Breadcrumbs';
import { CalendarTableMin } from 'components/IPOs/CalendarTableMin';
import { NewsWidget } from 'components/News/NewsWidget';

interface Props {
	data: IpoRecent[];
	news: News[];
	upcoming: IpoUpcoming[];
}

export const RecentIpos = ({ data, news, upcoming }: Props) => {
	return (
		<>
			<SEO
				title="All Recent IPOs"
				description="Detailed information on all the recent IPOs (initial public offerings) on the stock market. Includes an IPO calendar, news and more."
				canonical="ipos/"
			/>
			<div className="contain">
				<main className="w-full py-5 xs:py-6">
					<Breadcrumbs />
					<h1 className="hh1">Recent IPOs</h1>
					<IPONavigation />

					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div>
							<SubNavigation />
							<RecentTable rawdata={data} />
						</div>
						<aside className="flex flex-col space-y-10 py-6">
							<CalendarTableMin upcoming={upcoming} />
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

export default RecentIpos;

export const getStaticProps: GetStaticProps = async () => {
	const { data, news, upcoming } = await getIpoData('recent');

	return {
		props: {
			data,
			news,
			upcoming,
		},
		revalidate: 10 * 60,
	};
};
