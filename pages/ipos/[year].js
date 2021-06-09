import Meta from '@/components/Meta';
import Header from '@/Layout/Header';
import Footer from '@/Layout/Footer';
import Sidebar from '@/components/Layout/Sidebar/_Sidebar';
import { getIpoData } from '@/Functions/fetchStockInfo';
import IPOTable from '@/components/IPOs/RecentTable';
import IPONavigation from '@/components/IPOs/Navigation';
import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';
import InfoBox from '@/components/IPOs/InfoBox';

const IpoYear = ({ year, data }) => {
	return (
		<>
			<Meta title="Recent IPOs" />
			<Header />
			<div className="contain">
				<main className="w-full py-5 xs:py-6">
					<Breadcrumbs />
					<h1 className="hh1">{year} IPOs</h1>
					<IPONavigation />
					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div>
							<InfoBox text={data.info} />
							<IPOTable rawdata={data.data} />
						</div>
						<div>
							<Sidebar />
						</div>
					</div>
				</main>
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
