import { IPOTab } from './IPOTab';

export function CalendarNavigation({ path }: { path: string }) {
	return (
		<div>
			<nav className="mb-1 sm:mb-2 lg:mb-0">
				<ul className="space-x-1 navmenu">
					<IPOTab
						url="/ipos/calendar/"
						title="Upcoming"
						css={path === 'calendar' ? 'active' : 'inactive'}
					/>
					<IPOTab
						url="/ipos/filings/"
						title="Filings"
						css={path === 'filings' ? 'active' : 'inactive'}
					/>
					<IPOTab
						url="/ipos/withdrawn/"
						title="Withdrawn"
						css={path === 'withdrawn' ? 'active' : 'inactive'}
					/>
				</ul>
			</nav>
		</div>
	);
}
