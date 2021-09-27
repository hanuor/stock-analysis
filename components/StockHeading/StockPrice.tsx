import { useState, useEffect } from 'react';
import { MoonIcon } from 'components/Icons/Moon';
import { SunIcon } from 'components/Icons/Sun';
import { Info, IpoInfo } from 'types/Info';
import { Quote } from 'types/Quote';
import { useQuote } from 'hooks/useQuote';

export default function StockPrice({ info }: { info: Info }) {
	const [displayQuote, setDisplayQuote] = useState(info.quote);
	const data = useQuote(info);

	useEffect(() => {
		if (data) {
			setDisplayQuote(data);
		}
	}, [data]);

	if (info.state === 'upcomingipo') {
		return (
			<section className="mb-5">
				<IPOPrice ipoInfo={info.ipoInfo} />
			</section>
		);
	}

	if (!data && !info.quote) {
		return null;
	}

	// Check if extended hours trading
	const extendedHours = displayQuote.ext ? true : false;
	const extendedType =
		displayQuote.extS == 'Pre-market' ? 'preMarket' : 'afterHours';

	return (
		<>
			{extendedHours ? (
				<section className="mb-5 flex flex-row items-end space-x-6 lg:space-x-4">
					<Extended quote={displayQuote} market={extendedType} />
					<ExtendedClose quote={displayQuote} />
				</section>
			) : (
				<section className="mb-5">
					<Regular quote={displayQuote} />
				</section>
			)}
		</>
	);
}

function IPOPrice({ ipoInfo }: { ipoInfo?: IpoInfo | null }) {
	const ipoPrice =
		ipoInfo && ipoInfo.ipoPrice
			? '$' + ipoInfo.ipoPrice
			: ipoInfo && ipoInfo.ipoPriceLow && ipoInfo.ipoPriceHigh
			? '$' + ipoInfo.ipoPriceLow + ' - $' + ipoInfo.ipoPriceHigh
			: 'Pending';

	return (
		<div>
			<span className="text-xl text-gray-800">
				<span className="text-xl font-normal">Stock Price:</span>{' '}
				<span className="text-2xl font-semibold">{ipoPrice}</span>
			</span>

			<div className="text-small text-gray-700 mt-0">
				{ipoInfo && ipoInfo.ipoPriceNotice}
			</div>
		</div>
	);
}

function changeColor(change?: number) {
	if (change && change > 0) {
		return 'green-quote';
	} else if (change && change < 0) {
		return 'text-red-600';
	} else {
		return 'text-gray-800';
	}
}

// Regular price if market open or no extended price available
function Regular({ quote }: { quote: Quote }) {
	const color = changeColor(quote.changeR);
	const market = quote.market == 'open' ? 'Market open' : 'Market closed';

	return (
		<div>
			<span className="text-4xl font-bold">{quote.priceD}</span>{' '}
			<span className={`text-2xl reg ${color} font-semibold`}>
				{`${quote.change} (${quote.changePc})`}
			</span>
			<div className="text-sm text-gray-700 flex items-center mt-1">
				{`${quote.timestamp} - ${market}`}
			</div>
		</div>
	);
}

// Extended price
function Extended({ quote, market }: { quote: Quote; market: string }) {
	const color = changeColor(quote.extCR);

	return (
		<div className="max-w-[50%]">
			<div className="block sm:inline text-4xl font-bold">{quote.extP}</div>
			<div
				className={`block sm:inline sm:ml-1 text-lg xs:text-xl sm:text-2xl font-semibold ${color}`}
			>
				{`${quote.extC} (${quote.extCP})`}
			</div>
			<div className="mt-1 text-gray-700 sm:flex">
				<span className="flex items-center">
					{market == 'preMarket' ? <SunIcon /> : <MoonIcon />}{' '}
					<span className="ml-1 text-sm font-semibold">{quote.extS}:</span>
				</span>
				<span className="text-xxs xs:text-tiny bp:text-sm sm:ml-1">
					{quote.extTF}
				</span>
			</div>
		</div>
	);
}

// Closing price, if extended price is showing
function ExtendedClose({ quote }: { quote: Quote }) {
	const color = changeColor(quote.changeR);

	return (
		<div className="border-l border-gray-200 pl-4">
			<div className="block sm:inline text-[1.7rem] leading-5 font-semibold text-gray-700">
				{quote.priceD}
			</div>{' '}
			<div
				className={`block sm:inline text-sm xs:text-base sm:text-lg reg mt-1.5 sm:mt-0 ${color}`}
			>
				{`${quote.change} (${quote.changePc})`}
			</div>
			<div className="text-xxs xs:text-tiny text-gray-700 mt-0.5">
				<span className="block sm:inline font-semibold">At close:</span>{' '}
				{quote.timestampF}
			</div>
		</div>
	);
}
