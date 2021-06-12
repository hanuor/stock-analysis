import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import { getMarketNews } from '@/Functions/fetchStockInfo';
import NewsNavigation from '@/components/News/NewsNavigation';
import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';
import NewsFeed from '@/components/News/_NewsFeed';
import NewsWidget from '@/components/News/NewsWidget';

const AllPressReleases = ({ data }) => {
	return (
		<>
			<Meta title="Press Releases" />
			<Header />
			<div className="">
				<main className="w-full py-5 xs:py-6">
					<div className="contain">
						<Breadcrumbs />
						<h1 className="hh1">Press Releases</h1>
						<NewsNavigation />
					</div>

					<div className="sm:contain lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="py-1 sm:py-2 lg:py-3">
							<NewsFeed data={data.data} related="Stocks" />
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
			<Footer />
		</>
	);
};

export default AllPressReleases;

export async function getStaticProps() {
	const data = await getMarketNews('press');

	return {
		props: {
			data,
		},
		revalidate: 120,
	};
}