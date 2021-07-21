import { MoonIcon } from 'components/Icons/Moon';
import { SunIcon } from 'components/Icons/Sun';
import { useQuery } from 'react-query';
import { Info, IpoInfo } from 'types/Info';
import { Quote } from 'types/Quote';

async function queryQuote({ queryKey }: { queryKey: (string | number)[] }) {
	const id = queryKey[1];
	if (typeof id === 'undefined') {
		return null;
	}
	const res = await fetch(`https://stockanalysis.com/wp-json/sa/q?i=${id}`);
	return res.json();
}

export default function StockPrice({ info }: { info: Info }) {
	const { data } = useQuery(['q', info.id], queryQuote, {
		refetchInterval: 5000,
		initialData: info.quote,
		initialDataUpdatedAt: Date.now() - 60000,
	});

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

	const displayQuote = data || info.quote;

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

function changeColor(change: number) {
	if (change > 0) {
		return 'text-green-700';
	} else if (change < 0) {
		return 'text-red-600';
	} else {
		return 'text-gray-800';
	}
}

// Regular price if market open or no extended price available
function Regular({ quote }: { quote: Quote }) {
	const color = changeColor(quote.change);

	return (
		<div>
			<span className="text-4xl font-bold">{quote.priceD}</span>{' '}
			<span className={`text-2xl ${color} font-semibold`}>
				{quote.change} ({quote.changePc})
			</span>
			<div className="text-sm text-gray-700 flex items-center mt-1">
				{quote.timestamp} -{' '}
				{quote.market == 'open' ? <>Market open</> : <>Market closed</>}
			</div>
		</div>
	);
}

// Extended price
function Extended({ quote, market }: { quote: Quote; market: string }) {
	const color = changeColor(quote.extC);

	return (
		<div className="max-w-[50%]">
			<span className="text-4xl font-bold">{quote.extP}</span>{' '}
			<span
				className={`block sm:inline text-lg xs:text-xl sm:text-2xl font-semibold ${color}`}
			>
				{quote.extC} ({quote.extCP})
			</span>
			<div className="text-sm text-gray-700 flex items-start sm:items-center mt-1">
				{market == 'preMarket' ? <SunIcon /> : <MoonIcon />}
				<span className="ml-1">
					<span className="block sm:inline font-semibold">
						{quote.extS}:
					</span>{' '}
					{quote.extTF}
				</span>
			</div>
		</div>
	);
}

// Closing price, if extended price is showing
function ExtendedClose({ quote }: { quote: Quote }) {
	const color = changeColor(quote.change);

	return (
		<div>
			<span className="text-3xl font-semibold text-gray-700">
				{quote.priceD}
			</span>{' '}
			<span className={`block sm:inline text-lg xs:text-xl ${color}`}>
				{quote.change} ({quote.changePc})
			</span>
			<div className="text-sm text-gray-700 mt-1">
				<span className="block sm:inline font-semibold mr-1">
					At close:
				</span>{' '}
				{quote.timestampF}
			</div>
		</div>
	);
}
