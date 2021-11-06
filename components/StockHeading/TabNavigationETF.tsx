import Link from 'next/link';
import { navState } from 'state/navState';

interface Symbol {
	symbol: string;
}

export const TabNavigationETF = ({ symbol }: Symbol) => {
	const path = navState((state) => state.path);

	return (
		<nav className="border-b-2 border-blue-brand_sharp w-full">
			<ul className="w-full navmenu">
				<li>
					<Link href={`/etf/${symbol}/`} prefetch={false}>
						<a
							className={!path.three ? 'active' : 'inactive'}
							data-title="Overview"
						>
							Overview
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/etf/${symbol}/holdings/`} prefetch={false}>
						<a
							className={
								path.three == 'holdings' ? 'active' : 'inactive'
							}
							data-title="Holdings"
						>
							Holdings
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/etf/${symbol}/dividend/`} prefetch={false}>
						<a
							className={
								path.three == 'dividend' ? 'active' : 'inactive'
							}
							data-title="Dividend"
						>
							Dividend
						</a>
					</Link>
				</li>
				<li>
					<Link href={`/etf/${symbol}/chart/`} prefetch={false}>
						<a
							className={path.three == 'chart' ? 'active' : 'inactive'}
							data-title="Chart"
						>
							Chart
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};
