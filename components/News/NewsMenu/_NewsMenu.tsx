import { NewsMenuNav } from './NewsMenuNav';
import { NewsMenuSearch } from './NewsMenuSearch';
import { News } from 'types/News';

type Props = {
	show: string;
	setShow: (value: string) => void;
	pageType: string;
	id: number;
	setData: (value: News[]) => void;
	news: News[];
	setError: (error: string) => void;
	setLoaded: (loaded: boolean) => void;
	query: string;
	setQuery: (query: string) => void;
	searched: boolean;
	setSearched: (searched: boolean) => void;
	setEnd: (end: boolean) => void;
};

export function NewsMenu({
	show,
	setShow,
	pageType,
	id,
	setData,
	news,
	setError,
	setLoaded,
	query,
	setQuery,
	searched,
	setSearched,
	setEnd,
}: Props) {
	return (
		<div className="flex flex-row justify-between items-center border-b">
			<NewsMenuNav
				show={show}
				setShow={setShow}
				setError={setError}
				pageType={pageType}
			/>
			<NewsMenuSearch
				id={id}
				setData={setData}
				news={news}
				setError={setError}
				setLoaded={setLoaded}
				searched={searched}
				setSearched={setSearched}
				query={query}
				setQuery={setQuery}
				setEnd={setEnd}
			/>
		</div>
	);
}
