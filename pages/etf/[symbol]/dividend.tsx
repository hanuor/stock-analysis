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

interface Props {
	info: Info;
	data: DividendI;
	news: News[];
}

const Dividend = ({ info, data, news }: Props) => {
	return (
		<Stock info={info}>
			<SEO
				title={`${info.ticker} Dividend History, Dates & Yield`}
				description={`Get the latest dividend data for ${info.ticker} (${info.name}), including dividend history, yield, key dates, growth and other metrics.`}
				canonical={`etf/${info.symbol}/dividend/`}
			/>
			<div className="contain mt-3 sm:mt-4">
				<div className="lg:grid grid-cols-sidebar_wide py-1 gap-8">
					<div>
						<h1 className="text-xl bp:text-2xl font-bold">
							{info.ticker} Dividend Information
						</h1>
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
					<aside className="mt-7 lg:mt-5">
						<NewsWidget
							title={`${info.ticker} News`}
							news={news}
							button={{
								text: 'More News',
								url: `/etf/${info.symbol}/`,
							}}
						/>
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
	const { info, data, news } = await getPageData('dividend', symbol);

	if (info === 'redirect') {
		return {
			redirect: {
				destination: data,
				statusCode: 301,
			},
		};
	}

	return {
		props: {
			key: symbol,
			info,
			data,
			news,
		},
		revalidate: 3600,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' };
};
