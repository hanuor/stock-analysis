import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Controls } from './PriceChartControls';
import { PriceChange } from './PriceChange';
import { Chart } from './PriceChartChart';
import { Info } from 'types/Info';

const getChartUrl = (id: number, time: string) => {
	const url = 'https://stockanalysis17jun2.local/wp-json/sa/';
	const params = `i=${id}&r=${time}&m=1`;

	let apiurl;
	if (time === '1D' || time === '5D') {
		apiurl = url + `c?${params}`;
	} else if (time === '5Y' || time === 'MAX') {
		apiurl = url + `cch?${params}&p=w`;
	} else {
		apiurl = url + `cch?${params}&p=d`;
	}

	return apiurl;
};

export const PriceChart = ({ info }: { info: Info }) => {
	const [chartData, setChartData] = useState([]);
	const [chartTime, setChartTime] = useState('');

	useEffect(() => {
		const brandNew = (info.quote && info.quote.brandNew) ?? null;
		const daysFrom = (info.quote && info.quote.daysFrom) ?? null;

		const show = brandNew || (daysFrom && daysFrom < 5) ? '1D' : '1Y';
		setChartTime(show);
	}, [info.quote]);

	useEffect(() => {
		const source = Axios.CancelToken.source();

		const fetchChartData = async (selected: string) => {
			const url = getChartUrl(info.id, selected);
			try {
				const response = await Axios.get(url, {
					cancelToken: source.token,
					timeout: 5000,
				});
				setChartData(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		if (chartTime) {
			fetchChartData(chartTime);
		}

		return () => {
			source.cancel('Unmounted');
			setChartData([]);
		};
	}, [chartTime, info.id]);

	if (info.state === 'upcomingipo') {
		return (
			<div className="border border-gray-200 rounded-sm lg:border-0 lg:border-l lg:border-gray-300 lg:pl-3 mb-4 lg:mb-0 w-full h-[180px] sm:h-[240px] lg:h-full">
				<div className="flex justify-center items-center h-full bg-gray-50 text-2xl lg:text-3xl font-semibold text-gray-800">
					Chart not available yet
				</div>
			</div>
		);
	}

	return (
		<div className="border border-gray-200 rounded-sm lg:border-0 p-0.5 xs:p-1 sm:py-3 sm:px-2 lg:py-0 lg:px-0 lg:border-l lg:border-gray-300 lg:pl-3 mb-4 lg:mb-0">
			<div className="flex flex-row justify-between space-x-2 items-center py-1 sm:pt-0.5 px-1.5 sm:px-0 overflow-x-auto">
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
			<div className="h-[240px] sm:h-[300px]">
				{chartData && chartData.length > 0 && (
					<Chart chartData={chartData} chartTime={chartTime} />
				)}
			</div>
		</div>
	);
};
