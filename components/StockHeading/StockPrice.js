import { useEffect } from 'react';
import { stockState } from '@State/stockState';
import { IconMoon, IconSun } from '@/components/Icons';
import Axios from 'axios';

export default function StockPrice() {
	const info = stockState((state) => state.info);
	const quote = stockState((state) => state.quote);
	const setQuote = stockState((state) => state.setQuote);

	useEffect(() => {
		let source = Axios.CancelToken.source();

		async function fetchQuote(id) {
			let url = 'https://stockanalysis.com/wp-json/sa/q?i=' + id;

			try {
				const res = await Axios.get(url, {
					cancelToken: source.token,
					timeout: 5000,
				});
				setQuote(res.data);
			} catch (error) {
				console.log('There was a problem fetching the quote data:', error);
			}
		}
		if (info.id) {
			fetchQuote(info.id);
		}

		return () => {
			source.cancel('Unmounted');
			// setQuote(null);
		};
	}, [info.id, setQuote]);

	if (info.state === 'upcomingipo') {
		return (
			<section className="mb-5">
				<IPOPrice ipoInfo={info.ipoInfo} />
			</section>
		);
	}

	if (quote === null) {
		return null;
	}

	// Check if extended hours trading
	const extendedHours = quote.ext ? true : false;
	const extendedType = quote.extS == 'Pre-market' ? 'preMarket' : 'afterHours';

	return (
		<>
			{extendedHours ? (
				<section className="mb-5 flex flex-row items-end space-x-6 lg:space-x-4">
					<Extended quote={quote} market={extendedType} />
					<ExtendedClose quote={quote} />
				</section>
			) : (
				<section className="mb-5">
					<Regular quote={quote} />
				</section>
			)}
		</>
	);
}

function IPOPrice({ ipoInfo }) {
	let ipoPrice = ipoInfo.ipoPrice
		? '$' + ipoInfo.ipoPrice
		: ipoInfo.ipoPriceLow && ipoInfo.ipoPriceHigh
		? '$' + ipoInfo.ipoPriceLow + ' - $' + ipoInfo.ipoPriceHigh
		: 'Pending';

	return (
		<div>
			<span className="text-xl text-gray-800">
				<span className="text-xl font-normal">Stock Price:</span>{' '}
				<span className="text-2xl font-semibold">{ipoPrice}</span>
			</span>

			<div className="text-small text-gray-700 mt-0">
				{ipoInfo.ipoPriceNotice}
			</div>
		</div>
	);
}

function changeColor(change) {
	if (change > 0) {
		return 'text-green-700';
	} else if (change < 0) {
		return 'text-red-600';
	} else {
		return 'text-gray-800';
	}
}

// Regular price if market open or no extended price available
function Regular({ quote }) {
	const color = changeColor(quote.change);

	return (
		<div>
			<span className="text-4xl font-bold">{quote.price}</span>{' '}
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
function Extended({ quote, market }) {
	const color = changeColor(quote.extC);

	return (
		<div className="max-w-[50%]">
			<span className="text-4xl font-bold">{quote.extP}</span>{' '}
			<span
				className={`block sm:inline text-lg xs:text-xl sm:text-2xl font-semibold ${color}`}>
				{quote.extC} ({quote.extCP})
			</span>
			<div className="text-sm text-gray-700 flex items-start sm:items-center mt-1">
				{market == 'preMarket' ? <IconSun /> : <IconMoon />}
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
function ExtendedClose({ quote }) {
	const color = changeColor(quote.change);

	return (
		<div>
			<span className="text-3xl font-semibold text-gray-700">
				{quote.price}
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
