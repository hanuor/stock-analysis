import { Stock } from 'components/Layout/StockLayout';
import { SEO } from 'components/SEO';
import { getPageData } from 'functions/callBackEnd';
import { stockState } from 'state/stockState';
import { useEffect } from 'react';
import InfoBox from 'components/InfoBox';
import InfoTable from 'components/Dividend/InfoTable';
import HistoryTable from 'components/Dividend/HistoryTable';
import NewsWidget from 'components/News/NewsWidget';
import DividendChart from 'components/Dividend/DividendChart';

export default function Holdings({ info, data, news }) {
	const setInfo = stockState((state) => state.setInfo);
	const setData = stockState((state) => state.setData);

	useEffect(() => {
		setInfo(info);
		setData(data);
	}, [data, info, setData, setInfo]);
	console.log(data);
	return (
		<Stock info={info}>
			<SEO
				title={`${info.ticker} Dividend History, Dates & Yield`}
				description={`Get the latest dividend data for ${info.ticker} (${info.name}), including dividend history, yield, key dates, growth and other metrics.`}
				canonical={`stocks/${info.symbol}/dividend/`}
			/>
			<div className="contain">
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
}

export async function getStaticProps({ params }) {
	const { info, data, news } = await getPageData('dividend', params.symbol);

	return {
		props: {
			info,
			data,
			news,
		},
		revalidate: 3600,
	};
}

export async function getStaticPaths() {
	return { paths: [], fallback: 'blocking' };
}
