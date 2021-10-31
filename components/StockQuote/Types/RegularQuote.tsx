import { Quote } from 'types/Quote';
import { changeColor } from '../quote.functions';

export function RegularQuote({ quote }: { quote: Quote }) {
	const color = changeColor(quote.changeR);
	const market = quote.market == 'open' ? 'Market open' : 'Market closed';

	return (
		<div>
			<span className="text-4xl font-bold">{quote.priceD}</span>{' '}
			<span className={`text-2xl reg ${color} font-semibold`}>
				{`${quote.change} (${quote.changePc})`}
			</span>
			<div className="text-sm text-gray-700 flex items-center mt-1">
				{`${quote.timestampF} - ${market}`}
			</div>
		</div>
	);
}
