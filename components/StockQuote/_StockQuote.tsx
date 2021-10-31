import { Info } from 'types/Info';
import { IPOPrice } from './Types/IPOPrice';
import { LiveQuote } from './LiveQuote';

export function StockQuote({ info }: { info: Info }) {
	if (info.state === 'upcomingipo') {
		return (
			<section className="mb-5">
				<IPOPrice info={info} />
			</section>
		);
	}

	return <LiveQuote info={info} />;
}
