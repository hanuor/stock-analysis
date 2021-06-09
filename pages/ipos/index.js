import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import Sidebar from '@/components/Layout/Sidebar/_Sidebar';
import { getIpoData } from '@/Functions/fetchStockInfo';
import IPOTable from '@/components/IPOs/RecentTable';
import IPONavigation from '@/components/IPOs/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';
import CalendarTableMin from '@/components/IPOs/CalendarTableMin';
import NewsWidget from '@/components/News/NewsWidget';

const RecentIpos = ({ data }) => {
	return (
		<>
			<Meta title="Recent IPOs" />
			<Header />
			<div className="contain">
				<main className="w-full py-5 xs:py-6">
					<Breadcrumbs />
					<h1 className="hh1">Recent IPOs</h1>
					<IPONavigation />

					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<IPOTable rawdata={data.data} />
						<div>
							<CalendarTableMin upcoming={data.upcoming} />
							<NewsWidget news={data.news} />
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</>
	);
};

export default RecentIpos;

export async function getStaticProps() {
	const data = await getIpoData('recent');

	return {
		props: {
			data,
		},
		revalidate: 300,
	};
}
