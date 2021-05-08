export function getStockPaths() {
	// Array of objects with the params key and the slugname-value key value pair.
	const paths = [
		{
			params: {
				symbol: "aapl",
			},
		},
		{
			params: {
				symbol: "msft",
			},
		},
	];

	return paths;
}

export async function getStockProperties({ params }) {
	const symbol = params.symbol;
	const stockData = await fetch(
		process.env.API_URL + `/symbol?type=stock&symbol=${symbol}`
	);

	const data = await stockData.json();

	return {
		data,
		symbol,
	};
}
