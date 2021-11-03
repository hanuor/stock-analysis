import { getData } from 'functions/API';
import { isTradingHours } from 'functions/datetime/isTradingHours';
import { useQuery } from 'react-query';
import { Info } from 'types/Info';
import { Quote } from 'types/Quote';

async function queryQuote({ queryKey }: { queryKey: (string | number)[] }) {
	const id = queryKey[1];
	if (typeof id === 'undefined') {
		return null;
	}

	return await getData(`p?i=${id}`);
}

export function useQuote(info: Info) {
	const tradingHours = isTradingHours();

	const { data } = useQuery(['q', info.id], queryQuote, {
		refetchInterval: tradingHours ? 5000 : false,
		refetchOnWindowFocus: tradingHours ? true : false,
		initialData: info.quote,
		initialDataUpdatedAt: Date.now() - 60000,
		enabled: info.state !== 'upcomingipo' && !info.archived,
	});

	return data as Quote;
}
