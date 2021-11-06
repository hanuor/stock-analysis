import { useQuote } from 'hooks/useQuote';
import { Info } from 'types/Info';
import { changeColor } from '../quote.functions';
import { MoonIcon } from 'components/Icons/Moon';
import { SunIcon } from 'components/Icons/Sun';

export function ExtendedQuote({ info }: { info: Info }) {
	const quote = useQuote(info);
	const color = changeColor(Number(quote.ec));

	return (
		<div className="border-l border-gray-200 pl-5">
			<div className="block sm:inline text-[1.7rem] leading-5 font-semibold text-gray-700">
				{quote.epd}
			</div>{' '}
			<div className="block sm:inline text-sm xs:text-base sm:text-lg mt-1.5 sm:mt-0">
				<span className={color}>{`${quote.ec} (${quote.ecp}%)`}</span>
			</div>
			<div className="mt-1 text-gray-700 sm:flex text-xxs xs:text-tiny">
				<span className="flex items-center">
					{quote.es === 'Pre-market' ? <SunIcon /> : <MoonIcon />}{' '}
					<span className="ml-1 font-semibold">{quote.es}:</span>
				</span>
				<span className="sm:ml-1">{quote.eu}</span>
			</div>
		</div>
	);
}
