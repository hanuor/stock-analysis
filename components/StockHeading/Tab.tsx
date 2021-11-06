import Link from 'next/link';
import { navState } from 'state/navState';

interface TabI {
	symbol: string;
	title: string;
	append: string;
}

export function Tab({ symbol, title, append }: TabI) {
	const path = navState((state) => state.path);

	return (
		<li>
			<Link
				href={`/stocks/${symbol}/${append ? append + '/' : ''}`}
				prefetch={false}
			>
				<a
					className={
						path.three === append || (!path.three && title === 'Overview')
							? 'active'
							: 'inactive'
					}
					data-title={title}
				>
					{title}
				</a>
			</Link>
		</li>
	);
}
