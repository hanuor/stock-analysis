import { useState, useEffect } from 'react';
import { Controls } from './PriceChartControls';
import { PriceChange } from './PriceChange';
import { Chart } from './PriceChartChart';
import { Info } from 'types/Info';
import { getData } from 'functions/API';

const getChartUrl = (id: number, time: string, override: boolean) => {
	const params = `i=${id}&r=${time}&m=1`;

	let apiurl;
	if (time === '1D' || time === '5D' || override) {
		apiurl = `chart?i=${id}&r=${time}`;
	} else if (time === '5Y' || time === 'MAX') {
		apiurl = `cch?${params}&p=w`;
	} else {
		apiurl = `cch?${params}&p=d`;
	}

	return apiurl;
};

export const PriceChart = ({ info }: { info: Info }) => {
	const [chartData, setChartData] = useState([]);
	const [chartTime, setChartTime] = useState('');

	useEffect(() => {
		if (info.ticker === 'AAPL' || info.ticker === 'TSLA') {
			setChartTime('1D');
		} else {
			const brandNew = (info.quote && info.quote.brandNew) ?? null;
			const daysFrom = (info.quote && info.quote.daysFrom) ?? null;

			const show = brandNew || (daysFrom && daysFrom < 5) ? '1D' : '1Y';
			setChartTime(show);
		}
	}, [info.quote, info.ticker]);

	useEffect(() => {
		if (info.state === 'upcomingipo') {
			return;
		}

		const fetchChartData = async (selected: string) => {
			const url = getChartUrl(
				info.id,
				selected,
				info.exceptions.overrideChart
			);
			const data = await getData(url);
			setChartData(data);
		};

		if (chartTime) {
			fetchChartData(chartTime);
		}

		return () => {
			setChartData([]);
		};
	}, [chartTime, info.exceptions.overrideChart, info.id, info.state]);

	if (info.state === 'upcomingipo') {
		let chartMsg = 'Data will show when the stock starts trading.';
		const ipoDate = info?.ipoInfo?.ipoDate;
		if (ipoDate) {
			if (ipoDate === 'thisweek')
				chartMsg =
					'Data will show when the stock starts trading this week.';
			else if (ipoDate === 'nextweek')
				chartMsg =
					'Data will show when the stock starts trading next week.';
			else if (ipoDate !== 'unknown') {
				const date = new Date(ipoDate).toLocaleString('en-US', {
					timeZone: 'America/New_York',
					day: 'numeric',
					year: 'numeric',
					month: 'short',
				});
				chartMsg = `Data will show when the stock starts trading on ${date}.`;
			}
		}

		return (
			<div className="border border-gray-200 rounded-sm lg:border-0 lg:border-l lg:border-gray-300 lg:pl-3 mb-4 lg:mb-0 w-full h-[180px] sm:h-[240px] lg:h-full flex justify-center items-center">
				<div className="h-full w-full bg-gray-50 text-gray-800 flex flex-col items-center justify-center px-4 xs:px-10">
					<div className="text-xl xs:text-2xl lg:text-3xl font-medium">
						Chart not available yet
					</div>
					<div className="text-base xs:text-lg leading-6 xs:leading-7 text-center mt-4">
						{chartMsg}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="border border-gray-200 rounded-sm lg:border-0 p-0.5 xs:p-1 sm:py-3 sm:px-2 lg:py-0 lg:px-0 lg:border-l lg:border-gray-300 lg:pl-3 mb-4 lg:mb-0">
			<div className="flex flex-row justify-between space-x-1 items-center py-1 sm:pt-0.5 px-1.5 sm:px-0">
				<Controls chartTime={chartTime} setChartTime={setChartTime} />
				{chartData && chartData.length > 0 && (
					<PriceChange
						chartData={chartData}
						chartTime={chartTime}
						quote={info.quote}
						type={info.type}
					/>
				)}
			</div>
			<div className="h-[240px] sm:h-[300px] overflow-x-auto hide-scroll">
				{chartData && chartData.length > 0 && (
					<Chart chartData={chartData} chartTime={chartTime} info={info} />
				)}
			</div>
		</div>
	);
};
