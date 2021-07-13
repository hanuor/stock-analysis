import { SEO } from 'components/SEO';
import { getIpoData } from 'functions/callBackEnd';
import IPOTable from 'components/IPOs/RecentTable';
import IPONavigation from 'components/IPOs/Navigation';
import SubNavigation from 'components/IPOs/SubNavigation';
import Breadcrumbs from 'components/Breadcrumbs/_Breadcrumbs';
import CalendarTableMin from 'components/IPOs/CalendarTableMin';
import NewsWidget from 'components/News/NewsWidget';

const RecentIpos = ({ data }) => {
	return (
		<>
			<SEO
				title="All Recent IPOs"
				description="Detailed information on all the recent IPOs (initial public offerings) on the stock market. Includes an IPO calendar, news and more."
				canonical="ipos/"
			/>
			<div className="contain">
				<main className="w-full py-5 xs:py-6">
					<Breadcrumbs />
					<h1 className="hh1">Recent IPOs</h1>
					<IPONavigation />

					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div>
							<SubNavigation />
							<IPOTable rawdata={data.data} />
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
