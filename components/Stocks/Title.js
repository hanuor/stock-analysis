import { stockState } from '@State/stockState';

export default function Title() {
	const info = stockState((state) => state.info);

	return (
		<div className="mb-4">
			<h1 className="text-2xl font-bold">
				{info.name_full} ({info.ticker})
			</h1>
			<div className="text-xs text-gray-600 font-system">
				{info.exchange}: {info.ticker} &#183; IEX Real-Time Price &#183; USD
			</div>
		</div>
	);
}
