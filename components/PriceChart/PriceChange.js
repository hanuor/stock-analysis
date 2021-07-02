import { useEffect } from 'react';
import { stockState } from 'state/stockState';

const PriceChange = ({ chartData, chartTime, quote }) => {
	const info = stockState((state) => state.info);

	let raw;
	formatted;
	let dec = 2;

	if (typeof window !== 'undefined' && window.screen.width < 370) {
		dec = 1;
	}

	if (chartTime === '1D') {
		raw = quote.change;
		formatted = quote.change > 0 ? '+' + quote.changePc : quote.changePc;
	} else {
		const first = chartData[0].o;
		const last = chartData[chartData.length - 1].c;

		raw = (last / first - 1) * 100;
		formatted =
			raw > 0 ? '+' + raw.toFixed(dec) + '%' : raw.toFixed(dec) + '%';
	}

	useEffect(() => {
		if (info.type === 'etf') {
			document.querySelector('#price1y').innerHTML = formatted;
		}
	}, [info.type]);

	const css = raw > 0 ? 'green' : raw < 0 ? 'red' : 'text-gray-600';

	return (
		<div className="flex flex-row space-x-1 text-smaller sm:text-base">
			<span className={css}>{formatted}</span>
			<span className="text-gray-700 hidden sm:block">({chartTime})</span>
		</div>
	);
};

export default PriceChange;
