import { useEffect, useState } from 'react';
import Link from 'next/link';
import { navState } from 'state/navState';
import { actionsState } from 'state/actionsState';

export const ActionsNavigationSub = () => {
	const path = navState((state) => state.path);
	const all = actionsState((state) => state.all);
	const setAll = actionsState((state) => state.setAll);
	const [count, setCount] = useState<number>(2);

	const type =
		path.two && !path.two.includes('20') && !path.two.includes('19')
			? path.two
			: '';

	const tabs = [
		'2021',
		'2020',
		'2019',
		'2018',
		'2017',
		'2016',
		'2015',
		'2014',
		'2013',
		'2012',
		'2011',
		'2010',
		'2009',
		'2008',
		'2007',
		'2006',
		'2005',
		'2004',
		'2003',
		'2002',
		'2001',
		'2000',
		'1999',
		'1998',
	];
	const length = tabs.length;

	useEffect(() => {
		if (all) {
			setCount(length);
		} else {
			setCount(2);
		}
	}, [all, length]);

	return (
		<nav className="mb-2 lg:mb-3">
			<ul className="md:space-x-1 navmenu submenu tight flex-wrap">
				<li className="mb-0.5">
					<Link
						href={type ? `/actions/${type}/` : '/actions/'}
						prefetch={false}
					>
						<a
							data-title="Recent"
							className={
								!path.two || (path.two === type && !path.three)
									? 'active'
									: 'inactive'
							}
						>
							Recent
						</a>
					</Link>
				</li>
				{type && (
					<li className="mb-0.5">
						<Link href={`/actions/${type}/statistics/`} prefetch={false}>
							<a
								data-title="Statistics"
								className={
									path.three === 'statistics' ? 'active' : 'inactive'
								}
							>
								Statistics
							</a>
						</Link>
					</li>
				)}
				{tabs.slice(0, count).map((tab) => (
					<li key={tab} className="mb-0.5">
						<Link
							href={
								type ? `/actions/${type}/${tab}/` : `/actions/${tab}/`
							}
							prefetch={false}
						>
							<a
								data-title={tab}
								className={
									path.two === tab || path.three === tab
										? 'active'
										: 'inactive'
								}
							>
								{tab}
							</a>
						</Link>
					</li>
				))}
				<li>
					{all ? (
						<span
							className="inactive font-semibold"
							onClick={() => setAll(false)}
						>
							Show Less &uarr;
						</span>
					) : (
						<span
							className="inactive font-semibold"
							onClick={() => setAll(true)}
						>
							2018-1998 &darr;
						</span>
					)}
				</li>
			</ul>
		</nav>
	);
};
