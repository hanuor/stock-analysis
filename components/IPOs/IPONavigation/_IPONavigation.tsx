import Link from 'next/link';

export function IPONavigation({ path }: { path: string }) {
	return (
		<div className="mb-1">
			<div>
				<nav className="border-b-[3px] border-blue-brand_sharp mb-1.5">
					<ul className="navmenu">
						<li>
							<Link href="/ipos/" prefetch={false}>
								<a
									data-title="IPOs"
									className={!path ? 'active' : 'inactive'}
								>
									Recent
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/calendar/" prefetch={false}>
								<a
									data-title="Calendar"
									className={
										path === 'calendar' ? 'active' : 'inactive'
									}
								>
									Calendar
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/statistics/" prefetch={false}>
								<a
									data-title="Statistics"
									className={
										path === 'statistics' ? 'active' : 'inactive'
									}
								>
									Statistics
								</a>
							</Link>
						</li>
						<li>
							<Link href="/ipos/screener/" prefetch={false}>
								<a
									data-title="Screener"
									className={
										path === 'screener' ? 'active' : 'inactive'
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
									className={path === 'news' ? 'active' : 'inactive'}
								>
									News
								</a>
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}
