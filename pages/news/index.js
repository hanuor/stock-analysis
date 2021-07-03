import Meta from 'components/Meta';
import { getMarketNews } from 'functions/callBackEnd';
import NewsNavigation from 'components/News/NewsNavigation';
import Breadcrumbs from 'components/Breadcrumbs/_Breadcrumbs';
import NewsFeed from 'components/News/_NewsFeed';
import NewsWidget from 'components/News/NewsWidget';

const MarketNews = ({ data }) => {
	return (
		<>
			<Meta title="Market News" />
			<div className="">
				<main className="w-full py-5 xs:py-6">
					<div className="contain">
						<Breadcrumbs />
						<h1 className="hh1">Stock Market News</h1>
						<NewsNavigation />
					</div>

					<div className="sm:contain lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-2 lg:py-3">
							<NewsFeed data={data.data} />
						</div>
						<aside className="contain sm:uncontain flex flex-col space-y-7 lg:space-y-10 py-6">
							<NewsWidget
								title="Stock News"
								news={data.other}
								button={{
									text: 'All Stock News',
									url: '/news/all-stocks/',
								}}
							/>
						</aside>
					</div>
				</main>
			</div>
		</>
	);
};

export default MarketNews;

export async function getStaticProps() {
	const data = await getMarketNews('market');

	return {
		props: {
			data,
		},
		revalidate: 120,
	};
}
