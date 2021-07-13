import { SEO } from 'components/SEO';
import { getIpoData } from 'functions/callBackEnd';
import IPONavigation from 'components/IPOs/Navigation';
import Breadcrumbs from 'components/Breadcrumbs/_Breadcrumbs';
import StatsChartAnnual from 'components/IPOs/StatsChartAnnual';
import StatsChartMonthly from 'components/IPOs/StatsChartMonthly';
import Link from 'next/link';
import RecentTableMin from 'components/IPOs/RecentTableMin';
import NewsWidget from 'components/News/NewsWidget';

const RecentIpos = ({ data }) => {
	return (
		<>
			<SEO
				title="IPO Statistics and Charts"
				description="Statistics and charts for initial public offerings (IPOs) on the US stock market. Annual data is available from 2000-2021 and monthly data for 2019-2021."
				canonical="ipos/statistics/"
			/>
			<div className="contain">
				<main className="w-full py-5 xs:py-6">
					<Breadcrumbs />
					<h1 className="hh1">IPO Statistics</h1>
					<IPONavigation />

					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div className="flex flex-col space-y-3 py-3 sm:py-4">
							<div>
								<p className="text-base sm:text-lg text-gray-900">
									`This page contains statistics and charts for initial
									public offerings (IPOs) on the US stock market.
									Annual data is available from 2000-2021 and monthly
									data since 2019.`
								</p>
							</div>
							<div>
								<h2 className="hh2 mb-2">Number of IPOs by Year</h2>
								<p className="text-base sm:text-lg text-gray-900">
									{`There have been ${data.data.total.toLocaleString(
										'en-US'
									)} IPOs between 2000 and 2021. The most was in the full year 2020, with a total of 480 IPOs. The least was in 2009, with only 62 IPOs. The year 2021 is on track to beat the previous year's record.`}
								</p>
								<StatsChartAnnual
									title="Annual IPOs, 2000-2021"
									data={data.data.year2021}
								/>
							</div>
							<div>
								<h2 className="hh2 mb-2">
									2021 Initial Public Offerings
								</h2>
								<p className="text-base sm:text-lg text-gray-900">
									{`There have been ${data.data.year2021} IPOs so far in 2021.`}{' '}
									<Link href="/ipos/2021/">
										<a className="bll">View all 2021 IPOs.</a>
									</Link>
								</p>
								<StatsChartMonthly
									title="2021 IPOs"
									data={data.data.months2021}
								/>
							</div>
							<div>
								<h2 className="hh2 mb-2">
									2020 Initial Public Offerings
								</h2>
								<p className="text-base sm:text-lg text-gray-900">
									There were 480 initial public offerings in 2020.
									October had the most with a total of 97 IPOs. March
									had the fewest with only 5.{' '}
									<Link href="/ipos/2020/">
										<a className="bll">View all 2020 IPOs.</a>
									</Link>
								</p>
								<StatsChartMonthly
									title="2020 IPOs"
									data={data.data.months2020}
								/>
							</div>
							<div>
								<h2 className="hh2 mb-2">
									2019 Initial Public Offerings
								</h2>
								<p className="text-lg">
									There were 232 IPOs in 2019. May and July had the
									most with a total of 30. January had the fewest, with
									only 7.{' '}
									<Link href="/ipos/2019/">
										<a className="bll">View all 2019 IPOs.</a>
									</Link>
								</p>
								<StatsChartMonthly
									title="2019 IPOs"
									data={data.data.months2019}
								/>
							</div>
						</div>
						<aside className="flex flex-col space-y-10 py-6">
							<RecentTableMin recent={data.recent} />
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
	const data = await getIpoData('statistics');

	return {
		props: {
			data,
		},
		revalidate: 300,
	};
}
