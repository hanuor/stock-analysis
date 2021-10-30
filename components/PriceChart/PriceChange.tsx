import { useEffect } from 'react';
import { Quote } from 'types/Quote';

type ChartDataType = {
	t: string;
	c: number;
	o?: number;
};

interface Props {
	chartData: ChartDataType[];
	chartTime: string;
	quote: Quote;
	type: string;
}

export const PriceChange = ({ chartData, chartTime, quote, type }: Props) => {
	let raw: number | null;
	let formatted: string;
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

		raw = first ? (last / first - 1) * 100 : null;

		formatted = raw
			? raw > 0
				? '+' + raw.toFixed(dec) + '%'
				: raw.toFixed(dec) + '%'
			: 'n/a';
	}

	useEffect(() => {
		if (type === 'etf') {
			const price1y: Element | null = document.querySelector('#price1y');
			if (price1y) {
				price1y.innerHTML = formatted;
			}
		}
	}, [formatted, type]);

	const css = raw
		? raw > 0
			? 'green'
			: raw < 0
			? 'red'
			: 'text-gray-600'
		: 'text-gray-600';

	return (
		<div className="flex flex-row space-x-1 text-smaller sm:text-base pr-1">
			<span className={css}>{formatted}</span>
			<span className="text-gray-700 hidden sm:block">({chartTime})</span>
		</div>
	);
};
