import Link from 'next/link';
import { navState } from 'state/navState';

export const IPONavigation = () => {
	const path = navState((state) => state.path);

	return (
		<div className="mb-1">
			<div>
				<nav className="border-b-[3px] border-blue-brand_sharp mb-1.5">
					<ul className="navmenu">
						<li>
							<Link href="/ipos/" prefetch={false}>
								<a
									data-title="IPOs"
									className={
										!path.two ||
										['#', '2021', '2020', '2019'].includes(path.two)
											? 'active'
											: 'inactive'
									}
								>
									IPOs
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/calendar/" prefetch={false}>
								<a
									data-title="Calendar"
									className={
										path.two === 'calendar' ? 'active' : 'inactive'
									}
								>
									Calendar
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/screener/" prefetch={false}>
								<a
									data-title="Screener"
									className={
										path.two === 'screener' ? 'active' : 'inactive'
									}
								>
									Screener
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/news/" prefetch={false}>
								<a
									data-title="News"
									className={
										path.two === 'news' ? 'active' : 'inactive'
									}
								>
									News
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/statistics/" prefetch={false}>
								<a
									data-title="Statistics"
									className={
										path.two === 'statistics' ? 'active' : 'inactive'
									}
								>
									Statistics
								</a>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};
