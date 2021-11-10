import { Info } from 'types/Info';

export function IPOPrice({ info }: { info: Info }) {
	const ipoInfo = info.ipoInfo;
	if (!ipoInfo) {
		return null;
	}

	const { ipoPrice, ipoPriceLow, ipoPriceHigh, ipoPriceNotice } = ipoInfo;

	const price = ipoPrice
		? '$' + ipoPrice
		: ipoInfo && ipoPriceLow && ipoPriceHigh
		? '$' + ipoPriceLow + ' - $' + ipoPriceHigh
		: 'Pending';

	return (
		<div>
			<span className="text-xl text-gray-800">
				<span className="text-xl font-normal">Stock Price:</span>{' '}
				<span className="text-2xl font-semibold">{price}</span>
			</span>

			<div className="text-small text-gray-700 mt-0">{ipoPriceNotice}</div>
		</div>
	);
}
