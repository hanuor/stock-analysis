import { useQuote } from 'hooks/useQuote';
import { Info } from 'types/Info';
import { changeColor } from '../quote.functions';

export function RegularExtended({ info }: { info: Info }) {
	const quote = useQuote(info);
	const color = changeColor(Number(quote.c));

	return (
		<div className="max-w-[50%]">
			<div className="block sm:inline text-4xl font-bold">{quote.pd}</div>
			<div className="block sm:inline sm:ml-1 text-lg xs:text-xl sm:text-2xl font-semibold reg">
				<span className={color}>{`${quote.c} (${quote.cp}%)`}</span>
			</div>
			<div className="text-xxs xs:text-tiny bp:text-sm text-gray-700 mt-0.5">
				<span className="block sm:inline font-semibold">At close:</span>{' '}
				{quote.u}
			</div>
		</div>
	);
}
