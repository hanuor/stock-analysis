import { GetStaticProps } from 'next';
import { News } from 'types/News';
import { SEO } from 'components/SEO';
import { getMarketNews } from 'functions/callBackEnd';
import { NewsNavigation } from 'components/News/NewsNavigation';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { NewsFeed } from 'components/News/_NewsFeed';
import { NewsWidget } from 'components/News/NewsWidget';
import { Sidebar1 } from 'components/Ads/GPT/Sidebar1';

interface Props {
	data: News[];
	other: News[];
}

export const MarketNews = ({ data, other }: Props) => {
	return (
		<>
			<SEO
				title="Today's Stock Market News and Breaking Stories"
				description="Get the latest stock market news and breaking stories from the world's best finance and investing websites."
				canonical="news/"
			/>
			<div className="">
				<main className="w-full py-5 xs:py-6">
					<div className="contain">
						<Breadcrumbs />
						<h1 className="hh1">Stock Market News</h1>
						<NewsNavigation />
					</div>

					<div className="sm:contain lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-2 lg:py-3">
							<NewsFeed data={data} />
						</div>
						<aside className="contain sm:uncontain flex flex-col space-y-7 lg:space-y-10 py-6">
							<NewsWidget
								title="Stock News"
								news={other}
								button={{
									text: 'All Stock News',
									url: '/news/all-stocks/',
								}}
							/>
							<Sidebar1 />
						</aside>
					</div>
				</main>
			</div>
		</>
	);
};

export default MarketNews;

export const getStaticProps: GetStaticProps = async () => {
	const { data, other } = await getMarketNews('market');

	return {
		props: {
			data,
			other,
		},
		revalidate: 5 * 60,
	};
};
