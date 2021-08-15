import Link from 'next/link';
import { navState } from 'state/navState';

export const ActionsNavigation = () => {
	const path = navState((state) => state.path);

	const tabs = [
		'listed',
		'delisted',
		'acquisitions',
		'bankruptcies',
		'changes',
		'spinoffs',
		'splits',
	];

	return (
		<nav className="border-b-[3px] border-blue-brand_sharp">
			<ul className="navmenu">
				<li>
					<Link href="/actions/" prefetch={false}>
						<a
							data-title="Actions"
							className={!path.two ? 'active' : 'inactive'}
						>
							Actions
						</a>
					</Link>
				</li>
				{tabs.map((tab) => (
					<li key={tab}>
						<Link href={`/actions/${tab}`} prefetch={false}>
							<a
								data-title={tab[0].toUpperCase() + tab.slice(1)}
								className={path.two === tab ? 'active' : 'inactive'}
							>
								{tab[0].toUpperCase() + tab.slice(1)}
							</a>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
