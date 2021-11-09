import { IPOTab } from './IPOTab';

export function RecentNavigation({ path }: { path: string }) {
	return (
		<div>
			<nav className="mb-1 sm:mb-2 lg:mb-3">
				<ul className="space-x-1 navmenu">
					<IPOTab
						url="/ipos/"
						title="Latest"
						css={path === '' ? 'active' : 'inactive'}
					/>
					<IPOTab
						url="/ipos/2021/"
						title="2021"
						css={path === '2021' ? 'active' : 'inactive'}
					/>
					<IPOTab
						url="/ipos/2020/"
						title="2020"
						css={path === '2020' ? 'active' : 'inactive'}
					/>
					<IPOTab
						url="/ipos/2019/"
						title="2019"
						css={path === '2019' ? 'active' : 'inactive'}
					/>
				</ul>
			</nav>
		</div>
	);
}
