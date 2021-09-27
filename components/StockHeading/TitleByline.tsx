import { useQuote } from 'hooks/useQuote';
import { Info } from 'types/Info';

export function TitleByline({ info }: { info: Info }) {
	const quote = useQuote(info);

	const timing =
		quote.exchange === 'OTCMKTS' || quote.ext
			? 'Delayed Price'
			: 'IEX Real-Time Price';

	return (
		<div className="text-tiny text-gray-600 mt-[1px]">
			{`${info.quote.exchange || info.exchange}: ${
				info.ticker
			} · ${timing} · USD`}
		</div>
	);
}
