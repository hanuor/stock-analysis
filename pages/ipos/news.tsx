import { GetStaticProps } from 'next';
import { News } from 'types/News';
import { IpoUpcoming } from 'types/IpoUpcoming';
import { IpoRecent } from 'types/IpoRecent';
import { SEO } from 'components/SEO';
import { getIpoData } from 'functions/callBackEnd';
import { IPONavigation } from 'components/IPOs/IPONavigation';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { NewsFeed } from 'components/News/_NewsFeed';
import { CalendarTableMin } from 'components/IPOs/CalendarTableMin';
import { RecentTableMin } from 'components/IPOs/RecentTableMin';

interface Props {
	data: News[];
	upcoming: IpoUpcoming[];
	recent: IpoRecent[];
}

export const IpoNews = ({ data, upcoming, recent }: Props) => {
	return (
		<>
			<SEO
				title="Latest IPO News"
				description="The latest news about initial public offerings (IPOs) on the stock market, including both recent and upcoming IPOs."
				canonical="/ipos/news/"
			/>
			<div className="">
				<main className="w-full pt-5 xs:pt-6">
					<div className="contain">
						<Breadcrumbs url="/ipos/news/" />
						<h1 className="hh1">IPO News</h1>
						<IPONavigation />
					</div>

					<div className="sm:contain lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-1">
							<NewsFeed data={data} related="Stocks" />
						</div>
						<aside className="contain sm:uncontain flex flex-col space-y-7 lg:space-y-10 py-6">
							<CalendarTableMin upcoming={upcoming} />
							<RecentTableMin recent={recent} />
						</aside>
					</div>
				</main>
			</div>
		</>
	);
};

export default IpoNews;

export const getStaticProps: GetStaticProps = async () => {
	const { data, upcoming, recent } = await getIpoData('news');

	return {
		props: {
			data,
			upcoming,
			recent,
		},
		revalidate: 10 * 60,
	};
};
