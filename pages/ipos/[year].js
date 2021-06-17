import Meta from '@/components/Meta';
import Header from '@/components/Layout/Header/_Header';
import Footer from '@/components/Layout/Footer/_Footer';
import { getIpoData } from '@/Functions/callBackEnd';
import IPOTable from '@/components/IPOs/RecentTable';
import IPONavigation from '@/components/IPOs/Navigation';
import SubNavigation from '@/components/IPOs/SubNavigation';
import Breadcrumbs from '@/components/Breadcrumbs/_Breadcrumbs';
import InfoBox from '@/components/IPOs/InfoBox';
import CalendarTableMin from '@/components/IPOs/CalendarTableMin';
import NewsWidget from '@/components/News/NewsWidget';

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
							<SubNavigation />
							<InfoBox text={data.data.info} />
							<IPOTable rawdata={data.data.data} />
						</div>
						<aside className="flex flex-col space-y-10 py-6">
							<CalendarTableMin upcoming={data.upcoming} />
							<NewsWidget
								title="IPO News"
								news={data.news}
								button={{
									text: 'More IPO News',
									url: '/ipos/news/',
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
