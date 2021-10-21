import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Info } from 'types/Info';
import { DividendI } from 'types/Dividend';
import { News } from 'types/News';
import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { getPageData } from 'functions/callBackEnd';
import { InfoBox } from 'components/InfoBox';
import { InfoTable } from 'components/Dividend/InfoTable';
import { HistoryTable } from 'components/Dividend/HistoryTable';
import { NewsWidget } from 'components/News/NewsWidget';
import { DividendChart } from 'components/Dividend/DividendChart';
import { Sidebar1 } from 'components/Ads/Snigel/Sidebar1';
import { Sidebar2 } from 'components/Ads/Snigel/Sidebar2';

interface Props {
	info: Info;
	data: DividendI;
	news: News[];
}

const Dividend = ({ info, data, news }: Props) => {
	return (
		<Stock info={info} url={`/etf/${info.symbol}/dividend/`}>
			<SEO
				title={`${info.ticker} Dividend History, Dates & Yield`}
				description={`Get the latest dividend data for ${info.ticker} (${info.name}), including dividend history, yield, key dates, growth and other metrics.`}
				canonical={`/etf/${info.symbol}/dividend/`}
			/>
			<div className="contain mt-3 sm:mt-4">
				<div className="lg:grid grid-cols-sidebar_wide py-1 gap-8">
					<div>
						<h2 className="text-xl bp:text-2xl font-bold">
							{info.ticker} Dividend Information
						</h2>
						{data.infoBox && <InfoBox text={data.infoBox} />}
						<InfoTable data={data.infoTable} />
						{data.history.length > 0 && (
							<HistoryTable rawdata={data.history} />
						)}
						<DividendChart
							data={data.chartData}
							options={data.chartOptions}
							ticker={info.ticker}
						/>
					</div>
					<aside className="mt-7 lg:mt-0 space-y-8">
						{data.history.length > 0 && <Sidebar1 />}
						<NewsWidget
							title={`${info.ticker} News`}
							news={news}
							button={{
								text: 'More News',
								url: `/etf/${info.symbol}/`,
							}}
						/>
						{data.history.length > 15 && <Sidebar2 />}
					</aside>
				</div>
			</div>
		</Stock>
	);
};
export default Dividend;

interface IParams extends ParsedUrlQuery {
	symbol: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams;
	return await getPageData('dividend', symbol, 3600);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' };
};
