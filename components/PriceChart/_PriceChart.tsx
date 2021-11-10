import { useState, useEffect } from 'react';
import { Controls } from './PriceChartControls';
import { PriceChange } from './PriceChange';
import { Chart } from './PriceChartChart';
import { Info } from 'types/Info';
import { getData } from 'functions/API';
import {
	getChartUrl,
	translateTime,
	UnavailableIpo,
} from './PriceChart.functions';
import { Unavailable } from 'components/Unavailable';

export const PriceChart = ({ info }: { info: Info }) => {
	const [chartData, setChartData] = useState<any>([]);
	const [chartTime, setChartTime] = useState('');
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (info.exchange === 'OTCMKTS' || info.ticker === 'BRK.A') {
			setChartTime('1Y');
		} else {
			setChartTime('1D');
		}
	}, [info.exchange, info.quote, info.ticker]);

	useEffect(() => {
		setMessage('');
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
			if (data && data.length > 0) {
				setChartData(data);
			} else {
				setChartData([]);
				setMessage(`No ${translateTime(chartTime)} chart data available`);
			}
		};

		if (chartTime) {
			fetchChartData(chartTime);
		}

		return () => {
			setChartData([]);
		};
	}, [chartTime, info.exceptions.overrideChart, info.id, info.state]);

	if (info.state === 'upcomingipo') {
		return <UnavailableIpo info={info} />;
	}

	return (
		<div className="border-t border-b border-gray-200 lg:border-0 py-0.5 xs:py-1 sm:py-3 sm:px-2 lg:py-0 lg:px-0 lg:border-l lg:border-gray-300 lg:pl-3 mb-4 lg:mb-0">
			<div className="flex flex-row justify-between space-x-1 items-center py-1 sm:pt-0.5">
				<Controls chartTime={chartTime} setChartTime={setChartTime} />
				{chartData && chartData.length > 0 && (
					<PriceChange
						chartData={chartData}
						chartTime={chartTime}
						info={info}
					/>
				)}
			</div>
			<div className="h-[240px] sm:h-[300px] overflow-x-auto hide-scroll">
				{message && (
					<div className="pt-1.5 h-full">
						<Unavailable message={message} />
					</div>
				)}
				{chartData && chartData.length > 0 && (
					<Chart chartData={chartData} chartTime={chartTime} info={info} />
				)}
			</div>
		</div>
	);
};
