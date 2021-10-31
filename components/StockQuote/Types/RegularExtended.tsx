import { Quote } from 'types/Quote';
import { changeColor } from '../quote.functions';

export function RegularExtended({ quote }: { quote: Quote }) {
	const color = changeColor(quote.changeR);

	return (
		<div className="max-w-[50%]">
			<div className="block sm:inline text-4xl font-bold">
				{quote.priceD}
			</div>
			<div
				className={`block sm:inline sm:ml-1 text-lg xs:text-xl sm:text-2xl font-semibold reg ${color}`}
			>
				{`${quote.change} (${quote.changePc})`}
			</div>
			<div className="text-xxs xs:text-tiny bp:text-sm text-gray-700 mt-0.5">
				<span className="block sm:inline font-semibold">At close:</span>{' '}
				{quote.timestampF}
			</div>
		</div>
	);
}
