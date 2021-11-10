import { useQuote } from 'hooks/useQuote';
import { Info } from 'types/Info';
import { changeColor } from '../quote.functions';

export function RegularQuote({ info }: { info: Info }) {
	const quote = useQuote(info);
	const color = changeColor(Number(quote.c));
	const market = quote.ms == 'open' ? 'Market open' : 'Market closed';

	return (
		<div>
			<span className="text-4xl font-bold">{quote.pd}</span>{' '}
			<span className="text-2xl font-semibold">
				<span className={color}>{`${quote.c || '0.00'} (${
					quote.cp || '0.00'
				}%)`}</span>
			</span>
			<div className="text-sm text-gray-700 flex items-center mt-1">
				{`${quote.u} - ${market}`}
			</div>
		</div>
	);
}
