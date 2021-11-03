import { useQuote } from 'hooks/useQuote';
import { Info } from 'types/Info';

type ChartDataType = {
	t: string;
	c: number;
	o?: number;
};

interface Props {
	chartData: ChartDataType[];
	chartTime: string;
	info: Info;
}

export const PriceChange = ({ chartData, chartTime, info }: Props) => {
	const quote = useQuote(info);

	let raw: number | null;
	let formatted: string;
	let dec = 2;

	if (typeof window !== 'undefined' && window.screen.width < 370) {
		dec = 1;
	}

	if (chartTime === '1D') {
		raw = Number(quote.c);
		formatted = raw > 0 ? '+' + quote.cp + '%' : quote.cp + '%';
	} else {
		const first = chartData[0].o;
		const last = quote.ep || quote.p;

		raw = first ? (last / first - 1) * 100 : null;

		formatted = raw
			? raw > 0
				? '+' + raw.toFixed(dec) + '%'
				: raw.toFixed(dec) + '%'
			: 'n/a';
	}

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
