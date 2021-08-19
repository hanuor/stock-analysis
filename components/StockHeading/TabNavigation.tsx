import { Info } from 'types/Info';
import Link from 'next/link';
import { navState } from 'state/navState';

export const TabNavigation = ({ info }: { info: Info }) => {
	const path = navState((state) => state.path);

	return (
		<nav className="border-b-2 border-blue-brand_sharp w-full">
			<ul className="navmenu">
				<li>
					<Link
						href={`/stocks/${info.symbol}/`}
						prefetch={false}
						scroll={false}
					>
						<a
							className={!path.three ? 'active' : 'inactive'}
							data-title="Overview"
						>
							Overview
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${info.symbol}/financials/`}
						prefetch={false}
						scroll={false}
					>
						<a
							className={
								path.three == 'financials' ? 'active' : 'inactive'
							}
							data-title="Financials"
						>
							Financials
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${info.symbol}/statistics/`}
						prefetch={false}
						scroll={false}
					>
						<a
							className={
								path.three == 'statistics' ? 'active' : 'inactive'
							}
							data-title="Statistics"
						>
							Statistics
						</a>
					</Link>
				</li>
				<li>
					<Link
						href={`/stocks/${info.symbol}/company/`}
						prefetch={false}
						scroll={false}
					>
						<a
							className={path.three == 'company' ? 'active' : 'inactive'}
							data-title="Profile"
						>
							Profile
						</a>
					</Link>
				</li>
				{!info.exceptions.hideChart && (
					<li>
						<Link
							href={`/stocks/${info.symbol}/chart/`}
							prefetch={false}
							scroll={false}
						>
							<a
								className={
									path.three == 'chart' ? 'active' : 'inactive'
								}
								data-title="Chart"
							>
								Chart
							</a>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};
