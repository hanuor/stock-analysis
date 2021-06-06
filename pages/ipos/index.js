import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import Sidebar from '@/components/Layout/Sidebar/_Sidebar';
import { getIpoData } from '@/Functions/fetchStockInfo';
import IPOTable from '@/components/IPOTable/_IPOTable';

const RecentIpos = ({ data }) => {
	return (
		<>
			<Meta title="Recent IPOs"></Meta>
			<Header />
			<div className="contain lg:grid lg:grid-cols-sidebar gap-x-10">
				<main className="w-full py-6">
					<h1 className="hh1">Recent IPOs</h1>
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
