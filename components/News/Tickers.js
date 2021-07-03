import StockLink, { ETFLink } from 'components/Links';

function Tickers({ tickers, intro }) {
	if (tickers === null || tickers.length === 0) {
		return null;
	}

	if (tickers.length > 5) {
		tickers = tickers.slice(0, 8);
	}

	return (
		<div className="text-gray-800 inline">
			<span className="mr-1">{intro}:</span>
			<span className="">
				{tickers.map(function (ticker, index) {
					return <SingleTicker ticker={ticker} key={index} />;
				})}
			</span>
		</div>
	);
}

function SingleTicker({ ticker }) {
	if (ticker.startsWith('$')) {
		return (
			<StockLink
				symbol={ticker.slice(1)}
				className="inline-flex items-center px-1.5 py-0.5 ml-1 sm:ml-1.5 mb-1 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 bll"
			/>
		);
	} else if (ticker.startsWith('#')) {
		return (
			<ETFLink
				symbol={ticker.slice(1)}
				className="inline-flex items-center px-1.5 py-0.5 ml-1 sm:ml-1.5 mb-1 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 bll"
			/>
		);
	}
	return ticker.toUpperCase();
}

export default Tickers;
