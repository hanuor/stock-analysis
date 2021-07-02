import { stockState } from 'state/stockState';
import { InformationCircleIcon } from '@heroicons/react/solid';

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

	const notice =
		info.ipoInfo !== null &&
		typeof info.ipoInfo !== 'undefined' &&
		info.ipoInfo.notice
			? info.ipoInfo.notice
			: null;

	return (
		<div className="mb-4">
			<h1 className="text-2xl sm:text-[26px] font-bold text-gray-900">
				{info.name_full || info.name} ({info.ticker})
			</h1>
			{notice && (
				<div className="text-base sm:text-lg text-gray-800 mt-2">
					<span>
						<InformationCircleIcon
							className="h-4 xs:h-5 sm:h-6 w-4 xs:w-5 sm:w-6 text-blue-400 inline mb-1 mr-1"
							aria-hidden="true"
						/>
					</span>
					<span>{notice}</span>
				</div>
			)}
			{info.quote && (
				<div className="text-tiny text-gray-600 mt-[1px]">
					{info.quote.exchange}: {info.ticker} &#183;{' '}
					{getQuoteSource(info.quote)} &#183; USD
				</div>
			)}
		</div>
	);
}
