import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { IpoRecent, IpoUpcoming } from 'types/Ipos';
import { News } from 'types/News';
import { SEO } from 'components/SEO';
import { getIpoData } from 'functions/callBackEnd';
import { RecentTable } from 'components/IPOs/RecentTable';
import { IPONavigation } from 'components/IPOs/IPONavigation/_IPONavigation';
import { RecentNavigation } from 'components/IPOs/IPONavigation/RecentNavigation';
import { Breadcrumbs } from 'components/Breadcrumbs/_Breadcrumbs';
import { InfoBox } from 'components/InfoBox';
import { CalendarTableMin } from 'components/IPOs/CalendarTableMin';
import { NewsWidget } from 'components/News/NewsWidget';
import { Sidebar1 } from 'components/Ads/Snigel/Sidebar1';
import { Sidebar2 } from 'components/Ads/Snigel/Sidebar2';

interface Props {
	year: string;
	data: {
		info: string;
		data: IpoRecent[];
	};
	news: News[];
	upcoming: IpoUpcoming[];
}

export const IpoYear = ({ year, data, news, upcoming }: Props) => {
	const title =
		year === '2021'
			? 'All 2021 IPOs (so far)'
			: `All ${year} IPOs - A Complete List`;

	const description =
		year === '2021'
			? 'A list of all the stocks that have gone public with an IPO on the US stock market in the year 2021, so far.'
			: `A list of all the initial public offerings (IPOs) on the US stock market in the year ${year}. Includes detailed information about each stock.`;

	return (
		<>
			<SEO
				title={title}
				description={description}
				canonical={`/ipos/${year}/`}
			/>
			<div className="contain">
				<main className="w-full pt-5 xs:pt-6">
					<Breadcrumbs url={`/ipos/${year}/`} />
					<h1 className="hh1">All {year} IPOs</h1>
					<IPONavigation path="" />
					<div className="lg:grid lg:grid-cols-sidebar gap-x-10">
						<div>
							<RecentNavigation path={year} />
							<div className="mt-4 mb-2 lg:mb-3">
								<InfoBox text={data.info} />
							</div>
							<RecentTable rawdata={data.data} />
						</div>
						<aside className="flex flex-col space-y-10 pt-6">
							<CalendarTableMin upcoming={upcoming} />
							<Sidebar1 />
							<NewsWidget
								title="IPO News"
								news={news}
								button={{
									text: 'More IPO News',
									url: '/ipos/news/',
								}}
							/>
							<Sidebar2 />
						</aside>
					</div>
				</main>
			</div>
		</>
	);
};

export default IpoYear;

interface IParams extends ParsedUrlQuery {
	year: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { year } = params as IParams;
	const { data, news, upcoming } = await getIpoData(year);

	return {
		props: {
			year,
			data,
			news,
			upcoming,
		},
		revalidate: 2 * 60 * 60,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [
			{ params: { year: '2021' } },
			{ params: { year: '2020' } },
			{ params: { year: '2019' } },
		],
		fallback: false,
	};
};
