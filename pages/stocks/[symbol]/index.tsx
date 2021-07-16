import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Info } from 'types/Info';
import { Overview } from 'types/Overview';
import { News } from 'types/News';
import { getPageData } from 'functions/callBackEnd';
import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { InfoTable, QuoteTable } from 'components/Overview/TopTables';
import PriceChart from 'components/PriceChart/_PriceChart';
import Profile from 'components/Overview/ProfileWidget';
import NewsArea from 'components/Overview/NewsArea';
import FinancialsWidget from 'components/Overview/FinancialsWidget';
import AnalystWidget from 'components/Overview/AnalystWidget';
import { stockState } from 'state/stockState';
import { useEffect } from 'react';

interface IProps {
	info: Info;
	data: Overview;
	news: News;
}

const StockOverview = ({ info, data, news }: IProps) => {
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);

	let description = `Get a real-time ${info.name} (${info.ticker}) stock price quote with breaking news, financials, statistics, charts and more.`;
	if (info.state == 'upcomingipo') {
		description = `Get the latest ${info.name} (${info.ticker}) stock price quote with news, financials, IPO details and other important investing information.`;
	} else if (info.archived) {
		description = `Get the latest ${info.name} (${info.ticker}) stock price quote with news, financials and other important investing information.`;
	}

	return (
		<Stock info={info}>
			<SEO
				title={`${info.name} (${info.ticker}) Stock Price, Quote & News`}
				description={description}
				canonical={`stocks/${info.symbol}/`}
			/>
			<div className="px-3 xs:px-4 lg:px-6 lg:flex flex-row gap-4">
				<div className="order-3 flex-grow overflow-auto">
					<PriceChart />
				</div>
				<div className="order-1 flex flex-row justify-between gap-4">
					<InfoTable />
					<QuoteTable />
				</div>
			</div>
			<div className="px-0 md:px-4 lg:px-6 mt-6 lg:grid lg:grid-cols-sidebar_wide gap-10">
				<div className="px-4 md:px-0 lg:order-2 space-y-6">
					<Profile />
					<FinancialsWidget />
					<AnalystWidget />
				</div>
				<div className="lg:order-1">
					<NewsArea news={news} />
				</div>
			</div>
		</Stock>
	);
};

export default StockOverview;

interface IParams extends ParsedUrlQuery {
	symbol: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams;
	const { info, data, news } = await getPageData('overview', symbol);

	return {
		props: {
			info,
			data,
			news,
		},
		revalidate: 600,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' };
};
