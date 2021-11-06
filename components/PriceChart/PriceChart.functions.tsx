import { Info } from 'types/Info';

// Make API url
export function getChartUrl(id: number, time: string, override: boolean) {
	const params = `i=${id}&r=${time}&m=1`;

	let apiurl;
	if (time === '5Y' || time === 'MAX') {
		apiurl = `chart?${params}&p=w`;
	} else {
		apiurl = `chart?${params}`;
	}

	return apiurl;
}

// Turn the 1D/5D into a human-friendly string
export function translateTime(time: string): string {
	switch (time) {
		case '1D':
			return '1-day';
		case '5D':
			return '5-day';
		case '1M':
			return '1-month';
		case 'YTD':
			return 'year-to-date';
		case '1Y':
			return '1-year';
		case '5Y':
			return '5-year';
		case 'MAX':
			return 'all-time';
	}
	return '';
}

export function UnavailableIpo({ info }: { info: Info }) {
	let chartMsg = 'Data will show when the stock starts trading.';
	const ipoDate = info?.ipoInfo?.ipoDate;
	if (ipoDate) {
		if (ipoDate === 'thisweek')
			chartMsg = 'Data will show when the stock starts trading this week.';
		else if (ipoDate === 'nextweek')
			chartMsg = 'Data will show when the stock starts trading next week.';
		else if (ipoDate === 'postponed' || ipoDate === 'withdrawn')
			chartMsg = '';
		else if (ipoDate !== 'unknown' && info?.ipoInfo?.ipoDateFormatted)
			chartMsg = `Data will show when the stock starts trading on ${info.ipoInfo.ipoDateFormatted}.`;
	}

	return (
		<div className="border border-gray-200 rounded-sm lg:border-0 lg:border-l lg:border-gray-300 lg:pl-3 mb-4 lg:mb-0 w-full h-[180px] sm:h-[240px] lg:h-full flex justify-center items-center">
			<div className="h-full w-full bg-gray-50 text-gray-800 flex flex-col items-center justify-center px-4 xs:px-10">
				<div className="text-xl xs:text-2xl lg:text-3xl font-medium">
					Chart not available yet
				</div>
				{chartMsg && (
					<div className="text-base xs:text-lg leading-6 xs:leading-7 text-center mt-4">
						{chartMsg}
					</div>
				)}
			</div>
		</div>
	);
}
