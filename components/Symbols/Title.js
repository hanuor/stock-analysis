export default function Title({ name, ticker, quote }) {
	return (
		<div className="mb-4">
			<h1 className="text-2xl font-bold">
				{name} ({ticker.toUpperCase()})
			</h1>
			<div className="text-xs text-gray-600">
				NASDAQ: {ticker.toUpperCase()} &#183; IEX Real-Time Price &#183; USD
			</div>
		</div>
	);
}
