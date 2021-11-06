import { Info } from 'types/Info';
import { useQuote } from 'hooks/useQuote';
import { RegularQuote } from './Types/RegularQuote';
import { RegularExtended } from './Types/RegularExtended';
import { ExtendedQuote } from './Types/ExtendedQuote';

export function LiveQuote({ info }: { info: Info }) {
	const quote = useQuote(info);

	if (quote.e) {
		return (
			<section className="mb-5 flex flex-row items-end space-x-6 lg:space-x-4">
				<RegularExtended info={info} />
				<ExtendedQuote info={info} />
			</section>
		);
	}

	return (
		<section className="mb-5">
			<RegularQuote info={info} />
		</section>
	);
}
