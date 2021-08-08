import { Stock } from 'components/Layout/StockLayout';
import StockChart from 'components/Chart/StockChart';
import { SEO } from 'components/SEO';
import { Info } from 'types/Info';
import { SelectPeriod, SelectType, Buttons } from 'components/Chart/SelectUI';
import { getPageData } from 'functions/callBackEnd';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useState } from 'react';
import { Unavailable } from 'components/Unavailable';

interface ChartProps {
	info: Info;
}

const CandleStickStockChart = ({ info }: ChartProps) => {
	const [period, setPeriod] = useState<string>('d');
	const [time, setTime] = useState<string>('1Y');
	const [type, setType] = useState<string>('candlestick');

	return (
		<>
			<SEO
				title={`${info.name} (${info.ticker}) Stock Chart`}
				description={`Interactive ${info.name} (${info.ticker}) stock chart with full price history, volume, trends and moving averages.`}
				canonical={`stocks/${info.symbol}/chart/`}
			/>
			<Stock info={info}>
				<div className="px-2 sm:contain">
					<div className="py-2">
						<div className="flex flex-row justify-between items-center border border-gray-200 mb-2 text-sm bp:text-base">
							<Buttons state={time} dispatch={setTime} />
							<SelectPeriod dispatcher={setPeriod} />
							<SelectType dispatcher={setType} />
						</div>
						<div className="h-[400px] xs:h-[450px] bp:h-[550px] sm:h-[600px]">
							{info.state !== 'upcomingipo' ? (
								<StockChart
									stockId={info.id}
									period={period}
									time={time}
									type={type}
								/>
							) : (
								<Unavailable message="The chart is not available for this stock." />
							)}
						</div>
					</div>
				</div>
			</Stock>
		</>
	);
};

export default CandleStickStockChart;

interface IParams extends ParsedUrlQuery {
	symbol: string;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { symbol } = params as IParams;
	return await getPageData('chartpage', symbol, 3600);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths: [], fallback: 'blocking' };
};
