import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import Sidebar from '@/components/Layout/Sidebar/_Sidebar';
import { getIpoData } from '@/Functions/fetchStockInfo';
import IPOTable from '@/components/IPOTable/_IPOTable';
import IPONavigation from '@/components/IPONavigation/_IPONavigation';
import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';

const IpoYear = ({ year, data }) => {
	return (
		<>
			<Meta title="Recent IPOs" />
			<Header />
			<div className="contain lg:grid lg:grid-cols-sidebar gap-x-10">
				<main className="w-full py-6">
					<Breadcrumbs />
					<h1 className="hh1">{year} IPOs</h1>
					<IPONavigation />
					<p>{data[0].info}</p>
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

export default IpoYear;

export async function getStaticProps({ params }) {
	const data = await getIpoData(params.year);

	return {
		props: {
			year: params.year,
			data,
		},
		revalidate: 300,
	};
}

export async function getStaticPaths() {
	return {
		paths: [
			{ params: { year: '2021' } },
			{ params: { year: '2020' } },
			{ params: { year: '2019' } },
		],
		fallback: false,
	};
}
