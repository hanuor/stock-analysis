import { stockState } from '@State/stockState';

const getQuoteSource = (quote) => {
	if (
		(quote.status === 'open' || quote.status === 'closed') &&
		quote.exchange !== 'OTCMKTS'
	) {
		return 'IEX Real-Time Price';
	}
	return 'Delayed Price';
};

export default function Title() {
	const info = stockState((state) => state.info);

	if (typeof info.symbol === 'undefined') {
		return null;
	}

	return (
		<div className="mb-4">
			<h1 className="text-2xl sm:text-[26px] font-bold text-gray-900">
				{info.name_full} ({info.ticker})
			</h1>
			<div className="text-tiny text-gray-600 mt-[1px]">
				{info.quote.exchange}: {info.ticker} &#183;{' '}
				{getQuoteSource(info.quote)} &#183; USD
			</div>
		</div>
	);
}
