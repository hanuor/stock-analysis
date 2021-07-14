import { SEO } from 'components/SEO';
import { getIpoData } from 'functions/callBackEnd';
import IPOTable from 'components/IPOs/RecentTable';
import IPONavigation from 'components/IPOs/Navigation';
import SubNavigation from 'components/IPOs/SubNavigation';
import Breadcrumbs from 'components/Breadcrumbs/_Breadcrumbs';
import InfoBox from 'components/InfoBox';
import CalendarTableMin from 'components/IPOs/CalendarTableMin';
import NewsWidget from 'components/News/NewsWidget';

const IpoYear = ({ year, data }) => {
	const title =
		year === '2021' ? 'All 2021 IPOs (so far)' : `All ${year} IPOs`;

	const description =
		year === '2021'
			? 'A list of all the stocks that have gone public with an IPO on the US stock market in the year 2021, so far.'
			: `A list of all the initial public offerings (IPOs) on the US stock market in the year ${year}. Includes detailed information about each stock.`;

	return (
		<>
			<SEO
				title={title}
				description={description}
				canonical={`ipos/${year}/`}
			/>
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
		revalidate: 2 * 60 * 60,
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
