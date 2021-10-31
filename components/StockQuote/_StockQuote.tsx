import { Info } from 'types/Info';
import { IPOPrice } from './Types/IPOPrice';
import { LiveQuote } from './LiveQuote';

export function StockQuote({ info }: { info: Info }) {
	if (info.state === 'upcomingipo') {
		return <IPOPrice info={info} />;
	}

	return <LiveQuote info={info} />;
}
