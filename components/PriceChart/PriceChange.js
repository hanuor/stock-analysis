const PriceChange = ({ chartData, chartTime, quote }) => {
	let change, formatted;
	let dec = 2;

	if (typeof window !== 'undefined' && window.screen.width < 370) {
		dec = 1;
	}

	if (chartTime === '1D') {
		change = quote.change;
		formatted = quote.change > 0 ? '+' + quote.changePc : quote.changePc;
	} else {
		let first = chartData[0].o;
		let last = chartData[chartData.length - 1].c;

		change = (last / first - 1) * 100;
		formatted =
			change > 0
				? '+' + change.toFixed(dec) + '%'
				: change.toFixed(dec) + '%';
	}

	let css = change > 0 ? 'green' : change < 0 ? 'red' : 'text-gray-600';

	return (
		<div className="flex flex-row space-x-1 text-smaller sm:text-base">
			<span className={css}>{formatted}</span>
			<span className="text-gray-700 hidden sm:block">({chartTime})</span>
		</div>
	);
};

export default PriceChange;
