import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import Sidebar from '@/components/Layout/Sidebar/_Sidebar';
import { getIpoData } from '@/Functions/fetchStockInfo';
import IPOTable from '@/components/IPOTable/_IPOTable';
import IPONavigation from '@/components/IPONavigation/_IPONavigation';
import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';

const IpoStatistics = ({ data }) => {
	return (
		<>
			<Meta title="IPO Statistics" />
			<Header />
			<div className="contain lg:grid lg:grid-cols-sidebar gap-x-10">
				<main className="w-full py-6">
					<Breadcrumbs />
					<h1 className="hh1">IPO Statistics</h1>
					<IPONavigation />
					<IPOTable data={data} />
				</main>
				<div className="py-6">
					<Sidebar />
				</div>
			</div>
			<Footer />
		</>
	);
};

export default IpoStatistics;

export async function getStaticProps() {
	const data = await getIpoData('recent');

	return {
		props: {
			data,
		},
		revalidate: 300,
	};
}
