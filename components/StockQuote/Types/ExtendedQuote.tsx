import { Quote } from 'types/Quote';
import { changeColor } from '../quote.functions';
import { MoonIcon } from 'components/Icons/Moon';
import { SunIcon } from 'components/Icons/Sun';

export function ExtendedQuote({ quote }: { quote: Quote }) {
	const color = changeColor(quote.extCR);

	return (
		<div className="border-l border-gray-200 pl-5">
			<div className="block sm:inline text-[1.7rem] leading-5 font-semibold text-gray-700">
				{quote.extP}
			</div>{' '}
			<div
				className={`block sm:inline text-sm xs:text-base sm:text-lg reg mt-1.5 sm:mt-0 ${color}`}
			>
				{`${quote.extC} (${quote.extCP})`}
			</div>
			<div className="mt-1 text-gray-700 sm:flex text-xxs xs:text-tiny">
				<span className="flex items-center">
					{quote.extS === 'Pre-market' ? <SunIcon /> : <MoonIcon />}{' '}
					<span className="ml-1 font-semibold">{quote.extS}:</span>
				</span>
				<span className="sm:ml-1">{quote.extTF}</span>
			</div>
		</div>
	);
}
