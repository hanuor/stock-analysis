import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import Sidebar from '@/components/Layout/Sidebar/_Sidebar';
import { getIpoData } from '@/Functions/fetchStockInfo';
import IPONavigation from '@/components/IPOs/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';
import NewsFeed from '@/components/News/_NewsFeed';

const RecentIpos = ({ data }) => {
	return (
		<>
			<Meta title="IPO News" />
			<Header />
			<div className="">
				<main className="w-full py-5 xs:py-6">
					<div className="contain">
						<Breadcrumbs />
						<h1 className="hh1">IPO News</h1>
						<IPONavigation />
					</div>

					<div className="sm:contain lg:grid lg:grid-cols-sidebar gap-x-10">
						<NewsFeed data={data} />
						<Sidebar />
					</div>
				</main>
			</div>
			<Footer />
		</>
	);
};

export default RecentIpos;

export async function getStaticProps() {
	const data = await getIpoData('news');

	return {
		props: {
			data,
		},
		revalidate: 300,
	};
}
